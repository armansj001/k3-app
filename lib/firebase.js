import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYGvQi6G52Y9F9bQC6ZCR9b0R9idbqfTE",
  authDomain: "k3-app-3b487.firebaseapp.com",
  projectId: "k3-app-3b487",
  storageBucket: "k3-app-3b487.firebasestorage.app",
  messagingSenderId: "278985478091",
  appId: "1:278985478091:web:0923964250c3fe054ff04e"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
