import React from "react";

const ButtonPrimary = ({ buttonText, secondaryButtonText, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative w-28 h-10 flex items-center justify-center m-3 border border-appOrange rounded-sm cursor-pointer shadow-md hover:text-appOrange active:scale-95 transition-all"
    >
      <span>{buttonText}</span>
      <span className="absolute bottom-0 right-1 text-s text-appOrange">
        {secondaryButtonText}
      </span>
    </div>
  );
};

export default ButtonPrimary;
