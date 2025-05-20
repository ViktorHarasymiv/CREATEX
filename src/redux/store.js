import { configureStore } from "@reduxjs/toolkit";
import sliderReduser from "./sliderSlice";
import goodsReducer from "./goodsSlice";
import wishlistReducer from "./wishlistSlice";
import basketReducer from "./basketSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    slider: sliderReduser,
    goods: goodsReducer,
    wishlist: wishlistReducer,
    basket: basketReducer,
    order: orderReducer,
  },
});
