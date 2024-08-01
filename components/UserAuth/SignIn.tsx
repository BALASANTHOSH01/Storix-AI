import { useState, ChangeEvent, FC } from "react";
import {
  signInWithGoogle,
  signInWithEmail,
  logout,
} from "@/services/authService";
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignInForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (): Promise<void> => {
    try {
      await signInWithEmail(email, password);
      toast.success("Signed in successfully...redirecting to dashboard!");
      router.push('/dashboard'); // Redirect to dashboard
    } catch (error) {
      toast.error("Unable to sign in...please check the credentials!");
    }
  };

  const handleSignOut = async (): Promise<void> => {
    await logout();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6">
        <button
          onClick={signInWithGoogle}
          aria-label="Sign in with Google"
          className="flex items-center w-full justify-center border border-button-border-light rounded-md p-0.5 pr-3"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-l">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <title>Sign in with Google</title>
              <desc>Google G Logo</desc>
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                className="fill-google-logo-blue"
              ></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                className="fill-google-logo-green"
              ></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                className="fill-google-logo-yellow"
              ></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                className="fill-google-logo-red"
              ></path>
            </svg>
          </div>
          <span className="text-sm text-darkmode dark:text-lightmode tracking-wider">
            Continue with Google
          </span>
        </button>
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm leading-5">
            <span className="px-2 text-gray-500 bg-lightmode dark:bg-darkmode">
              Or continue with
            </span>
          </div>
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="w-full px-3 py-2 mt-2 border border-slate-400 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full px-3 py-2 mt-2 border border-slate-400 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          onClick={handleSignIn}
          className="w-full py-2 mt-4 text-white bg-purple-500 rounded-md"
        >
          Sign In
        </button>
      </div>
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default SignInForm;
