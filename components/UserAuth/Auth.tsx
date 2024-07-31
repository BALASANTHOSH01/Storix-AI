"use client";
import { useState, FC } from "react";
import SignUpForm from "./SignUp";
import SignInForm from "./SignIn";
import Image from "next/image";
import StroixAI from "@/public/storixai.png";
import Link from "next/link";

const AuthPage: FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  const toggleForm = (): void => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className=" flex flex-col items-center justify-center  min-h-screen">
      {isSignUp ? (
        <div className=" flex flex-col items-center justify-center py-6">
            <Link href={'/'}><Image src={StroixAI} width={100} alt="stroixai"></Image></Link>
          <h1 className=" text-3xl font-bold pt-2">SignIn to Storix AI</h1>
        </div>
      ) : (
        <div className=" flex flex-col items-center justify-center py-6">
          <Link href={'/'}><Image src={StroixAI} width={100} alt="stroixai"></Image></Link>
          <h1 className=" text-3xl font-bold pt-2">SignUp to Storix AI</h1>
        </div>
      )}

      <div className="flex justify-center items-center pb-6">
        <div className="w-full max-w-md p-8 space-y-6 rounded-lg border border-slate-300 shadow-lg">
          {isSignUp ? <SignInForm /> : <SignUpForm />}
          <div className="text-center">
            <button
              onClick={toggleForm}
              className="text-purple-500 hover:underline"
            >
              {isSignUp
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
