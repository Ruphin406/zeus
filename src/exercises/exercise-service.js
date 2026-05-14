export const ExerciseService = {
    // Génère l'affirmation
    generateTrueFalse: async () => {
        const API_KEY = "AIzaSyBjJzbfnac9InIIYiNvExhCI2X_4Hfjbgg";
        const MODEL = "gemini-3-flash-preview";

        const systemInstruction = "Tu es un tuteur. Génère une affirmation courte (Vraie ou Fausse) sur les sciences ou l'histoire. Réponds uniquement avec l'affirmation.";

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: systemInstruction }] }]
                })
            });
            const data = await response.json();
            return data.candidates[0].content.parts[0].text.trim();
        } catch (err) {
            console.error("Erreur génération exercice:", err);
            return "La Terre est plate."; 
        }
    },

    // Vérifie la réponse
    validateAnswer: async (question, userChoice) => {
        const API_KEY = "AIzaSyAfIC5UUQnyp0D72VBRh2yyeZlbQ-RE7-M";
        const MODEL = "gemini-3-flash-preview";

        const prompt = `Affirmation : "${question}". L'utilisateur dit que c'est "${userChoice}". Est-ce correct ? Réponds par "CORRECT" ou "INCORRECT" suivi d'une courte explication.`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: prompt }] }]
                })
            });
            const data = await response.json();
            return data.candidates[0].content.parts[0].text.trim();
        } catch (err) {
            return "Erreur lors de la validation.";
        }
    }
};