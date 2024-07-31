'use client'

import { NextPage, NextPageContext } from 'next';
import { getAuth, getRedirectResult, Auth } from 'firebase/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/firebase/config'; // Import your existing auth instance

interface WithAuthProps {
  // Add any additional props needed for authentication here
}

export function withAuth<P>(WrappedComponent: NextPage<P>) {
  const Wrapper: NextPage<P> = (props) => {
    return <WrappedComponent {...props as P} />;
  };

  Wrapper.getServerSideProps = async (context: NextPageContext) => {
    const { req, res } = context;
    const authInstance = getAuth();
    
    try {
      // Handle Firebase authentication redirects if needed
      await getRedirectResult(authInstance);

      // Check for authentication on server-side
      const token = await authInstance.currentUser?.getIdToken();
      
      if (!token) {
        // If no token, redirect to login page
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }

      // Return the original getServerSideProps if any
      if (WrappedComponent.getServerSideProps) {
        return WrappedComponent.getServerSideProps(context);
      }

      return { props: {} as P };
    } catch (error) {
      console.error('Authentication error:', error);
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  };

  return Wrapper;
}
