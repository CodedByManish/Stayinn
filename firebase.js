// Firebase initialization for Stayinn.
// Config from the project .env (public client config).
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export function googleErrorMessage(err) {
  const code = err && err.code ? String(err.code) : "";
  switch (code) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "The sign-in window was closed. Please try again.";
    case "auth/unauthorized-domain":
      return "Sign-in is blocked for this domain. Contact the property owner.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email. Sign in with the original method first.";
    case "auth/popup-blocked":
      return "The popup was blocked by your browser. Allow popups and try again.";
    default:
      return "Google sign-in failed. Please try again.";
  }
}

export { signInWithPopup, signInWithRedirect, getRedirectResult, signOut };