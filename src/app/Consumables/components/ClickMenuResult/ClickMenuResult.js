import React from "react";
import ClickMenuItems from "./components/ClickMenuItems";
import HeaderCheckBoxes from "../CheckBoxes/components/HeaderCheckBoxes/HeaderCheckBoxes";
import LeftCheckBoxes from "../CheckBoxes/components/LeftCheckBoxes/LeftCheckBoxes";
import RightCheckBoxes from "../CheckBoxes/components/RightCheckBoxes/RightCheckBoxes";

const ClickMenuResult = () => {
  return (
    <>
      <div className="relative w-full mt-10 flex justify-between">
        <div className="absolute -top-14 w-full">
          <HeaderCheckBoxes />
        </div>
        <div className="w-1/4 ml-2 flex justify-center">
          <LeftCheckBoxes />
        </div>
        <div className="w-2/4 mx-2 flex justify-center text-sm md:text-base">
          <ClickMenuItems />
        </div>
        <div className="w-1/4 mr-2 flex justify-center">
          <RightCheckBoxes />
        </div>
      </div>
    </>
  );
};

export default ClickMenuResult;
