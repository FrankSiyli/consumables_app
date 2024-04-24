import Loader from "@/app/Loader/Loader";
import PrimaryToast from "@/app/Toasts/PrimaryToast/PrimaryToast";
import { isAdminState } from "@/app/recoil/atoms/isAdminState";
import { isLoadingState } from "@/app/recoil/atoms/isLoadingState";
import { selectedSingleConsumableState } from "@/app/recoil/atoms/selectedSingleConsumableState";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const RemoveItems = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [showLowAmountToast, setShowLowAmountToast] = useState(false);
  const [lowAmountToastText, setLowAmountToastText] = useState("");
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [isAdmin] = useRecoilState(isAdminState);
  const [amount, setAmount] = useState("");
  const [removeAmount, setRemoveAmount] = useState("");
  const [selectedSingleConsumable, setSelectedSingleConsumable] =
    useRecoilState(selectedSingleConsumableState);

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
        setSelectedSingleConsumable((prevState) => ({
          ...prevState,
          [category]: newValue,
        }));
        setToastText("Amount adjusted");
        setShowToast(true);
      } else {
        alert("Failed to update category value");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setRemoveAmount("");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setAmount(selectedSingleConsumable.amount);
  }, [selectedSingleConsumable]);

  const handleAmountChange = (event) => {
    const input = event.target.value;
    if (/^\d*$/.test(input)) {
      setRemoveAmount(input);
    }
  };

  const handleRemoveAmountKeyDown = (event) => {
    if (event.key === "Enter") {
      handleUpdateSubmitClick();
    }
  };

  const handleUpdateSubmitClick = () => {
    if (removeAmount === "" || isNaN(parseFloat(removeAmount))) {
      alert("Please enter a valid number.");
      return;
    }
    const newAmount = amount - removeAmount;
    if (newAmount < 0) {
      alert("Resulting amount cannot be negative.");
      setRemoveAmount("");
      return;
    }
    setSelectedSingleConsumable((prev) => ({
      ...prev,
      amount: newAmount,
    }));
    updateCategoryValue("amount", newAmount);
    sendMailWhenLowAmount();
  };

  const sendMailWhenLowAmount = async () => {
    const newAmount = amount - removeAmount;

    if (newAmount <= selectedSingleConsumable.minimumAmount) {
      try {
        const response = await fetch("/api/sendMailWhenLowAmount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ consumable: selectedSingleConsumable }),
        });
        if (response.ok) {
          setLowAmountToastText(
            "Low amount reached, mail was sent to warehouse"
          );
          setShowLowAmountToast(true);
        } else {
          alert("Failed to send mail to warehouse");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <div className="w-2/4 min-h-64 ml-5 border border-appOrange rounded shadow dark:border-appOrange/70">
      {!isAdmin && isLoading ? (
        <div className="-mt-12">
          <Loader />
        </div>
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-around">
          <input
            type="number"
            value={removeAmount}
            onChange={handleAmountChange}
            onKeyDown={handleRemoveAmountKeyDown}
            placeholder="e.g. 5"
            className="w-5/6 h-12 border border-black text-center rounded enabled:outline-appOrange dark:bg-neutral-200 dark:text-black"
          />
          <label
            alt="items removed"
            className="absolute -top-3 left-9 px-1 bg-white dark:bg-[#1c1c1c] dark:text-neutral-300"
          >
            Items removed:
          </label>
          <button
            className="mx-auto border border-appOrange rounded px-4 py-1 hover:scale-105 dark:text-neutral-300"
            onClick={handleUpdateSubmitClick}
          >
            Submit
          </button>
        </div>
      )}
      {showToast && (
        <PrimaryToast
          toastText={toastText}
          setShowToast={setShowToast}
          css="primary-toast"
        />
      )}
      {showLowAmountToast && (
        <PrimaryToast
          toastText={lowAmountToastText}
          setShowToast={setShowToast}
          css="secondary-toast"
        />
      )}
    </div>
  );
};

export default RemoveItems;
