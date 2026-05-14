import { ExerciseService } from './exercise-service.js';

export const ExerciseView = {
    // Vérifie et incrémente le quota quotidien
    checkQuota: () => {
        const today = new Date().toISOString().split('T')[0];
        const stored = JSON.parse(localStorage.getItem('exercise_quota')) || { date: today, count: 0 };

        if (stored.date !== today) {
            // Nouveau jour : réinitialiser à 1 pour l'exercice actuel
            localStorage.setItem('exercise_quota', JSON.stringify({ date: today, count: 1 }));
            return true;
        }

        if (stored.count >= 2) return false; // Limite atteinte

        // Incrémenter pour l'exercice en cours
        stored.count += 1;
        localStorage.setItem('exercise_quota', JSON.stringify(stored));
        return true;
    },

    init: async (onBack) => {
        const root = document.getElementById('app') || document.getElementById('app-root');
        
        // --- Vérification du quota avant tout ---
        if (!ExerciseView.checkQuota()) {
            root.innerHTML = `
                <div class="p-6 h-screen flex flex-col items-center justify-center bg-[#F8FAFB]">
                    <h2 class="text-2xl font-black text-slate-800 mb-4">Limite atteinte 🛑</h2>
                    <p class="text-slate-500 mb-6">Tu as épuisé tes 2 exercices pour aujourd'hui.</p>
                    <button id="back-to-dash" class="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Retour au menu</button>
                </div>
            `;
            document.getElementById('back-to-dash').onclick = onBack;
            return;
        }

        // Affichage du loader
        root.innerHTML = `
            <div class="p-6 h-screen bg-[#F8FAFB]">
                <button id="back-to-dash" class="mb-4 text-slate-500 font-bold">← Retour</button>
                <div id="exercise-container" class="flex flex-col items-center justify-center h-3/4 gap-6">
                    <p class="animate-pulse">L'IA prépare une question...</p>
                </div>
            </div>
        `;

        document.getElementById('back-to-dash').onclick = onBack;

        // Chargement de la question
        const question = await ExerciseService.generateTrueFalse();
        
        const container = document.getElementById('exercise-container');
        container.innerHTML = `
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 w-full text-center">
                <h2 class="text-xs uppercase text-green-600 font-black mb-4">Affirmation</h2>
                <p class="text-lg font-bold text-slate-800">${question}</p>
            </div>

            <div class="grid grid-cols-2 gap-4 w-full">
                <button id="btn-vrai" class="bg-green-500 text-white p-6 rounded-2xl font-black shadow-lg">VRAI</button>
                <button id="btn-faux" class="bg-red-500 text-white p-6 rounded-2xl font-black shadow-lg">FAUX</button>
            </div>
            
            <div id="result-box" class="hidden w-full p-6 rounded-2xl text-center"></div>
            <button id="btn-next" class="hidden w-full bg-slate-900 text-white p-4 rounded-xl font-bold">Question Suivante</button>
        `;

        // Gestion des clics
        const handleChoice = async (choice) => {
            const resultBox = document.getElementById('result-box');
            resultBox.className = "w-full p-6 rounded-2xl text-center bg-slate-100 animate-in";
            resultBox.innerHTML = "Vérification...";
            resultBox.classList.remove('hidden');

            const feedback = await ExerciseService.validateAnswer(question, choice);
            
            resultBox.innerHTML = feedback;
            document.getElementById('btn-next').classList.remove('hidden');
            document.getElementById('btn-vrai').disabled = true;
            document.getElementById('btn-faux').disabled = true;
        };

        document.getElementById('btn-vrai').onclick = () => handleChoice("Vrai");
        document.getElementById('btn-faux').onclick = () => handleChoice("Faux");
        document.getElementById('btn-next').onclick = () => ExerciseView.init(onBack);
    }
};