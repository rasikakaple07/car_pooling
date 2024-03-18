// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgaFYEujZQPNdihK84n3o_XIZZgGjVilI",
  authDomain: "carpooling-96921.firebaseapp.com",
  projectId: "carpooling-96921",
  storageBucket: "carpooling-96921.appspot.com",
  messagingSenderId: "479947692009",
  appId: "1:479947692009:web:e4883c6db3d35f6a7c5d78",
  measurementId: "G-ZG01Y51Q2G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export const db = getFirestore(app);

export default auth;
