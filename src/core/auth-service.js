import { auth } from '../config/firebase.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export const AuthService = {
    // Connexion
    login: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { user: userCredential.user, error: null };
        } catch (error) {
            return { user: null, error: error.message };
        }
    },

    // Création de compte
    register: async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return { user: userCredential.user, error: null };
        } catch (error) {
            return { user: null, error: error.message };
        }
    }
};