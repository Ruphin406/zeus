import { DashUI } from './dash-ui.js';
import { auth } from '../config/firebase.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export const DashView = {
    init: (profile, onGoChat, onGoAIChat, onGoQuiz) => {
        const root = document.getElementById('app') || document.getElementById('app-root');
        root.innerHTML = DashUI.render(profile);

        // Déconnexion
        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) logoutBtn.onclick = () => signOut(auth);

        // Navigation vers le Salon Global
        document.getElementById('go-chat').onclick = () => onGoChat();

        // Navigation vers le Chat IA (Privé)
        document.getElementById('go-ai-chat').onclick = () => onGoAIChat();

        // Navigation vers les Exercices
        document.getElementById('go-quiz').onclick = () => onGoQuiz();
    }
};