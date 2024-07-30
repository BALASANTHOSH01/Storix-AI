"use client"

import { NextPage } from 'next';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config'; // Import your existing auth instance

export function withAuth<P>(WrappedComponent: NextPage<P>) {
  const Wrapper: NextPage<P> = (props) => <WrappedComponent {...props} />;

  Wrapper.getServerSideProps = async (context) => {
    const authInstance = getAuth();
    const user = await new Promise<any>((resolve) => {
      const unsubscribe = onAuthStateChanged(authInstance, (user) => {
        resolve(user);
        unsubscribe();
      });
    });

    if (!user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return { props: {} };
  };

  return Wrapper;
}
