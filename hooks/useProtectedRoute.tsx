// hooks/useProtectedRoute.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config'; // Import your existing auth instance

const useProtectedRoute = () => {
  const router = useRouter();
  const authInstance = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [authInstance, router]);
};

export default useProtectedRoute;
