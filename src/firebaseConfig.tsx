import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAy3aGh2jlYW7x7LZyS6UECMH1MeV0YO_8",
  authDomain: "cursed-nights.firebaseapp.com",
  projectId: "cursed-nights",
  storageBucket: "cursed-nights.appspot.com",
  messagingSenderId: "159479364985",
  appId: "1:159479364985:web:96c16782afa6d46d2b03a8",
  measurementId: "G-XR73Z79KYQ",
  databaseURL: "https://cursed-nights-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
localStorage.setItem("app", JSON.stringify(app));
