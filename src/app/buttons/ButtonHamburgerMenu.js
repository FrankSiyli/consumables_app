import React from "react";

const ButtonHamburgerMenu = ({ handleClick, secondProp }) => {
  return (
    <span onClick={handleClick} className="relative mr-5 cursor-pointer">
      <div
        className={`w-7 border border-appBlue dark:border-white transform transition-all duration-1000 ${
          secondProp ? "rotate-45 translate-y-2.5 opacity-0" : ""
        }`}
      ></div>

      <div
        className={`w-5 my-2 ml-2 border border-appOrange transform transition-all duration-700 ${
          secondProp ? "-translate-x-[3000px] w-40" : ""
        }`}
      ></div>

      <div
        className={`w-7 border border-appBlue dark:border-white transform transition-all duration-1000 ${
          secondProp ? "-rotate-45 -translate-y-2.5 opacity-0" : ""
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

export default ButtonHamburgerMenu;
