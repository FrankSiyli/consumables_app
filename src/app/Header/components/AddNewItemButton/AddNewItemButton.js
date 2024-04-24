import { activeComponentState } from "@/app/recoil/atoms/activeComponentState";
import React from "react";
import { useRecoilState } from "recoil";

const AddNewItemButton = () => {
  const [activeComponent, setActiveComponent] =
    useRecoilState(activeComponentState);

  const handleAddNewItemClick = () => {
    setActiveComponent("addNewItemView");
  };

  return (
    <>
      <button
        onClick={handleAddNewItemClick}
        className="border border-appOrange p-1 shadow rounded hover:scale-105"
      >
        + new item
      </button>
    </>
  );
};

export default AddNewItemButton;
