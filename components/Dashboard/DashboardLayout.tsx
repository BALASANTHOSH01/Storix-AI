"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

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
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold">Storix AI</h2>
          <nav className="mt-6">
            <ul>
              <li><Link href="/dashboard/pantry" className="block p-4 hover:bg-gray-700">Pantry</Link></li>
              <li><Link href="/dashboard/inventory" className="block p-4 hover:bg-gray-700">Inventory</Link></li>
              <li><Link href="/dashboard/reports" className="block p-4 hover:bg-gray-700">Reports</Link></li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="w-full p-4 text-left hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
