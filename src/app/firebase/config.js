// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWoFvX0-Yn5eQwKbVPY1TzzCPb2vh8tnc",
  authDomain: "lightspeed-67f5a.firebaseapp.com",
  projectId: "lightspeed-67f5a",
  storageBucket: "lightspeed-67f5a.firebasestorage.app",
  messagingSenderId: "247728728493",
  appId: "1:247728728493:web:9a1f1f3ad1d077b9625924"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;