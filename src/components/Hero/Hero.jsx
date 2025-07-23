import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "./Setup.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Slider from "./Slider";

function Hero({ setHeroOffset }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [mobileMenu, setMobileMenu] = useState(false);

  const slider = useSelector((state) => state.slider.items);

  // OFFSET

  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const heroHeight = rect.height.toFixed(2);
      setHeroOffset(heroHeight);
    }
  }, []);

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
      ref={elementRef}
      pagination={pagination}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="hero_swiper"
    >
      {slider.map(({ id, url, image, relations, title, data, motivation }) => {
        return (
          <SwiperSlide>
            <Slider
              id={id}
              url={url}
              image={image}
              relations={relations}
              title={title}
              data={data}
              motivation={motivation}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Hero;
