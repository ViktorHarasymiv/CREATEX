import { configureStore } from "@reduxjs/toolkit";
import sliderReduser from "./sliderSlice";
import goodsReducer from "./goodsSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    slider: sliderReduser,
    goods: goodsReducer,
    wishlist: wishlistReducer,
  },
});
