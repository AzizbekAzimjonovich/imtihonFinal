import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAPTgvnnigRkjSbIcPzj_2JqMPsdALlo5A",
  authDomain: "userinfo-ad81e.firebaseapp.com",
  projectId: "userinfo-ad81e",
  storageBucket: "userinfo-ad81e.appspot.com",
  messagingSenderId: "984529731205",
  appId: "1:984529731205:web:389bc316e5d296832e73ec",
  measurementId: "G-SSTTSBR510",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
