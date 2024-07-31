"use client";

import { signInWithGoogle } from "../services/authService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import NavBar from "@/components/Hero/NavBar";
import Hero from "@/components/Hero/Hero";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div>
      <NavBar />
      <Hero />
    </div>
  );
};

export default Home;
