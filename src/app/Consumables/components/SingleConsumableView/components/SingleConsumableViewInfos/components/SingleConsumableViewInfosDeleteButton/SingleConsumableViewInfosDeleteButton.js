import React from "react";

const SingleConsumableViewInfosDeleteButton = ({ handleDeleteClick }) => {
  return (
    <button
      className="absolute top-0 left-0 m-10 bg-red-500 text-white border border-black rounded px-4 py-1 hover:scale-105"
      onClick={() => handleDeleteClick()}
    >
      Delete
    </button>
  );
};

export default SingleConsumableViewInfosDeleteButton;
