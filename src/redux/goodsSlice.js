import { createSlice } from "@reduxjs/toolkit";

const goodsSlice = createSlice({
  name: "goods",
  initialState: {
    items: [
      {
        id: crypto.randomUUID(),
      },
      {
        id: crypto.randomUUID(),
      },
      {
        id: crypto.randomUUID(),
      },
    ],
  },
  reducers: {},
});

export default goodsSlice.reducer;
