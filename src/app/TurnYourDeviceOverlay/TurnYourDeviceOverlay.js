"use client";
import MobileSvg from "@/app/svgCollection/MobileSvg";
import RotateSvg from "@/app/svgCollection/RotateSvg";
import React, { useState, useEffect } from "react";

const TurnYourDeviceOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setShowOverlay(windowWidth < 500);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {showOverlay && (
        <div className="fixed flex flex-col items-center justify-center z-50 rounded-sm top-24 left-0 right-0 bottom-0 bg-appOrange text-xl opacity-90 shadow-2xl">
          <p>Please turn your device</p>
          <div className="flex items-center m-4 gap-4">
            <MobileSvg rotate={0} />
            <RotateSvg />
            <MobileSvg rotate={90} />
          </div>
        </div>
      )}
    </>
  );
};

export default TurnYourDeviceOverlay;
