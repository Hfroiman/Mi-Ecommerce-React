import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoDZ5Q2FDH3p8ZlyCM7UJEiVk6jnS2XsI",
  authDomain: "primerprueba-a47f0.firebaseapp.com",
  projectId: "primerprueba-a47f0",
  storageBucket: "primerprueba-a47f0.firebasestorage.app",
  messagingSenderId: "706552716035",
  appId: "1:706552716035:web:da7f91dd7acbaae0536736"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);