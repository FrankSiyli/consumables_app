import { isAdminState } from "@/app/recoil/atoms/isAdminState";
import { selectedSingleConsumableState } from "@/app/recoil/atoms/selectedSingleConsumableState";
import capitalizeFirstLetter from "@/app/useFunctions/capitalizeFirstLetter";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const ChangeLog = () => {
  const [isAdmin] = useRecoilState(isAdminState);

  const selectedSingleConsumable = useRecoilValue(
    selectedSingleConsumableState
  );

  console.log("selectedSingleConsumable", selectedSingleConsumable);

  return (
    <>
      {isAdmin ? (
        <div className="mt-20">
          <h3 className="mb-3">Change log</h3>
          {selectedSingleConsumable.changes.map((change, index) => (
            <div key={index} className="w-full text-s flex justify-between">
              <div className="w-1/4 flex justify-between">
                <span>{capitalizeFirstLetter(change.category)} </span>
              </div>
              <div className="w-1/4">
                <span>old value: </span>
                <span className="text-xfelOrange">{change.oldValue} </span>
              </div>
              <div className="w-1/4">
                <span>new value: </span>
                <span className="text-xfelOrange">{change.newValue}</span>
              </div>
              <span className="w-1/4 text-right">
                {new Date(change.timestamp).toLocaleString(undefined, {
                  timeZone: "Europe/Berlin",
                  hour12: false,
                })}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default ChangeLog;
