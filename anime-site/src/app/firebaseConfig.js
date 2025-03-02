import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBn48GHLYxiDMio5ItOISV-e5FK15aKN5Y",
    authDomain: "anivara-c56ec.firebaseapp.com",
    projectId: "anivara-c56ec",
    storageBucket: "anivara-c56ec.firebasestorage.app",
    messagingSenderId: "214632684791",
    appId: "1:214632684791:web:c1fa3e076bc5535261c7f2",
    measurementId: "G-0W3Q1ZNM7X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Apple Auth Provider
const appleProvider = new OAuthProvider("apple.com");

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

const signInWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    return result.user;
  } catch (error) {
    console.error("Apple Sign-In Error:", error);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export { auth, signInWithGoogle, signInWithApple, logout };
