import React from "react";

const SingleConsumableViewInfosSubmitButton = ({handleUpdateSubmitClick}) => {
  return (
    <button
      className="m-10 border border-xfelOrange rounded px-4 py-1 hover:scale-105"
      onClick={() => handleUpdateSubmitClick()}
    >
      Submit
    </button>
  );
};

export default SingleConsumableViewInfosSubmitButton;
