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
    setAmoutAction: (state, action) => {
      return {
        ...state,
        basketArr: state.basketArr.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: action.payload.count }
            : item
        ),
      };
    },
  },
});

export const { getInBasket, deleteFromBasket, setAmoutAction } =
  basketSlice.actions;

export default basketSlice.reducer;
