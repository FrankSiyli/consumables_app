import React from "react";

function PrimaryToast({ toastText, setShowToast, css }) {
  setTimeout(() => {
    setShowToast(false);
  }, 7000);
  return (
    <>
      <div className={`${css} relative`}>
        <span>{toastText}</span>
      </div>
    </>
  );
}

export default PrimaryToast;
