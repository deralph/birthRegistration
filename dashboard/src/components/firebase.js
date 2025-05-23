// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRLQ784OnYn9McWngXzWfxmXJjiWKHffA",
  authDomain: "raphaeltrial-1b594.firebaseapp.com",
  projectId: "raphaeltrial-1b594",
  storageBucket: "raphaeltrial-1b594.appspot.com",
  messagingSenderId: "610219183058",
  appId: "1:610219183058:web:fd6641a166092ececdd60b",
  measurementId: "G-QQRNF885T2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
