import ArrowLeftSvg from "@/app/svgCollection/ArrowLeftSvg";
import React from "react";
import SearchBarItems from "./components/SearchBarItems";

const SearchBarResult = () => {
  return (
    <>
      <ArrowLeftSvg setActiveComponentByArrow={"clickMenuResult"} />
      <SearchBarItems />
    </>
  );
};

export default SearchBarResult;
