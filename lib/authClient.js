"use client";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"; // 🔥 tambah ini
import { serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYGvQi6G52Y9F9bQC6ZCR9b0R9idbqfTE",
  authDomain: "k3-app-3b487.firebaseapp.com",
  projectId: "k3-app-3b487",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const auth = app.auth();
export const db = app.firestore(); // 🔥 tambah ini
export { serverTimestamp };
