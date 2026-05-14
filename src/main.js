import { auth } from './config/firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { AuthUI } from './ui/auth-ui.js';
import { DashView } from './ui/dash-view.js'; 
import { ChatView } from './ui/chat-view.js';
import { AuthService } from './core/auth-service.js';
import { StateManager } from './core/state.js';
import { AIView } from './ui/ai-view.js';
import { ExerciseView } from './exercises/exercise-view.js';

const root = document.getElementById('app') || document.getElementById('app-root');

/**
 * 1. GESTION DE LA NAVIGATION
 * Centralisation des vues pour éviter les erreurs de variables non définies.
 */

// Affiche le Tableau de Bord principal
function showDashboard(profile) {
    DashView.init(
        profile, 
        () => showChat(profile), // Navigation vers Salon Global
        () => AIView.init(profile, () => showDashboard(profile)), // Navigation vers Tuteur IA
        () => ExerciseView.init(() => showDashboard(profile)) // Navigation vers Exercices IA[cite: 10]
    );
}

// Affiche le Salon Global (Chat entre étudiants)
function showChat(profile) {
    ChatView.init(profile, () => showDashboard(profile));
}

/**
 * 2. GESTION DE L'AUTHENTIFICATION
 */

let isLoginMode = true;

function showAuth() {
    if (!root) return;
    root.innerHTML = AuthUI.render(isLoginMode);
    
    // Basculer entre Connexion et Inscription
    document.getElementById('btn-toggle-mode')?.addEventListener('click', () => { 
        isLoginMode = !isLoginMode; 
        showAuth(); 
    });

    // Soumission du formulaire (Login ou Register)
    document.getElementById('btn-auth-submit')?.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const res = isLoginMode 
            ? await AuthService.login(email, password) 
            : await AuthService.register(email, password);
        
        if (res?.error) {
            const status = document.getElementById('auth-status');
            if (status) {
                status.innerText = res.error;
                status.style.color = "red";
            }
        }
    });
}

/**
 * 3. POINT D'ENTRÉE UNIQUE
 * Déclenche l'application dès que l'état Firebase change.
 */

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Récupération sécurisée du profil via le StateManager[cite: 10]
        const profile = StateManager.getCurrentProfile(user); 
        showDashboard(profile); // Lancement du Dashboard[cite: 10]
    } else {
        showAuth(); // Retour à la page de connexion[cite: 10]
    }
});