import { createSlice } from "@reduxjs/toolkit";

// BASKET STORAGE

// const loadFromLocalStorage = () => {
//   const savedData = localStorage.getItem("reduxArray");
//   return savedData ? JSON.parse(savedData) : []; // Десеріалізація JSON у масив
// };

const accountSlice = createSlice({
  name: "account",
  initialState: {
    profile: [],
  },
  reducers: {
    getProfile: (state, action) => {
      return {
        ...state,
        profile: [...state.profile, action.payload],
      };
    },
    // deleteFromBasket: (state, action) => {
    //   return {
    //     ...state,
    //     basketArr: state.basketArr.filter(
    //       (product) => product.id !== action.payload
    //     ),
    //   };
    // },
    // setAmoutAction: (state, action) => {
    //   return {
    //     ...state,
    //     basketArr: state.basketArr.map((item) =>
    //       item.id === action.payload.id
    //         ? { ...item, count: action.payload.count }
    //         : item
    //     ),
    //   };
    // },
  },
});

export const { getProfile } = accountSlice.actions;

export default accountSlice.reducer;
