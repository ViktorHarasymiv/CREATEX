import { createSlice } from "@reduxjs/toolkit";

// DATA

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const data = new Date();

// SLICE

const orderSlice = createSlice({
  name: "order",
  initialState: {
    fakture: [],
    promo: [
      { name: "HOT", value: 20 },
      { name: "SUMMER", value: 15 },
    ],
    shippingMethod: [
      {
        title: "Courier to your address",
        data: `Estimated date: ${addDays(data, 3).toLocaleDateString()}`,
        costs: 25.0,
      },
      {
        title: "Pick up from store",
        data: `Pick up on${addDays(data, 1).toLocaleDateString()} from 12:00`,
        costs: "Free",
      },
      {
        title: "UPS Ground Shipping",
        data: "Up to one week",
        costs: 10.0,
      },
      {
        title: "Pick up at Createx Locker",
        data: `Pick up on${addDays(data, 1).toLocaleDateString()} from 12:00`,
        costs: 8.5,
      },
      {
        title: "Createx Global Export",
        data: "3-4 days",
        costs: 15.0,
      },
    ],
  },
  reducers: {
    updateOrder: (state, action) => {
      state.fakture = state.fakture.filter(
        (fakture) =>
          Array.isArray(fakture.items) &&
          !fakture.items.some((item) => item.id === action.payload.id)
      );

      state.fakture = [...state.fakture, { items: [action.payload] }];
    },

    updateShipping: (state, action) => {
      state.fakture.push({ shippingInfo: action.payload });
    },
    updatePromo: (state, action) => {
      state.fakture = [...state.fakture, { promo: [action.payload] }];
    },
  },
});

export const { updateOrder, updateShipping, updatePromo } = orderSlice.actions;

export default orderSlice.reducer;
