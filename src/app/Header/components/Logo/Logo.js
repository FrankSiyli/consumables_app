import { activeComponentState } from "@/app/recoil/atoms/activeComponentState";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";

const Logo = () => {
  const [, setActiveComponent] = useRecoilState(activeComponentState);

  const handleLogoClick = () => {
    setActiveComponent("clickMenuResult");
  };

  return (
    <Image
      className="w-14 h-14 ml-5 cursor-pointer border"
      src="/logo.jpg"
      alt="logo"
      quality={100}
      priority
      width={90}
      height={90}
      onClick={handleLogoClick}
    />
  );
};

export default Logo;
