"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import UserProfile from "../User/UserProfile"; // Import the UserProfile component
import { HiMiniViewfinderCircle as AIIcon } from "react-icons/hi2";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const handleSignOut = async () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      try {
        await signOut(auth);
        window.location.href = "/";
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 flex-shrink-0">
          <h2 className="text-xl font-bold">Storix AI</h2>
          <nav className="mt-6">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/dashboard/pantry"
                  className="block p-4 hover:bg-gray-700 rounded"
                >
                  Pantry
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/inventory"
                  className="block p-4 hover:bg-gray-700 rounded"
                >
                  Inventory
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/reports"
                  className="block p-4 hover:bg-gray-700 rounded"
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/storai"
                  className="p-4 hover:bg-gray-700 rounded flex flex-row items-center gap-3"
                >
                  <p>Storai</p>
                  <AIIcon />
                </Link>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="w-full p-4 text-left hover:bg-gray-700 rounded"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Add margin-top auto to push the profile to the bottom */}
        <div className="mt-auto p-4 border-t border-gray-700">
          <UserProfile /> {/* Display user profile at the bottom */}
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
