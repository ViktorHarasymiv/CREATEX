import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    items: [
      {
        id: crypto.randomUUID(),
        name: "menswear",
        image: "men.jpg",
        video:
          "https://image.hm.com/content/dam/global_campaigns/season_01/men/start-page-assets/w15/video/MS21E4-15A-CLEAN-16x9.mp4",
        videoMobile:
          "https://image.hm.com/content/dam/global_campaigns/season_01/men/start-page-assets/w15/video/MS21E4-15A-CLEAN-9x16.mp4",
        PR: "New collection",
        title: "Menswear 2025",
        motivational: "Step into Confidence, Style, and Endless Possibilities",
      },
      {
        id: crypto.randomUUID(),
        name: "womenswear",
        image: "women.jpg",
        // video:
        //   "https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk15/1011B-startpage-women-wk15-16x9.mp4",
        // videoMobile:
        //   "https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk15/1011B-startpage-women-wk15-9x16.mp4",
        PR: "New collection",
        title: "Womenswear 2025",
        motivational:
          "Dress with purpose. Wear with confidence. Shine wherever you go",
      },
      {
        id: crypto.randomUUID(),
        name: "kidswear",
        image: "kids.jpg",
        PR: "New collection",
        title: "Kidswear 2025",
        motivational:
          "Your perfect look awaits—let’s make every day a stylish adventure!",
      },
    ],
  },
  reducers: {},
});

export default sliderSlice.reducer;
