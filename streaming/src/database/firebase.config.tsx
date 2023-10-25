// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export { auth, firestore };
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRcTVJ0NPZHmEED-QUOkuZwt532nUeWkA",
  authDomain: "cinewave-5c61d.firebaseapp.com",
  projectId: "cinewave-5c61d",
  storageBucket: "cinewave-5c61d.appspot.com",
  messagingSenderId: "1042205952299",
  appId: "1:1042205952299:web:8c62f88221307ac9d79d6e",
  measurementId: "G-68XC6TQJQQ"
};

export default firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);