import { db } from '../config/firebase.js';
import { collection, addDoc, query, where, orderBy, onSnapshot, getDocs, limit, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const AIService = {
    sendMessage: async (userId, alias, content) => {
        if (!content.trim()) return;
        try {
            // 1. Sauvegarde du message utilisateur
            await addDoc(collection(db, "ai_chats"), {
                userId: userId,
                alias: alias,
                content: content,
                role: "user",
                timestamp: serverTimestamp()
            });

            // 2. Récupération de l'historique (les 10 derniers messages)
            const q = query(
                collection(db, "ai_chats"),
                where("userId", "==", userId),
                orderBy("timestamp", "desc"),
                limit(10)
            );
            
            const querySnapshot = await getDocs(q);
            
            // On transforme les données en ignorant les messages incomplets
            const history = querySnapshot.docs
                .filter(doc => doc.data().timestamp !== null && doc.data().content)
                .map(doc => ({
                    role: doc.data().role === "user" ? "user" : "model",
                    parts: [{ text: doc.data().content }]
                }))
                .reverse(); 

            // 3. Appel à Gemini avec l'historique complet
            const aiResponse = await AIService.getAIResponse(history);

            // 4. Sauvegarde de la réponse de l'IA
            await addDoc(collection(db, "ai_chats"), {
                userId: userId,
                alias: "Tuteur IA",
                content: aiResponse,
                role: "model",
                timestamp: serverTimestamp()
            });

        } catch (e) { 
            console.error("Erreur AIService:", e); 
        }
    },

    getAIResponse: async (history) => {
        const API_KEY = "AIzaSyAfIC5UUQnyp0D72VBRh2yyeZlbQ-RE7-M"; 
        const MODEL = "gemini-3-flash-preview"; 
        
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: "Tu es un tuteur expert. Réponds en 3 lignes max. Tu dois te souvenir des messages précédents pour aider l'élève." }]
                    },
                    contents: history,
                    generationConfig: {
                        maxOutputTokens: 500, 
                        temperature: 0.7
                    }
                })
            });

            const data = await response.json();

            if (data.error) {
                console.error("Erreur API:", data.error.message);
                return "Désolé, j'ai un petit souci de mémoire immédiate.";
            }

            return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Je n'ai pas pu générer de réponse.";

        } catch (err) {
            return "Connexion instable.";
        }
    },

    listenMyMessages: (userId, callback) => {
        const q = query(
            collection(db, "ai_chats"), 
            where("userId", "==", userId),
            orderBy("timestamp", "asc")
        );
        
        return onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data() 
            }));
            callback(messages);
        });
    }
};