"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import UserProfile from "../User/UserProfile";
import { HiMiniViewfinderCircle as AIIcon } from "react-icons/hi2";
import { TbLayoutDashboardFilled as Dashboard } from "react-icons/tb";
import {
  FaRegUserCircle,
  FaClipboardList,
  FaBox,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import Themer from "../ThemeSwitch/Themer";
import Image from "next/image";
import StroixAI from "@/public/storixai.png";
import Tooltip from "../Tooltip/ToolTip";
import { useAuth } from "@/hooks/useAuth";
import { toast, Toaster } from "sonner";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();

  const handleSignOut = async () => {
    toast(
      <div className="flex flex-col text-center justify-center items-center">
        <p className="mb-4 text-xl font-bold">Are you sure you want to sign out?</p>
        <div className="flex items-center gap-4">
          <button
            className="px-3 py-1 bg-gradient-to-tr from-emerald-300 to-green-500 rounded-lg"
            onClick={async () => {
              try {
                await signOut(auth);
                window.location.href = "/";
              } catch (error) {
                console.error("Error signing out:", error);
              }
              toast.dismiss();
            }}
          >
            Confirm
          </button>
          <button
            className="px-3 py-1 bg-gradient-to-tr from-red-300 to-red-500 rounded-lg"
            onClick={() => toast.dismiss()}
          >
            Dismiss
          </button>
        </div>
      </div>,
      {
        duration: 5000,
      }
    );
  };

  const handleImageClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen">
      <aside
        className={`transition-all duration-300 pl-2 lg:hidden ease-in-out border-r border-slate-600 rounded-r-2xl ${
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
            <li className=" text-2xl p-4 md:hidden">
              <Themer />
            </li>
            <li className=" hover:bg-slate-300 dark:hover:bg-slate-900 rounded-lg">
              <Link
                href="/dashboard"
                className="block p-4 flex items-center gap-3 "
              >
                <Dashboard />
                {isExpanded && <span>Dashboard</span>}
              </Link>
            </li>
            <li className=" hover:bg-slate-300 dark:hover:bg-slate-900 rounded-lg">
              <Link
                href="/dashboard/pantry"
                className="block p-4 flex items-center gap-3"
              >
                <FaClipboardList />
                {isExpanded && <span>Pantry</span>}
              </Link>
            </li>
            <li className=" hover:bg-slate-300 dark:hover:bg-slate-900 rounded-lg">
              <Link
                href="/dashboard/inventory"
                className="block p-4 flex items-center gap-3"
              >
                <FaBox />
                {isExpanded && <span>Inventory</span>}
              </Link>
            </li>
            <li className=" hover:bg-slate-300 dark:hover:bg-slate-900 rounded-lg">
              <Link
                href="/dashboard/storai"
                className=" p-4 flex items-center gap-3 "
              >
                <AIIcon />
                {isExpanded && <span>Storai</span>}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto p-4 border-t border-gray-700 md:hidden">
          <UserProfile isExpanded={isExpanded} />
        </div>
        <button
          onClick={handleSignOut}
          className="w-full p-4 flex items-center justify-start gap-3 md:hidden"
        >
          <FaSignOutAlt />
          {isExpanded && <span>Sign Out</span>}
        </button>
      </aside>
      <div className=" fixed top-0 left-1/2 z-10 transform -translate-x-1/2 bg-slate-300 bg-opacity-30 dark:bg-slate-950 dark:bg-opacity-30 backdrop-blur-xl hidden lg:flex justify-between px-6 items-center w-full h-16 border-t border-gray-700 shadow-lg">
        <Link href={"/"} className=" flex items-center gap-1 justify-center">
          <Image src={StroixAI} width={40} alt="Stroix AI" />
          <p className=" font-bold text-2xl md:hidden">Stroix AI</p>
        </Link>
        <div className=" flex items-center justify-center gap-2">
          <div className=" text-2xl ">
            <Themer />
          </div>
          {user?.photoURL && (
            <div className="relative w-10 h-10">
              <Image
                src={user.photoURL || "https://avatar.iran.liara.run/public"}
                alt={user.displayName || "User"}
                layout="fill" // Fill the container
                className="rounded-full object-cover"
                onClick={handleImageClick}
              />
            </div>
          )}
          {isModalOpen && (
            <div className="fixed inset-0 top-24 flex items-center justify-center z-50 ">
              <div className="bg-white w-[60%] md:w-[90%] p-4 rounded-lg shadow-lg relative">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
                <div className="user-profile">
                  <div className="relative w-10 h-10">
                    <Image
                      src={
                        user?.photoURL || "https://avatar.iran.liara.run/public"
                      }
                      alt={user?.displayName || "User"}
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-semibold text-wrap max-w-[100px]">
                    {user?.displayName || "Guest"}
                  </p>
                  <p className="text-xs text-gray-400 max-w-[100px]">
                    {user?.email || "Not logged in"}
                  </p>
                  <button onClick={handleSignOut} className="bg-gradient-to-br from-blue-300 to-purple-600 px-4 py-2 rounded-xl hover:from-purple-300 hover:to-purple-600 transition ease-in-out duration-200 font-bold mt-2">Sign out</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <nav className="fixed bottom-0 z-10 left-1/2 transform -translate-x-1/2 bg-slate-300 bg-opacity-30 dark:bg-slate-950 dark:bg-opacity-30 backdrop-blur-xl hidden lg:flex justify-around items-center w-full h-16 border-t border-gray-700 shadow-lg">
        <ul className="flex justify-around items-center w-full">
          <li>
            <Tooltip title={"Dashboard"}>
              <Link
                href="/dashboard"
                className="flex flex-col items-center p-2"
              >
                <Dashboard className="text-2xl" />
                <span className="text-sm md:hidden">Dashboard</span>
              </Link>
            </Tooltip>
          </li>
          <li>
            <Tooltip title={"Pantry"}>
              <Link
                href="/dashboard/pantry"
                className="flex flex-col items-center p-2"
              >
                <FaClipboardList className="text-2xl" />
                <span className="text-sm md:hidden">Pantry</span>
              </Link>
            </Tooltip>
          </li>
          <li>
            <Tooltip title={"Inventory"}>
              <Link
                href="/dashboard/inventory"
                className="flex flex-col items-center p-2"
              >
                <FaBox className="text-2xl" />
                <span className="text-sm md:hidden">Inventory</span>
              </Link>
            </Tooltip>
          </li>
          <li>
            <Tooltip title={"Storai"}>
              <Link
                href="/dashboard/storai"
                className="flex flex-col items-center p-2"
              >
                <AIIcon className="text-2xl" />
                <span className="text-sm md:hidden">Storai</span>
              </Link>
            </Tooltip>
          </li>
        </ul>
      </nav>
      <Toaster richColors position="top-center" />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
