import React, { useState } from "react";
import { searchBarFilteredConsumablesState } from "@/app/recoil/atoms/searchBarFilteredConsumablesState";
import { useRecoilState } from "recoil";
import { activeComponentState } from "@/app/recoil/atoms/activeComponentState";
import { selectedSingleConsumableState } from "@/app/recoil/atoms/selectedSingleConsumableState";
import { singleConsumableViewModeState } from "@/app/recoil/atoms/singleConsumableViewModeState";
import Image from "next/image";
import Loader from "@/app/Loader/Loader";
import { isLoadingState } from "@/app/recoil/atoms/isLoadingState";
import capitalizeFirstLetter from "@/app/useFunctions/capitalizeFirstLetter";
import logo from "../../../../../../public/logo.jpg";

const SearchBarItems = () => {
  const [isLoading] = useRecoilState(isLoadingState);
  const [, setActiveComponent] = useRecoilState(activeComponentState);
  const [hoveredConsumableId, setHoveredConsumableId] = useState(null);
  const [, setSingleConsumableViewMode] = useRecoilState(
    singleConsumableViewModeState
  );
  const [searchBarFilteredConsumables] = useRecoilState(
    searchBarFilteredConsumablesState
  );
  const [, setSelectedSingleConsumable] = useRecoilState(
    selectedSingleConsumableState
  );

  const handleSingleConsumableClick = (singleConsumable) => (event) => {
    event.stopPropagation();
    setSelectedSingleConsumable(singleConsumable);
    setSingleConsumableViewMode("searchBar");
    setActiveComponent("singleConsumableView");
  };

  return (
    <div className="w-2/4 flex flex-col gap-1">
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
          {searchBarFilteredConsumables.length !== 0 ? (
            searchBarFilteredConsumables.map((singleConsumable) => (
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
            ))
          ) : (
            <div className="mt-10 text-center">Sorry, nothing in stock</div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBarItems;
