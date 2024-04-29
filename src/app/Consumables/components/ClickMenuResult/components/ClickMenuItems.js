import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { activeComponentState } from "@/app/recoil/atoms/activeComponentState";
import { selectedSingleConsumableState } from "@/app/recoil/atoms/selectedSingleConsumableState";
import { singleConsumableViewModeState } from "@/app/recoil/atoms/singleConsumableViewModeState";
import { isLoadingState } from "@/app/recoil/atoms/isLoadingState";
import { selectedCheckBoxesState } from "@/app/recoil/atoms/selectedCheckBoxesState";
import capitalizeFirstLetter from "@/app/useFunctions/capitalizeFirstLetter";
import Loader from "@/app/Loader/Loader";
import { fetchedConsumablesState } from "@/app/recoil/atoms/fetchedConsumablesState";
import logo from "../../../../../../public/logo.jpg";

const ClickMenuItems = () => {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [filteredItems, setFilteredItems] = useState([]);
  const [hoveredConsumableId, setHoveredConsumableId] = useState(null);
  const [, setActiveComponent] = useRecoilState(activeComponentState);
  const [selectedCheckBoxes] = useRecoilState(selectedCheckBoxesState);
  const [, setSingleConsumableViewMode] = useRecoilState(
    singleConsumableViewModeState
  );
  const [fetchedConsumables, setFetchedConsumables] = useRecoilState(
    fetchedConsumablesState
  );
  const [, setSelectedSingleConsumable] = useRecoilState(
    selectedSingleConsumableState
  );

  const handleSingleConsumableClick = (singleConsumable) => (event) => {
    event.stopPropagation();
    setSelectedSingleConsumable(singleConsumable);
    setSingleConsumableViewMode("clickMenu");
    setActiveComponent("singleConsumableView");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/fetchConsumables", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFetchedConsumables(data.consumables);
        } else {
          console.error("Failed to fetch consumables");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = fetchedConsumables.filter((item) => {
      for (const categoryTitle in selectedCheckBoxes) {
        if (selectedCheckBoxes.hasOwnProperty(categoryTitle)) {
          if (
            selectedCheckBoxes[categoryTitle] &&
            item[categoryTitle] !== selectedCheckBoxes[categoryTitle]
          ) {
            return false;
          }
        }
      }
      return true;
    });
    setFilteredItems(filtered);
  }, [selectedCheckBoxes, fetchedConsumables]);

  const hoveredItem = () => {
    setFilteredItemIsHovered(true);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-1">
        <div className="w-full h-14 mb-5 flex items-center justify-between overflow-hidden rounded shadow border border-appOrange dark:text-neutral-200">
          <div className="w-1/5">
            <Image
              width={640}
              height={360}
              alt=""
              src={logo}
              className="h-14 w-14 rounded p-0.5"
            />
          </div>{" "}
          <p className="w-1/5 text-center">Title</p>
          <p className="w-1/5 text-center">Type</p>
          <p className="w-1/5 text-center">Location</p>
          <p className="w-1/5 text-center">Amount</p>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {filteredItems.map((singleConsumable) => (
              <div
                onMouseEnter={() =>
                  setHoveredConsumableId(singleConsumable._id)
                }
                onMouseLeave={() => setHoveredConsumableId(null)}
                key={singleConsumable._id}
                onClick={(event) =>
                  handleSingleConsumableClick(singleConsumable)(event)
                }
                className="flex items-center justify-between last:mb-20 border rounded shadow cursor-pointer hover:text-appOrange hover:border hover:border-appOrange transform transition-all duration-300"
              >
                <div className="w-1/5 flex items-center overflow-hidden">
                  <Image
                    width={640}
                    height={360}
                    alt=""
                    src={singleConsumable.image}
                    className={`h-10 w-14 rounded-sm-l shadow transform transition-transform duration-300 ${
                      hoveredConsumableId === singleConsumable._id
                        ? "scale-150"
                        : ""
                    }`}
                  />
                </div>
                <span className="w-1/5 text-center">
                  {capitalizeFirstLetter(singleConsumable.title)}
                </span>
                <span className="w-1/5 text-center">
                  {capitalizeFirstLetter(singleConsumable.type)}
                </span>
                <span className="w-1/5 text-center">
                  {singleConsumable.location.slice(0, 1) +
                    singleConsumable.location.charAt(1).toUpperCase() +
                    singleConsumable.location.slice(2)}
                </span>
                <span className="w-1/5 text-center">
                  {singleConsumable.amount}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default ClickMenuItems;
