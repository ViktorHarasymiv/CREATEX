import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./setup.css";

// import required modules
import { Keyboard, Pagination } from "swiper/modules";

import css from "./NewArrivals.module.css";
import ArrivalsItem from "./ArrivalsItem/ArrivalsItem";

function NewArrivals({ valute }) {
  const products = useSelector((state) => state.goods.items);
  return (
    <div className={css.new_arrivals_tile}>
      <div className={css.new_arrivals_title_tile}>
        <h2 className={css.new_arrivals_title}>New arrivals</h2>
        <p className={css.new_arrivals_subb_text}>
          Check out our latest arrivals for the upcoming season
        </p>
        <Link to={"/new"} className={css.link_new_arrivals}>
          See the collection here
        </Link>
      </div>
      <div className={css.new_arrivals_product_tile}>
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Keyboard, Pagination]}
          className="new_arrivals_slider"
          breakpoints={{
            320: { slidesPerView: 1 },
            540: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
            1700: { slidesPerView: 6 },
          }}
        >
          {products
            .filter((product) => product.filter === "New")
            .reverse()
            .slice(0, 9)
            .map((filteredProduct) => {
              const {
                id,
                filter,
                gender,
                title,
                image,
                alt,
                rating,
                saleValue,
                price,
                sale,
              } = filteredProduct;

              return (
                <SwiperSlide
                  style={{ marginRight: "0" }}
                  className={css.product_slide}
                >
                  <ArrivalsItem
                    id={id}
                    gender={gender}
                    filter={filter}
                    title={title}
                    image={image}
                    alt={alt}
                    ratingState={rating}
                    saleValue={saleValue}
                    price={price}
                    sale={sale}
                    data={filteredProduct}
                    valute={valute}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

export default NewArrivals;
