"use client";
import React, { useState } from "react";
import Image from "next/image";
import StroixAI from "@/public/storixai.png";
import Link from "next/link";
import Themer from "../ThemeSwitch/Themer";
import PrimaryBtn from "../Button/PrimaryBtn";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div>
      <div className=" flex items-center justify-around md:justify-between w-full px-8 py-4">
        <Link href={"/"} className=" flex items-center gap-1 justify-center">
          <Image src={StroixAI} width={40} alt="Stroix AI" />
          <p className=" font-bold text-2xl">Storix AI</p>
        </Link>
        <div className=" flex w-[40%] justify-around items-center md:hidden">
          <Link href={"/#features"}>Features</Link>
          <Link href={"/#support"}>Support</Link>
          <Link href={"/#use-cases"}>Use Cases</Link>
        </div>
        <div className=" flex items-center justify-center gap-6 md:hidden">
          <div className=" text-2xl">
            <Themer />
          </div>
          <div className="bg-gradient-to-br from-blue-300 to-purple-600 px-5 py-3 rounded-xl hover:from-purple-300 hover:to-purple-600 transition ease-in-out duration-200 font-bold">
            <Link href={"/auth"}>SignIn</Link>
          </div>
        </div>
        <div className="  hidden md:block gap-2">
          <div className=" flex items-center justify-center">
            <div className=" text-xl items-center justify-center hidden md:block mt-1">
              <Themer />
            </div>
            <button
              onClick={toggleMenu}
              className="hidden md:flex items-center"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
          <div
            className={`fixed inset-0 bg-lightmode dark:bg-darkmode z-10 shadow-lg transition-transform transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col p-6 z-10">
              <button
                onClick={toggleMenu}
                className="self-end mb-4"
                aria-label="Close Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="#404040"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Link
                href={"#features"}
                onClick={toggleMenu}
                className="py-2 text-gray-800 dark:text-lightmode "
              >
                Features
              </Link>
              <Link
                href={"#support"}
                onClick={toggleMenu}
                className="py-2 text-gray-800 dark:text-lightmode "
              >
                Support
              </Link>
              <Link
                href={"#use-cases"}
                onClick={toggleMenu}
                className="py-2 text-gray-800 dark:text-lightmode "
              >
                Use Cases
              </Link>
            </div>
            <div className="p-6">
              <PrimaryBtn children={"SignIn"} href={"/auth"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
