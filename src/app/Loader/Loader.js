"use client";
import { isLoadingState } from "@/app/recoil/atoms/isLoadingState";
import React from "react";
import { useRecoilState } from "recoil";

const Loader = () => {
  const [isLoading] = useRecoilState(isLoadingState);

  return (
    <>
      <div>
        {isLoading ? (
          <div className="relative m-24 flex flex-col items-center">
            <div className="absolute x-rotation h-7 w-7 border border-appOrange rounded-full">
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
            <div className="absolute h-1 w-1 top-3.5 border border-appOrange bg-appOrange rounded-full"></div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Loader;
