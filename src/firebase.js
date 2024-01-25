// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-4bf4d.firebaseapp.com",
  projectId: "mern-auth-4bf4d",
  storageBucket: "mern-auth-4bf4d.appspot.com",
  messagingSenderId: "58317832065",
  appId: "1:58317832065:web:fd45bb86a76833758af280",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
