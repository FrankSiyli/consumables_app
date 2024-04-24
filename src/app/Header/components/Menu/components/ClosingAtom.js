import React from "react";
import { useTheme } from "next-themes";

const ClosingAtom = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="relative flex flex-col items-center">
        <div className="absolute x-rotation h-7 w-7 border border-appOrange rounded-xl">
          <span className="absolute top-0 left-0.5 border border-appOrange w-1 h-1 rounded-full bg-appOrange"></span>
          <span className="absolute bottom-0 right-0.5 border border-appOrange w-1 h-1 rounded-full bg-appOrange"></span>
        </div>
        <div className="absolute y-rotation h-7 w-7 flex justify-between items-center border border-appOrange rounded-xl">
          <span className="absolute top-0 left-0.5 border border-appOrange w-1 h-1 rounded-full bg-appOrange"></span>
          <span className="absolute bottom-0 right-0.5 border border-appOrange w-1 h-1 rounded-full bg-appOrange"></span>
        </div>
        <div className="absolute z-rotation h-7 w-7 border border-appOrange rounded-xl">
          <span className="absolute top-0 left-0.5 border border-appOrange w-1 h-1 rounded-full bg-appOrange"></span>
          <span className="absolute bottom-0 right-0.5 border border-appOrange w-1 h-1 rounded-full bg-appOrange"></span>
        </div>
        <div className="absolute h-0.1 w-5 top-3.5 rotate-45 border rounded-full border-black dark:border-neutral-300"></div>
        <div className="absolute h-0.1 w-5 top-3.5 -rotate-45 border rounded-full border-black dark:border-neutral-300"></div>
      </div>
    </>
  );
};

export default ClosingAtom;
