import Link from "next/link";
import React from "react";

const BuyMeCoffee = () => {
  return (
    <div id="support">
      <div className=" py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Enjoying our product?
            </h2>
            <p className="my-3 text-gray-500 dark:text-gray-400 sm:my-4">
              Consider buying us a coffee to support our work!
            </p>
            <Link href={'https://buymeacoffee.com/manojkumar20'} className="mt-8">
              <img
                className="mx-auto h-14"
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me a Coffee"
              />
            </Link>
          </div>
        </div>
      </div>
      {/* <div className=" p-4 text-center border-t flex justify-between border-slate-500">
        <p className=" text-slate-500">&#9400; Copyright 2024 Storix!</p>
        <p>Build with love ❤️!</p>
      </div> */}
    </div>
  );
};

export default BuyMeCoffee;
