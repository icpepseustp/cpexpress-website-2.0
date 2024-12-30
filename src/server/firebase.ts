// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4sSGG8kLRbE4u0zpmlPHh3dYauHgsK6M",
  authDomain: "social-media-auth-6772c.firebaseapp.com",
  projectId: "social-media-auth-6772c",
  storageBucket: "social-media-auth-6772c.appspot.com",
  messagingSenderId: "139815782774",
  appId: "1:139815782774:web:f39827d945cd76e04ed257",
  measurementId: "G-CWZWQ8FGFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(`Firebase initialized successfully: ${app}`);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage };
