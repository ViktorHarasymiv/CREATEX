// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

// MEDIA

import { AiOutlineDelete } from "react-icons/ai";

import css from "./SetSlider.module.css";

export default function GetSliders({ sliders, onDelete }) {
  return (
    <div className={css.getSlidersWrapper}>
      {sliders.length > 0 ? (
        <Swiper
          pagination={{
            type: "fraction",
          }}
          spaceBetween={20}
          navigation={true}
          modules={[Pagination, Navigation]}
          className={css.slider}
        >
          <ul className={css.getSlidersList}>
            {sliders.map((item, index) => (
              <SwiperSlide>
                <li className={css.getSliderItem} key={index}>
                  <button
                    onClick={() => onDelete(item.title)}
                    className={css.sliderDeleteBtn}
                  >
                    <AiOutlineDelete className={css.ico} />
                    Delete slide
                  </button>
                  <img
                    src={item.image}
                    alt=""
                    width={750}
                    height={400}
                    loading="lazy"
                  />

                  <h2 className={css.getSliderName}>{item.name}</h2>
                </li>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
      ) : (
        <h3>Your slider component is empty, please add slider item !</h3>
      )}
    </div>
  );
}
