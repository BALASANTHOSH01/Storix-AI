// components/UserProfile.tsx
"use client";

import { useAuth } from "@/hooks/useAuth"; // Ensure this hook is created to get user data
import Image from "next/image";

const UserProfile = () => {
  const { user } = useAuth(); // Fetch user data

  return (
    <div className="p-4 border-gray-700 flex items-center space-x-4">
      {user?.photoURL ? (
        <div className="relative w-10 h-10">
          <Image
            src={user.photoURL}
            alt={user.displayName || 'User'}
            layout="fill" // Fill the container
            className="rounded-full object-cover"
          />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
      )}
      <div>
        <p className="text-sm font-semibold">{user?.displayName || 'Guest'}</p>
        <p className="text-xs text-gray-400">{user?.email || 'Not logged in'}</p>
      </div>
    </div>
  );
};

export default UserProfile;
