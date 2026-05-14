import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// Correction ici : on regroupe getAuth et GoogleAuthProvider dans un seul import
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCf-5pCPJl28iL4i4PHXE77YVyrOtRDO0w",
  authDomain: "anonimous-1ed08.firebaseapp.com",
  projectId: "anonimous-1ed08",
  storageBucket: "anonimous-1ed08.firebasestorage.app",
  messagingSenderId: "936206808358",
  appId: "1:936206808358:web:582acdfde1bf21b65ebde7",
  measurementId: "G-HMZBMYD4YF"
};

// Initialisation de l'application
const app = initializeApp(firebaseConfig);

// Exports propres pour le reste du projet
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();