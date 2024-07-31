import Link from "next/link";
import { FC } from "react";

const VerificationSent: FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Verification Email Sent
        </h2>
        <p className="text-center text-gray-600">
          A verification email has been sent to your email address. Please check
          your inbox (and spam folder) to verify your account.
        </p>
        <Link href={"/auth"}>SignIn</Link>
      </div>
    </div>
  );
};

export default VerificationSent;
