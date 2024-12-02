// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYWqz-fjGwddxGv6JZArP9WwP6us6Dpho",
  authDomain: "cpexpress-d8bc4.firebaseapp.com",
  projectId: "cpexpress-d8bc4",
  storageBucket: "cpexpress-d8bc4.firebasestorage.app",
  messagingSenderId: "227109499293",
  appId: "1:227109499293:web:559a6f9f1d1e5967433f74",
  measurementId: "G-TW54ENY7TJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(`Firebase initialized successfully: ${app}`);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const db = getFirestore(app);

export { app, analytics, db };
