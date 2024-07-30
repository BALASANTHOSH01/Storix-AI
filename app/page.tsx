// src/pages/index.tsx

import { signInWithGoogle } from "../services/authService";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold">Pantry Management System</h1>
      <button
        onClick={signInWithGoogle}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default Home;
