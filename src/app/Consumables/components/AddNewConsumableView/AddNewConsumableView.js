import React, { useState } from "react";
import { useRecoilState } from "recoil";
import typeArray from "@/app/arrays/typeArray";
import toolTypeArray from "@/app/arrays/toolTypeArray";
import { isLoadingState } from "@/app/recoil/atoms/isLoadingState";
import Loader from "@/app/Loader/Loader";
import { isAdminState } from "@/app/recoil/atoms/isAdminState";
import ArrowLeftSvg from "@/app/svgCollection/ArrowLeftSvg";
import logo from "../../../../../public/logo.jpg";
import Image from "next/image";
import vacuumArray from "@/app/arrays/vacuumArray";
import { activeComponentState } from "@/app/recoil/atoms/activeComponentState";
import tensileStrenghtArray from "@/app/arrays/tensileStrenghtArray";
import materialArray from "@/app/arrays/materialArray";
import PrimaryToast from "@/app/Toasts/PrimaryToast/PrimaryToast";

const AddNewConsumableView = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [, setActiveComponent] = useRecoilState(activeComponentState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [isAdmin] = useRecoilState(isAdminState);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState(0);
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [consumableWidth, setConsumableWidth] = useState("");
  const [consumableLength, setConsumableLength] = useState("");
  const [toolType, setToolType] = useState("");
  const [material, setMaterial] = useState("");
  const [tensileStrenght, setTensileStrenght] = useState("");
  const [vacuum, setVacuum] = useState("");
  const [supplier, setSupplier] = useState("");
  const [articelNumber, setArticelNumber] = useState("");
  const [imageUrl, setImageUrl] = useState(logo.src);

  const addNewConsumable = async (event) => {
    const expiryTimestamp = new Date(Date.now() + 60 * 1000 * 2); // expiryTimestamp only needed as long as using image blobs
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/addNewConsumable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.toLowerCase(),
          type: type.toLowerCase(),
          location: location.toLowerCase(),
          amount: amount,
          minimumAmount: minimumAmount,
          consumableWidth: consumableWidth.toLowerCase(),
          consumableLength: consumableLength.toLowerCase(),
          toolType: toolType.toLowerCase(),
          material: material.toLowerCase(),
          tensileStrenght: tensileStrenght.toLowerCase(),
          vacuum: vacuum.toLowerCase(),
          supplier: supplier.toLowerCase(),
          articelNumber: articelNumber.toLowerCase(),
          image: imageUrl,
          expiryTimestamp: expiryTimestamp, // expiryTimestamp only needed as long as using image blobs
        }),
      });
      if (response.ok) {
        setToastText("Consumable added");
        setShowToast(true);
        setTimeout(() => {
          setActiveComponent("clickMenuResult");
        }, 2000);
      } else {
        console.error("Failed to add new consumable");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
    }
  };

  const renderField = (label, value, setValue, type = "text") => (
    <div className="flex justify-between text-appOrange">
      <label className="flex">{label}:</label>
      <input
        readOnly={!isAdmin}
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className={`${
          isAdmin ? "border rounded" : ""
        } w-1/2 mb-1 text-black text-right dark:bg-neutral-200 dark:text-black`}
      />
    </div>
  );

  const renderSelect = (label, value, setValue, options, prefix = "") => (
    <div className="w-full flex justify-between text-appOrange">
      <label className="flex">{label}:</label>
      <select
        disabled={!isAdmin}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className={`${
          isAdmin ? "border rounded" : ""
        } w-1/2 mb-1 text-black opacity-100 text-right dark:bg-neutral-200 dark:text-black`}
      >
        <option value=""></option>
        {options.map((item, index) => (
          <option key={index} value={item.title}>
            {prefix + item.title}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      <ArrowLeftSvg setActiveComponentByArrow={"clickMenuResult"} />

      <div className="mb-20 flex flex-col p-3 w-full max-w-3xl border rounded shadow-xl">
        <div className="flex items-center">
          <Image
            width={200}
            height={200}
            alt="add image"
            src={imageUrl}
            className="w-2/4 min-h-64 rounded shadow"
          />
          <div className="flex flex-col items-center gap-5">
            <span className="text-red-500 mx-10 text-center">
              Testmode: new database entries are automatically deleted after 2
              minutes
            </span>
            <label className="mx-auto text-center border border-appOrange cursor-pointer hover:scale-105 py-2 px-4 rounded shadow">
              <span>Choose image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="flex mt-10 gap-2">
          {/* Left Panel */}
          <div className="w-1/3 flex flex-col p-2 border rounded shadow">
            {renderField("Title", title, setTitle)}
            {renderSelect("Type", type, setType, typeArray)}
            {renderField("Location", location, setLocation)}
            {renderField("Amount", amount, setAmount, "number")}
            {renderField(
              "MinAmount",
              minimumAmount,
              setMinimumAmount,
              "number"
            )}
          </div>
          {/* Middle Panel */}
          <div className="w-1/3 p-2 border rounded shadow">
            {renderField(
              "Width",
              consumableWidth,
              setConsumableWidth,
              "number"
            )}
            {renderField(
              "Length",
              consumableLength,
              setConsumableLength,
              "number"
            )}
            {renderSelect("ToolType", toolType, setToolType, toolTypeArray)}
          </div>
          {/* Right Panel */}
          <div className="w-1/3 p-2 border rounded shadow">
            {renderSelect("Material", material, setMaterial, materialArray)}
            {renderSelect(
              "TensStrenght",
              tensileStrenght,
              setTensileStrenght,
              tensileStrenghtArray
            )}
            {renderSelect("Vacuum", vacuum, setVacuum, vacuumArray, "DN")}
            {renderField("Supplier", supplier, setSupplier)}
            {renderField("ArtNr", articelNumber, setArticelNumber)}
          </div>
          {showToast && (
            <PrimaryToast
              toastText={toastText}
              setShowToast={setShowToast}
              css="primary-toast"
            />
          )}
        </div>

        {isLoading ? (
          <div className="-mt-12">
            <Loader />
          </div>
        ) : (
          <button
            className="m-10 mx-auto border border-appOrange rounded px-4 py-1 hover:scale-105"
            onClick={addNewConsumable}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default AddNewConsumableView;
