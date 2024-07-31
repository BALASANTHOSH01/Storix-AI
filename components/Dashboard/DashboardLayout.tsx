"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import UserProfile from "../User/UserProfile";
import { HiMiniViewfinderCircle as AIIcon } from "react-icons/hi2";
import { TbLayoutDashboardFilled as Dashboard } from "react-icons/tb";
import { FaRegUserCircle, FaClipboardList, FaBox, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import Themer from "../ThemeSwitch/Themer";
import Image from "next/image";
import StroixAI from "@/public/storixai.png";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
      <aside
        className={`transition-all duration-300 ease-in-out border-r border-slate-600 rounded-r-2xl ${
          isExpanded ? "w-[20%]" : "w-[5%]"
        } dark:bg-gray-950 bg-slate-200 flex flex-col group`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="p-4 flex-shrink-0 flex items-start justify-start">
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={StroixAI} width={40} alt="Stroix AI" />
            {isExpanded && <p className="font-bold text-2xl">Stroix AI</p>}
          </Link>
        </div>
        <nav className=" flex items-center justify-center font-semibold flex-grow">
          <ul className="flex flex-col items-start w-full">
            <li className=" text-2xl p-4">
              <Themer />
            </li>
            <li>
              <Link
                href="/dashboard"
                className="block p-4 rounded flex items-center gap-3"
              >
                <Dashboard />
                {isExpanded && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/pantry"
                className="block p-4 rounded flex items-center gap-3"
              >
                <FaClipboardList />
                {isExpanded && <span>Pantry</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/inventory"
                className="block p-4 rounded flex items-center gap-3"
              >
                <FaBox />
                {isExpanded && <span>Inventory</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/reports"
                className="block p-4 rounded flex items-center gap-3"
              >
                <FaChartBar />
                {isExpanded && <span>Reports</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/storai"
                className=" p-4 rounded flex items-center gap-3"
              >
                <AIIcon />
                {isExpanded && <span>Storai</span>}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto p-4 border-t border-gray-700">
          <UserProfile isExpanded={isExpanded} />
        </div>
        <button
          onClick={handleSignOut}
          className="w-full p-4 flex items-center justify-start gap-3"
        >
          <FaSignOutAlt />
          {isExpanded && <span>Sign Out</span>}
        </button>
      </aside>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
