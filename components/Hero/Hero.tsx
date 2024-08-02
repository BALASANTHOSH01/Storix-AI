import React from "react";
import PrimaryBtn from "../Button/PrimaryBtn";
import SecondaryBtn from "../Button/SecondaryBtn";
import Image from "next/image";
import HeroImg from "@/public/hero.png";

const Hero = () => {


  return (
    <div className=" flex flex-col items-center justify-center">
      <div className=" min-h-dvh flex flex-col items-center justify-center w-[80%] md:w-[100%] text-center p-10">
        <h1 className=" text-5xl font-bold bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent p-2">
          Revolutionize Your Pantry Management
        </h1>
        <p className=" text-slate-500 py-6 md:text-sm">
          Say goodbye to pantry chaos and hello to a smarter, more efficient way
          to manage your kitchen. Our state-of-the-art pantry management system
          is designed to streamline your food storage, reduce waste, and save
          you money. Join the revolution in pantry management. Our system makes
          it easier than ever to organize your kitchen, reduce waste, and save
          money. Start your journey to a more efficient pantry today!
        </p>
        <div className=" flex md:flex-col items-center justify-center gap-5">
          <PrimaryBtn href={"/auth"} children={"SignUp Now - Free"} />
          <SecondaryBtn href={"/#how-it-works"} children={"Explore More"} />
        </div>
        <div className=" py-8 ">
          <Image src={HeroImg} alt="Hero Banner" className=" rounded-b-2xl shadow-xl"></Image>
        </div>
      </div>
    </div>
  );
};

export default Hero;
