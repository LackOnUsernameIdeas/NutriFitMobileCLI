import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDwqaIBGxmhEc6GVR3lwOVk_-0EpwKvOPA",
  authDomain: "nutrifit-ed16d.firebaseapp.com",
  databaseURL: "https://nutrifit-ed16d-default-rtdb.firebaseio.com",
  projectId: "nutrifit-ed16d",
  storageBucket: "nutrifit-ed16d.appspot.com",
  messagingSenderId: "545280060552",
  appId: "1:545280060552:web:6310a9073b1c04855e833d",
  measurementId: "G-M517PKG0NX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
