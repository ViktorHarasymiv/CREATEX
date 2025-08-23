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

function Hero() {
  const slider = useSelector((state) => state.slider.items);

  // OFFSET

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + "0" + (index + 1) + "</span>";
    },
  };

  return (
    <Swiper
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
