import { activeComponentState } from "@/app/recoil/atoms/activeComponentState";
import { isAdminState } from "@/app/recoil/atoms/isAdminState";
import React from "react";
import { useRecoilState } from "recoil";

const LogoutButton = () => {
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminState);

  const [, setActiveComponent] = useRecoilState(activeComponentState);

  const handleLogoutClick = () => {
    setIsAdmin(false);
    setActiveComponent("clickMenuResult");
  };

  return (
    <button
      onClick={handleLogoutClick}
      className="text-white border border-black p-1 bg-red-500 rounded shadow hover:scale-105"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
