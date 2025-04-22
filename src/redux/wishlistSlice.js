import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    },
    deleteProduct: (state, action) => {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    },
  },
});

export const { addProduct, deleteProduct } = wishlistSlice.actions;

export default wishlistSlice.reducer;
