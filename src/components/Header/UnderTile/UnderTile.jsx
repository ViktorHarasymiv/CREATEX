import React from "react";

import { Link } from "react-router-dom";

import css from "./UnderTile.module.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

function UnderTile() {
  const PROM = [
    {
      id: 0,
      text: "Up to 70% Off. ",
      path: "Shop our latest sale styles",
    },
    {
      id: 1,
      text: "-20% | Online offer for Club Members",
      path: "Subscribe",
    },
    {
      id: 2,
      text: "Up to 70% Off. ",
      path: "Shop our latest sale styles",
    },
  ];
  return (
    <div className={css.under_tile}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Navigation]}
        className={css.prom_slider}
      >
        {PROM.map(({ text, path }, index) => {
          return (
            <SwiperSlide key={index}>
              <b>{text}</b>
              <Link className={css.prom_link} to="/hot_sale">
                {path}
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default UnderTile;
