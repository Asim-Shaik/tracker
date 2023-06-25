// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEDkHQRbtLrs_T4BpOqd-OQ7KTCpdEP4Q",
  authDomain: "rto-tracker.firebaseapp.com",
  projectId: "rto-tracker",
  storageBucket: "rto-tracker.appspot.com",
  messagingSenderId: "466326354912",
  appId: "1:466326354912:web:49795da51d284759cc8985",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
