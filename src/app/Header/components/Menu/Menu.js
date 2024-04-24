import ArrowRightSvg from "@/app/svgCollection/ArrowRightSvg";
import React, { forwardRef, useEffect, useState } from "react";
import menuItemsArray from "./menuItemsArray/menuItemsArray";
import ClosingAtom from "./components/ClosingAtom";
import DarkModeButton from "../DarkModeButton/DarkModeButton";
import { useTheme } from "next-themes";

const Menu = forwardRef(({ showMenu, handleMenuClick }, ref) => {
  const { theme, setTheme } = useTheme();

  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <div
      className={`${
        showMenu
          ? "fixed top-0 left-0 w-full h-full shadow-2xl z-10 bg-neutral-800/50"
          : ""
      }`}
    >
      {loaded ? (
        <div
          ref={ref}
          className={`fixed  top-2 right-2 bottom-2 w-52 p-5 rounded flex flex-col justify-center border border-appOrange z-20 transform transition-transform ${
            showMenu ? "" : "translate-x-56"
          } ${theme === "dark" ? "backdrop-blur-xl" : "bg-white"} duration-500`}
        >
          <span
            onClick={handleMenuClick}
            className="absolute top-5 left-8 cursor-pointer"
          >
            <DarkModeButton />
          </span>
          <span
            onClick={handleMenuClick}
            className="absolute top-5 right-8 cursor-pointer"
          >
            <ClosingAtom />
          </span>

          <span className="fixed left-0 right-0 flex flex-col w-52">
            {menuItemsArray.map((menuItem, menuItemIndex) => (
              <div
                key={menuItemIndex}
                className="flex justify-between items-center mx-1 hover:text-appOrange cursor-pointer border-b"
              >
                <p className="ml-2">{menuItem.title}</p>
                <span className="scale-75">
                  <ArrowRightSvg />
                </span>
              </div>
            ))}
          </span>
          <div className="fixed right-0 left-0 bottom-0 h-10 text-sm flex justify-center items-center text-appBlue rounded-sm-b bg-appOrange">
            support:
            <a className="underline p-1" href="mailto:example@mail.com">
              example@mail.com
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
});

Menu.displayName = "Menu";

export default Menu;
