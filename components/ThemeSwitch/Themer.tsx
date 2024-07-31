"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Sun, MoonStars } from "@phosphor-icons/react";

export default function Themer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <button
        className=" w-10 h-10 rounded-full transition-colors duration-300 focus:outline-none "
        id="theme-toggle"
        aria-label="auto"
        aria-live="polite"
        onClick={handleClick}
      >
        {theme === "dark" ? (
          <Sun className=" text-purple-200" />
        ) : (
          <MoonStars className=" text-purple-heart-600" />
        )}
      </button>
    </div>
  );
}