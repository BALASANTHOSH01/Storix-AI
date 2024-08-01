import React from "react";

const Tooltip = ({ children, title }:any) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="absolute bottom-5 flex flex-col items-center mb-6 hidden group-hover:flex">
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-md">
          {title}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
      </div>
    </div>
  );
};

export default Tooltip;
