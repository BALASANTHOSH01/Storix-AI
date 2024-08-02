import React from 'react';
import { Github } from 'lucide-react';
import PrimaryBtn from '../Button/PrimaryBtn';
import SecondaryBtn from '../Button/SecondaryBtn';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className=" bg-[#121212]">
        <div className=" mx-auto text-white p-10">
            <div className="text-center">
                <h3 className="text-3xl mb-3">Storix AI - Revolutionize Your Pantry Management</h3>
                <p> Say goodbye to pantry chaos! </p>
                <div className="flex items-center lg:flex-col gap-5 justify-center my-10">
                    <PrimaryBtn children={'SignUp - Get Free Access'} href={'/auth'} />
                    <SecondaryBtn children={"Login - If you've Account"} href={'/auth'} />
                </div>
            </div>
            <div className="mt-10 flex lg:flex-col-reverse gap-4 justify-between  items-center text-sm text-gray-400">
                <p className=""> &copy;Storix AI, {new Date().getFullYear()}. All rights reserved. </p>
                <div className="">
                    <Link href={'#features'} className="px-2">Features</Link>
                    <Link href={'#support'} className="px-2 border-l">Support</Link>
                    <Link href={'#use-cases'} className="px-2 border-l">Use Cases</Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Footer;
