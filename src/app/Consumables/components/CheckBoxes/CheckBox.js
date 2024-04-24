import React from "react";
import { useRecoilState } from "recoil";
import { selectedCheckBoxesState } from "@/app/recoil/atoms/selectedCheckBoxesState";
import useCapitalizeFirstLetter from "@/app/useFunctions/useCapitalizeFirstLetter";
import useToggleItems from "./useFunctions/useToggleItems";
import { fetchedConsumablesState } from "@/app/recoil/atoms/fetchedConsumablesState";
import { useTheme } from "next-themes";

const CheckBox = ({ categoryTitle, items }) => {
  const { theme, setTheme } = useTheme();
  const [fetchedConsumables, setFetchedConsumables] = useRecoilState(
    fetchedConsumablesState
  );
  const { showAllItems, contentRef, contentHeight, handleToggleItemsClick } =
    useToggleItems();
  const [selectedCheckBoxes, setSelectedCheckBoxes] = useRecoilState(
    selectedCheckBoxesState
  );
  const isSelected = selectedCheckBoxes.hasOwnProperty(categoryTitle);

  const handleCheckBoxClick = (categoryTitle, item) => {
    setSelectedCheckBoxes((prevSelectedItems) => {
      const updatedSelectedItems = { ...prevSelectedItems };
      if (updatedSelectedItems.hasOwnProperty(categoryTitle)) {
        delete updatedSelectedItems[categoryTitle];
      } else {
        updatedSelectedItems[categoryTitle] = item.title;
      }
      const filteredSelectedItems = Object.fromEntries(
        Object.entries(updatedSelectedItems).filter(
          ([_, value]) => value !== undefined
        )
      );
      return filteredSelectedItems;
    });
  };

  const countAvailableTypes = (title) => {
    return fetchedConsumables.reduce((count, consumable) => {
      let isSelected = true;
      Object.keys(selectedCheckBoxes).forEach((key) => {
        if (key !== categoryTitle && selectedCheckBoxes[key]) {
          if (consumable[key] !== selectedCheckBoxes[key]) {
            isSelected = false;
          }
        }
      });

      if (
        isSelected &&
        consumable[categoryTitle] === title &&
        (!selectedCheckBoxes[categoryTitle] ||
          consumable[categoryTitle] === selectedCheckBoxes[categoryTitle])
      ) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  return (
    <div
      className={`mb-1 p-3 border rounded shadow ${
        isSelected ? "border-red-500" : "border-neutral-500"
      }`}
    >
      <h3 className="-ml-2 text-s text-appOrange">
        {
          {
            type: "Type",
            title: "Title",
            type: "Type",
            location: "Location",
            amount: "Amount",
            minimumAmount: "MinAmount",
            supplier: "Supplier",
            articelNumber: "ArtNr",
            consumableWidth: "Width",
            consumableLength: "Length",
            toolType: "Tool type",
            material: "Material",
            tensileStrenght: "Tensile strenght",
            vacuum: "Vacuum",
          }[categoryTitle]
        }
      </h3>
      <div
        ref={contentRef}
        className={`relative flex flex-col text-sm dark:text-neutral-200 ${
          showAllItems ? "max-h-none" : "max-h-180"
        } overflow-hidden`}
        style={{ height: contentHeight, transition: "all 750ms" }}
      >
        {items.map((item, index) => (
          <div className="flex items-center justify-between" key={index}>
            <p>
              {categoryTitle === "consumableLength" ||
              categoryTitle === "consumableWidth"
                ? `${item.title}mm (${countAvailableTypes(item.title)})`
                : categoryTitle === "vacuum"
                ? `DN${item.title}(${countAvailableTypes(item.title)})`
                : `${useCapitalizeFirstLetter(
                    item.title
                  )} (${countAvailableTypes(item.title)})`}
            </p>
            <input
              type="checkbox"
              value={item.title}
              checked={selectedCheckBoxes[categoryTitle] === item.title}
              onChange={() => handleCheckBoxClick(categoryTitle, item)}
              className="cursor-pointer"
            />
          </div>
        ))}
        <div
          className={`dark:shadow-[inset_0_-20px_15px_-10px_rgba(28,28,28,1)] shadow-[inset_0_-20px_15px_-10px_#fff] ${
            showAllItems ? "" : "absolute bottom-0 left-0 w-full h-5"
          } `}
        ></div>
      </div>

      {items.length >= 4 && (
        <button
          className="text-s text-appBlue dark:text-appOrange/70 mt-2 underline"
          onClick={handleToggleItemsClick}
        >
          {showAllItems ? "Close" : "Show all"}
        </button>
      )}
    </div>
  );
};

export default CheckBox;
