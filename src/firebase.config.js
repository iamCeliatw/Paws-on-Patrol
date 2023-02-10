// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPJLtuEnn3M599D5xRBzcuWfNidrXffI8",
  authDomain: "paws-on-patrol.firebaseapp.com",
  projectId: "paws-on-patrol",
  storageBucket: "paws-on-patrol.appspot.com",
  messagingSenderId: "730404987060",
  appId: "1:730404987060:web:74319bcad5a1961bf6b7e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);

// firestore
export const db = getFirestore(app);

//storage
export const storage = getStorage(app);

//func
export const functions = getFunctions(app);
// 使用已deploy的firebase function
export const createStripeCheckout = httpsCallable(
  functions,
  "createStripeCheckout"
);
