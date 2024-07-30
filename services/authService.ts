"use client"

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Handle result (e.g., get user info)
    const user = result.user;
    console.log("User signed in:", user);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
