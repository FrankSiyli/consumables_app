import React from "react";

const ButtonClosing = ({ handleClick, secondProp }) => {
  return (
    <span
      onClick={handleClick}
      className="absolute top-7 right-5 cursor-pointer"
    >
      <div
        className={`w-7 border border-appBlue transform transition-all duration-1000 ${
          secondProp ? "rotate-45 translate-y-2" : "opacity-0"
        }`}
      ></div>

      <div
        className={`w-7 mt-4 border border-appBlue transform transition-all duration-1000 ${
          secondProp ? "-rotate-45 -translate-y-2.5" : "opacity-0"
        }`}
      ></div>
      <style jsx>{`
        span:hover div {
          border-color: var(--appOrange);
        }
      `}</style>
    </span>
  );
};

export default ButtonClosing;
