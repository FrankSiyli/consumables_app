"use client";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import Menu from "./components/Menu/Menu";
import SearchBar from "./components/SearchBar/SearchBar";
import XfelLogo from "./components/Logo/Logo";
import ButtonHamburgerMenu from "@/app/buttons/ButtonHamburgerMenu";
import { useRecoilState } from "recoil";
import { isAdminState } from "@/app/recoil/atoms/isAdminState";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import AddNewItemButton from "./components/AddNewItemButton/AddNewItemButton";

const Header = () => {
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminState);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="fixed z-10 top-0 left-0 w-full h-24 flex justify-between items-center backdrop-blur border-b border-black/20 shadow">
        {isAdmin ? (
          <div className="ml-5 flex gap-2">
            <LogoutButton />
            <AddNewItemButton />
          </div>
        ) : (
          <XfelLogo />
        )}
        <SearchBar />

        <ButtonHamburgerMenu
          handleClick={handleMenuClick}
          secondProp={showMenu}
        />
      </div>

      <Menu
        ref={menuRef}
        showMenu={showMenu}
        handleMenuClick={handleMenuClick}
      />
    </>
  );
};

export default Header;
