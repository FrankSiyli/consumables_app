import React from "react";
import { useRecoilState } from "recoil";
import { selectedCheckBoxesState } from "@/app/recoil/atoms/selectedCheckBoxesState";
import useCapitalizeFirstLetter from "@/app/useFunctions/useCapitalizeFirstLetter";

const HeaderCheckBoxes = () => {
  const [selectedCheckBoxes, setSelectedCheckBoxes] = useRecoilState(
    selectedCheckBoxesState
  );

  const handleCheckBoxClick = (categoryTitle) => {
    setSelectedCheckBoxes((prevSelectedItems) => {
      const updatedSelectedItems = { ...prevSelectedItems };
      if (updatedSelectedItems[categoryTitle]) {
        delete updatedSelectedItems[categoryTitle];
      }
      return updatedSelectedItems;
    });
  };

  return (
    <div className="ml-3 my-5 flex justify-center gap-2 text-s">
      {Object.entries(selectedCheckBoxes).map(
        ([categoryTitle, selectedItem]) =>
          selectedItem && (
            <button
              onClick={() => handleCheckBoxClick(categoryTitle)}
              key={categoryTitle}
              className={`p-1 flex items-center border rounded shadow hover:scale-105 transform transition-all duration-300 ${
                selectedItem ? "border-red-500" : "border-neutral-300"
              }`}
            >
              <p className="mr-2">
                {
                  {
                    type: "Type",
                    consumableWidth: "Width",
                    consumableLength: "Length",
                    toolType: "Tool type",
                    headType: "Head type",
                    material: "Material",
                    tensileStrenght: "Tensile strenght",
                    vacuum: "Vacuum",
                  }[categoryTitle]
                }
                : {useCapitalizeFirstLetter(selectedItem)}
              </p>
              <p className="border border-red-500/50 px-1 rounded text-red-500">
                X
              </p>
            </button>
          )
      )}
    </div>
  );
};

export default HeaderCheckBoxes;
