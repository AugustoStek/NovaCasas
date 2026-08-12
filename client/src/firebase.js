// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nova-casa-3fb19.firebaseapp.com",
  projectId: "nova-casa-3fb19",
  storageBucket: "nova-casa-3fb19.firebasestorage.app",
  messagingSenderId: "1065482943592",
  appId: "1:1065482943592:web:ed1179255b5a9cf9714fdd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);