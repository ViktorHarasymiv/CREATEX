import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    items: [
      {
        id: crypto.randomUUID(),
        name: "menwear",
        url: "men",
        image: "../images/slider/men.avif",
        relations: "New autumn collection",
        title: "Men collection",
        data: "2025",
        motivation: "Style with strength. Step into autumn like you mean it",
      },
      {
        id: crypto.randomUUID(),
        name: "womenwear",
        url: "women",
        image: "../images/slider/women.jpg",
        relations: "New collection",
        title: "Womenswear",
        data: "2025",
        motivation:
          "Dress with purpose. Wear with confidence. Shine wherever you go",
      },
      {
        id: crypto.randomUUID(),
        name: "kidwear",
        url: "kids",
        image: "../images/slider/kids.jpg",
        relations: "New collection",
        title: "Kidswear",
        data: "2025",
        motivation:
          "Your perfect look awaits—let`s make every day a stylish adventure!",
      },
    ],
  },
  reducers: {
    setNewSlider: (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    deleteSlider: (state, action) => {
      return {
        ...state,
        items: state.items.filter((user) => user.title !== action.payload),
      };
    },
  },
});

export const { setNewSlider, deleteSlider } = sliderSlice.actions;

export default sliderSlice.reducer;
