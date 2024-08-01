"use client";

import { signInWithGoogle } from "../services/authService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import NavBar from "@/components/Hero/NavBar";
import Hero from "@/components/Hero/Hero";
import Features from "@/components/Features/Features"
import BuyMeCoffee from "@/components/Support/BuyMeCoffee";

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
      <Features />
      <BuyMeCoffee />
    </div>
  );
};

export default Home;
