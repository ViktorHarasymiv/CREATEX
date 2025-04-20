import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import css from "./Hero.module.css";

import "./Setup.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Slider from "./Slider";

function Hero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [mobileMenu, setMobileMenu] = useState(false);

  const slider = useSelector((state) => state.slider.items);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + "0" + (index + 1) + "</span>";
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 1024.98) {
      setMobileMenu(true);
    } else {
      setMobileMenu(false);
    }
  }, [windowWidth]);

  return (
    <Swiper
      pagination={pagination}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="hero_swiper"
      style={{ maxHeight: "100%" }}
    >
      {slider.map(
        ({ id, name, image, video, videoMobile, PR, title, motivational }) => {
          return (
            <SwiperSlide>
              <Slider
                id={id}
                name={name}
                image={image}
                video={video}
                videoMobile={videoMobile}
                PR={PR}
                title={title}
                motivational={motivational}
                windowWidth={windowWidth}
              />
            </SwiperSlide>
          );
        }
      )}
    </Swiper>
  );
}

export default Hero;
