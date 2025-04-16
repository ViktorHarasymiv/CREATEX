import { configureStore } from "@reduxjs/toolkit";
import sliderReduser from "./sliderSlice";
import goodsReducer from "./goodsSlice";

export const store = configureStore({
  reducer: {
    slider: sliderReduser,
    goods: goodsReducer,
  },
});
