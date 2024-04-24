import React from "react";
import CheckBox from "../../CheckBox";
import vacuumArray from "@/app/arrays/vacuumArray";
import tensileStrenghtArray from "../../../../../arrays/tensileStrenghtArray";
import materialArray from "../../../../../arrays/materialArray";

const RightCheckBoxes = () => {
  return (
    <>
      <div className="w-full max-w-60">
        <CheckBox categoryTitle="material" items={materialArray} />
        <CheckBox
          categoryTitle="tensileStrenght"
          items={tensileStrenghtArray}
        />
        <CheckBox categoryTitle="vacuum" items={vacuumArray} />
      </div>
    </>
  );
};

export default RightCheckBoxes;
