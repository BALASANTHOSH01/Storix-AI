"use client"

// src/components/ProtectedRoute.tsx

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
