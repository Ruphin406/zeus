// src/core/chat-service.js
import { db } from '../config/firebase.js';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const ChatService = {
    // Envoi de message
    sendMessage: async (alias, content, type = "text", replyTo = null) => {
        if (!content || !content.trim()) return;
        try {
            await addDoc(collection(db, "global_chat"), {
                alias: alias,
                content: content,
                type: type,
                timestamp: serverTimestamp(),
                replyTo: replyTo 
            });
        } catch (e) { console.error("Erreur d'envoi:", e); }
    }, // <--- LA VIRGULE ÉTAIT MANQUANTE ICI

    // Écoute en temps réel
    listenMessages: (callback) => {
        const q = query(collection(db, "global_chat"), orderBy("timestamp", "asc"), limit(50));
        return onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            callback(messages); 
        }, (err) => console.error("Erreur Firebase Flux:", err));
    }
};