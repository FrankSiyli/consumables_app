import React from "react";
import { useRecoilState } from "recoil";
import ArrowLeftSvg from "@/app/svgCollection/ArrowLeftSvg";
import { selectedSingleConsumableState } from "@/app/recoil/atoms/selectedSingleConsumableState";
import { singleConsumableViewModeState } from "@/app/recoil/atoms/singleConsumableViewModeState";
import Image from "next/image";
import SingleConsumableViewInfos from "./components/SingleConsumableViewInfos/SingleConsumableViewInfos";
import RemoveItems from "./components/RemoveItems/RemoveItems";
import { isAdminState } from "@/app/recoil/atoms/isAdminState";

const SingleConsumableView = () => {
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminState);

  const [selectedSingleConsumable] = useRecoilState(
    selectedSingleConsumableState
  );
  const imageUrl = selectedSingleConsumable.image;

  const [singleConsumableViewMode] = useRecoilState(
    singleConsumableViewModeState
  );

  return (
    <>
      <ArrowLeftSvg
        setActiveComponentByArrow={
          singleConsumableViewMode === "clickMenu"
            ? "clickMenuResult"
            : "searchBarResult"
        }
      />
      <div className="mb-20 flex flex-col p-3 w-full max-w-3xl border rounded shadow-xl dark:border-neutral-300">
        <div className="flex">
          <Image
            width={300}
            height={300}
            alt=""
            src={imageUrl}
            className="w-2/4 min-h-64 rounded shadow"
          />
          {!isAdmin && <RemoveItems />}
        </div>
        <SingleConsumableViewInfos />
      </div>
    </>
  );
};

export default SingleConsumableView;
