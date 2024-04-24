"use client";
import React from "react";
import { useRecoilState } from "recoil";
import { activeComponentState } from "@/app/recoil/atoms/activeComponentState";
import SearchBarResult from "./components/SearchBarResult/SearchBarResult";
import SingleConsumableView from "./components/SingleConsumableView/SingleConsumableView";
import ClickMenuResult from "./components/ClickMenuResult/ClickMenuResult";
import AddNewItemView from "./components/AddNewConsumableView/AddNewConsumableView";

const Consumables = () => {
  const [activeComponent] = useRecoilState(activeComponentState);

  return (
    <div className="mt-40 mb-20 w-full flex justify-center">
      {activeComponent === "clickMenuResult" ? (
        <ClickMenuResult />
      ) : activeComponent === "searchBarResult" ? (
        <SearchBarResult />
      ) : activeComponent === "singleConsumableView" ? (
        <SingleConsumableView />
      ) : activeComponent === "addNewItemView" ? (
        <AddNewItemView />
      ) : null}
    </div>
  );
};

export default Consumables;
