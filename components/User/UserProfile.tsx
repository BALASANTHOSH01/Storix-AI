// components/UserProfile.tsx
"use client";

import { useAuth } from "@/hooks/useAuth"; // Ensure this hook is created to get user data
import Image from "next/image";

const UserProfile = ({isExpanded}:any) => {
  const { user } = useAuth(); // Fetch user data
  

  return (
    <div className=" border-gray-700 flex items-center space-x-4">
      {user?.photoURL && !isExpanded && (
        <div className="relative w-10 h-10">
          <Image
            src={user.photoURL || 'https://avatar.iran.liara.run/public'}
            alt={user.displayName || 'User'}
            layout="fill" // Fill the container
            className="rounded-full object-cover"
          />
        </div>
      ) }
      <div className={`${isExpanded ? 'block' : 'hidden'}`}>
        {user?.photoURL && (
          <div className="relative w-10 h-10">
          <Image
            src={user.photoURL || 'https://avatar.iran.liara.run/public'}
            alt={user.displayName || 'User'}
            layout="fill" // Fill the container
            className="rounded-full object-cover"
          />
        </div>
        )}
        <p className="text-sm font-semibold text-wrap max-w-[100px]">{user?.displayName || 'Guest'}</p>
        <p className="text-xs text-gray-400  max-w-[100px]">{user?.email || 'Not logged in'}</p>
      </div>
    </div>
  );
};

export default UserProfile;
