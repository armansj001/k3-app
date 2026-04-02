"use client";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYGvQi6G52Y9F9bQC6ZCR9b0R9idbqfTE",
  authDomain: "k3-app-3b487.firebaseapp.com",
  projectId: "k3-app-3b487",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
