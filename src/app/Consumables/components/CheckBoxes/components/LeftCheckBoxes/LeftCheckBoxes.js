import React from "react";
import typeArray from "../../../../../arrays/typeArray";
import widthArray from "../../../../../arrays/widthArray";
import CheckBox from "../../CheckBox";
import lengthArray from "../../../../../arrays/lengthArray";
import toolTypeArray from "../../../../../arrays/toolTypeArray";

const LeftCheckBoxes = () => {
  return (
    <>
      <div className="w-full max-w-60">
        <CheckBox categoryTitle="type" items={typeArray} />
        <CheckBox categoryTitle="consumableWidth" items={widthArray} />
        <CheckBox categoryTitle="consumableLength" items={lengthArray} />
        <CheckBox categoryTitle="toolType" items={toolTypeArray} />
      </div>
    </>
  );
};

export default LeftCheckBoxes;
