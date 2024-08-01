import { useState, ChangeEvent, FC } from "react";
import { signUpWithEmail } from "@/services/authService";
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignUpForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const handleSignUp = async (): Promise<void> => {
    try {
      await signUpWithEmail(email, password, username);
      toast.success("Signup successful...redirecting to dashboard!");
      router.push('/dashboard');
    } catch (error) {
      toast.error("Unable to sign up...please check after some time!");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg ">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="w-full px-3 py-2 mt-2 border rounded-md bg-transparent border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full px-3 py-2 mt-2 border rounded-md bg-transparent border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          className="w-full px-3 py-2 mt-2 border rounded-md bg-transparent border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleSignUp}
          className="w-full py-2 mt-4 text-white bg-purple-500 rounded-md"
        >
          Sign Up
        </button>
      </div>
      <Toaster richColors position="top-center"  />
    </div>
  );
};

export default SignUpForm;
