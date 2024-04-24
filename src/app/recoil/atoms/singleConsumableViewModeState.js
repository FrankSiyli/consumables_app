import { atom } from "recoil";

export const singleConsumableViewModeState = atom({
  key: "singleConsumableViewModeState",
  default: "",
});

// toggles the props from search bar and clicked menu so that one component can handle both results
