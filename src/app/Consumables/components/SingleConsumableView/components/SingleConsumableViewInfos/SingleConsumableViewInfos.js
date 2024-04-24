import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedSingleConsumableState } from "@/app/recoil/atoms/selectedSingleConsumableState";
import useCapitalizeFirstLetter from "@/app/useFunctions/useCapitalizeFirstLetter";
import typeArray from "@/app/arrays/typeArray";
import toolTypeArray from "@/app/arrays/toolTypeArray";
import tensileStrenghtArray from "@/app/arrays/tensileStrenghtArray";
import { isLoadingState } from "@/app/recoil/atoms/isLoadingState";
import Loader from "@/app/Loader/Loader";
import { isAdminState } from "@/app/recoil/atoms/isAdminState";
import vacuumArray from "@/app/arrays/vacuumArray";
import { activeComponentState } from "@/app/recoil/atoms/activeComponentState";
import materialArray from "@/app/arrays/materialArray";
import ChangeLog from "./components/ChangeLog/ChangeLog";
import PrimaryToast from "@/app/Toasts/PrimaryToast/PrimaryToast";
import SingleConsumableViewInfosSubmitButton from "./components/SingleConsumableViewInfosSubmitButton/SingleConsumableViewInfosSubmitButton";
import SingleConsumableViewInfosDeleteButton from "./components/SingleConsumableViewInfosDeleteButton/SingleConsumableViewInfosDeleteButton";

const SingleConsumableViewInfos = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [isAdmin] = useRecoilState(isAdminState);
  const [, setActiveComponent] = useRecoilState(activeComponentState);
  const selectedSingleConsumable = useRecoilValue(
    selectedSingleConsumableState
  );

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [minimumAmount, setMinimumAmount] = useState("");
  const [consumableWidth, setConsumableWidth] = useState("");
  const [consumableLength, setConsumableLength] = useState("");
  const [toolType, setToolType] = useState("");
  const [material, setMaterial] = useState("");
  const [tensileStrenght, setTensileStrenght] = useState("");
  const [vacuum, setVacuum] = useState("");
  const [supplier, setSupplier] = useState("");
  const [articelNumber, setArticelNumber] = useState("");

  useEffect(() => {
    setTitle(selectedSingleConsumable.title);
    setType(selectedSingleConsumable.type);
    setLocation(selectedSingleConsumable.location);
    setAmount(selectedSingleConsumable.amount);
    setMinimumAmount(selectedSingleConsumable.minimumAmount);
    setConsumableWidth(selectedSingleConsumable.consumableWidth);
    setConsumableLength(selectedSingleConsumable.consumableLength);
    setToolType(selectedSingleConsumable.toolType);
    setMaterial(selectedSingleConsumable.material);
    setTensileStrenght(selectedSingleConsumable.tensileStrenght);
    setVacuum(selectedSingleConsumable.vacuum);
    setSupplier(selectedSingleConsumable.supplier);
    setArticelNumber(selectedSingleConsumable.articelNumber);
  }, [selectedSingleConsumable]);

  const updateCategoryValue = async (category, newValue) => {
    const timestamp = new Date();
    setIsLoading(true);
    try {
      const changes = [
        selectedSingleConsumable[category] !== newValue
          ? {
              category,
              oldValue: selectedSingleConsumable[category],
              newValue,
              timestamp: timestamp.toISOString(),
            }
          : null,
      ].filter((change) => change !== null);
      const response = await fetch("/api/updateConsumable", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedSingleConsumable._id,
          category,
          value: newValue,
          changes,
        }),
      });
      if (response.ok) {
        setToastText("Consumable edited");
        setShowToast(true);
      } else {
        alert("Failed to update category value");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleUpdateSubmitClick = () => {
    updateCategoryValue("title", title?.toLowerCase());
    updateCategoryValue("type", type?.toLowerCase());
    updateCategoryValue("location", location?.toLowerCase());
    updateCategoryValue("amount", parseInt(amount));
    updateCategoryValue("minimumAmount", parseInt(minimumAmount));
    updateCategoryValue("consumableWidth", consumableWidth?.toLowerCase());
    updateCategoryValue("consumableLength", consumableLength?.toLowerCase());
    updateCategoryValue("toolType", toolType?.toLowerCase());
    updateCategoryValue("material", material?.toLowerCase());
    updateCategoryValue("tensileStrenght", tensileStrenght?.toLowerCase());
    updateCategoryValue("vacuum", vacuum?.toLowerCase());
    updateCategoryValue("supplier", supplier?.toLowerCase());
    updateCategoryValue("articelNumber", articelNumber?.toLowerCase());
  };

  const handleDeleteClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/deleteConsumable", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedSingleConsumable._id,
        }),
      });
      if (response.ok) {
        setToastText("Consumable deleted");
        setShowToast(true);
        setTimeout(() => {
          setActiveComponent("clickMenuResult");
        }, 2000);
      } else {
        alert("Failed to update category value");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setIsLoading(false);
  };

  const renderInput = (label, value, onChange, type = "text") => (
    <div className="flex justify-between text-appOrange">
      <label className="flex">{label}:</label>
      <input
        readOnly={!isAdmin}
        type={type}
        value={type === "text" ? useCapitalizeFirstLetter(value) : value}
        onChange={(event) => onChange(event.target.value)}
        className={`${
          isAdmin ? "border rounded" : ""
        } w-1/2 mb-1 text-black text-right dark:bg-[#1c1c1c] dark:text-neutral-300`}
      />
    </div>
  );

  const renderSelect = (label, value, onChange, options, prefix = "") => (
    <div className="w-full flex justify-between text-appOrange">
      <label className="flex">{label}:</label>
      <select
        disabled={!isAdmin}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${
          isAdmin ? "border rounded" : "appearance-none safari-fixes"
        } w-1/2 mb-1 text-black opacity-100 text-right dark:bg-[#1c1c1c] dark:text-neutral-300`}
      >
        <option value=""></option>
        {options.map((item, index) => (
          <option key={index} value={item.title}>
            {prefix + useCapitalizeFirstLetter(item.title)}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      <div className="flex mt-10 gap-2">
        {/* Left Panel */}
        <div className="w-1/3 flex flex-col p-2 border rounded shadow dark:border-neutral-300">
          {renderInput("Title", title, setTitle)}
          {renderSelect("Type", type, setType, typeArray)}
          {renderInput("Location", location, setLocation)}
          {renderInput("Amount", amount, setAmount, "number")}
          {renderInput("MinAmount", minimumAmount, setMinimumAmount, "number")}
        </div>
        {/* Middle Panel */}
        <div className="w-1/3 p-2 border rounded shadow dark:border-neutral-300">
          {renderInput("Width", consumableWidth, setConsumableWidth, "number")}
          {renderInput(
            "Length",
            consumableLength,
            setConsumableLength,
            "number"
          )}
          {renderSelect("ToolType", toolType, setToolType, toolTypeArray)}
        </div>
        {/* Right Panel */}
        <div className="w-1/3 p-2 border rounded shadow dark:border-neutral-300">
          {renderSelect("Material", material, setMaterial, materialArray)}
          {renderSelect(
            "TensStrenght",
            tensileStrenght,
            setTensileStrenght,
            tensileStrenghtArray
          )}
          {renderSelect("Vacuum", vacuum, setVacuum, vacuumArray, "DN")}
          {renderInput("Supplier", supplier, setSupplier)}
          {renderInput("ArtNr", articelNumber, setArticelNumber)}
        </div>
        {showToast && (
          <PrimaryToast
            toastText={toastText}
            setShowToast={setShowToast}
            css="primary-toast"
          />
        )}
      </div>

      {/*------------------------buttons--------------------------------------*/}
      <div className="relative w-full flex justify-center">
        {isAdmin ? (
          <SingleConsumableViewInfosDeleteButton
            handleDeleteClick={handleDeleteClick}
          />
        ) : null}
        {isAdmin && isLoading ? (
          <div className="-mt-12">
            <Loader />
          </div>
        ) : isAdmin ? (
          <SingleConsumableViewInfosSubmitButton
            handleUpdateSubmitClick={handleUpdateSubmitClick}
          />
        ) : null}
      </div>
      <ChangeLog />
    </>
  );
};

export default SingleConsumableViewInfos;
