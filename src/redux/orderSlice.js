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
        costs: 0,
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
    paymantMethod: [
      {
        title: "Credit card",
        icon: {
          master: "/master-card.png",
          visa: "/visa.png",
        },
      },
      {
        title: "PayPal",
        icon: { payPal: "/pay-pal.png" },
      },
      {
        title: "Cash on delivery",
        icon: {},
      },
    ],
  },
  reducers: {
    updateOrder: (state, action) => {
      const index = state.fakture.findIndex((item) => item.items);

      if (index !== -1) {
        state.fakture[index].items = action.payload;
      } else {
        state.fakture.push({ items: action.payload });
      }
    },

    updateShipping: (state, action) => {
      state.fakture.push({ shippingInfo: [action.payload] });
    },

    deleteShipping: (state, action) => {
      state.fakture = state.fakture.filter(
        (item) => item.shippingInfo == action.payload
      );
    },

    updatePromo: (state, action) => {
      state.fakture = [...state.fakture, { promo: [action.payload] }];
    },

    updateDelivery: (state, action) => {
      const index = state.fakture.findIndex((item) => item.delivery);

      if (index !== -1) {
        state.fakture[index].delivery = [action.payload];
      } else {
        state.fakture.push({ delivery: [action.payload] });
      }
    },

    updatePayMehod: (state, action) => {
      const index = state.fakture.findIndex((item) => item.payMethod);

      if (index !== -1) {
        state.fakture[index].payMethod = [action.payload];
      } else {
        state.fakture.push({ payMethod: [action.payload] });
      }
    },

    updateOtherValues: (state, action) => {
      state.fakture = [...state.fakture, { values: action.payload }];
    },
  },
});

export const {
  updateOrder,
  updateShipping,
  deleteShipping,
  updatePromo,
  updateDelivery,
  updatePayMehod,
  updateOtherValues,
} = orderSlice.actions;

export default orderSlice.reducer;
