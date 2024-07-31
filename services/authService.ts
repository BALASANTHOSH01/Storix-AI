"use client"

import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserCredential, sendEmailVerification } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";

export const signInWithGoogle = async (): Promise<void> => {
  try {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("User signed in:", user);
    window.location.href = '/dashboard'; // Redirect to dashboard
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

export const signUpWithEmail = async (email: string, password: string, username: string): Promise<void> => {
  try {
    const result: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    await updateProfile(user, { displayName: username });
    await sendEmailVerification(user); // Send verification email
    console.log("User signed up and verification email sent:", user);
    window.location.href = '/auth/verification-sent'; // Redirect to a verification sent page or show a message
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<void> => {
  try {
    const result: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    console.log("User signed in:", user);
    window.location.href = '/dashboard'; // Redirect to dashboard
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User signed out");
    window.location.href = '/'; // Redirect to home
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
