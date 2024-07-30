// src/components/DashboardLayout.tsx

import Link from "next/link";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold">Pantry Management</h2>
          <nav className="mt-6">
            <ul>
              <li><Link href="/dashboard/pantry" className="block p-4 hover:bg-gray-700">Pantry</Link></li>
              <li><Link href="/dashboard/inventory" className="block p-4 hover:bg-gray-700">Inventory</Link></li>
              <li><Link href="/dashboard/reports" className="block p-4 hover:bg-gray-700">Reports</Link></li>
              <li><Link href="/" className="block p-4 hover:bg-gray-700">Sign Out</Link></li>
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
