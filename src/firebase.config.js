import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDPJLtuEnn3M599D5xRBzcuWfNidrXffI8",
  authDomain: "paws-on-patrol.firebaseapp.com",
  projectId: "paws-on-patrol",
  storageBucket: "paws-on-patrol.appspot.com",
  messagingSenderId: "730404987060",
  appId: "1:730404987060:web:74319bcad5a1961bf6b7e1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const functions = getFunctions(app);

export const createStripeCheckout = httpsCallable(
  functions,
  "createStripeCheckout"
);
