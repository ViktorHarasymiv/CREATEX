import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basketArr: [],
  },
  reducers: {
    getInBasket: (state, action) => {
      return {
        ...state,
        basketArr: [...state.basketArr, action.payload],
      };
    },
    deleteFromBasket: (state, action) => {
      return {
        ...state,
        basketArr: state.basketArr.filter(
          (product) => product.id !== action.payload
        ),
      };
    },
  },
});

export const { getInBasket, deleteFromBasket } = basketSlice.actions;

export default basketSlice.reducer;
