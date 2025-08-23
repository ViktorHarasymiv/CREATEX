import React from "react";

import style from "./SelfGoodCard.module.css";

import Button from "../../Button/Button";

// Utils

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import ConfigPrice from "../../ui/ConfigPrice";
import SizeCheckBox from "../../ui/SizeCheckBox/SizeCheckBox";
import ColorCheckBox from "../../ui/ColorCheckBox/ColorCheckBox";
import SaleBadg from "../../ui/SaleBadg/SaleBadg";
import Rating from "../../ui/Rating/Rating";
import Like from "../../ui/Like/Like";

// Dynamic style

const priceStyleObj = {
  fontWeight: 700,
  fontSize: 24,
  marginBottom: 20,
};

const styleObj = {
  zIndex: 2,
  position: "absolute",
  top: 16,
  right: 16,
};

export default function SelfGoodCard({
  good,
  valute,
  count,
  size,
  checkInCart,
  addToBasket,
  error,
  action,
  color,
  colorError,
  setColor,
}) {
  return (
    <div className={style.good_card}>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className={style.mySwiper}
      >
        {good.saleValue && <SaleBadg value={good.saleValue} />}
        <Rating value={good.rating} style={styleObj} />
        <Like id={good.id} good={good}></Like>
        {good.image.map((item, key) => (
          <SwiperSlide key={key}>
            <img src={item} alt="" width={390} height={440} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={style.good_params}>
        <h3 className={style.good_title}>{good.title}</h3>
        {/* Price value  */}
        <ConfigPrice
          style={priceStyleObj}
          price={good.price}
          count={count}
          sale={good.sale}
          saleValue={good.saleValue}
          valute={valute}
        />
        <div className={style.good_change_param}>
          <SizeCheckBox
            sizeArray={good.size ? good.size : good.numeric}
            size={size}
            error={error}
            action={action}
          />
          <ColorCheckBox
            colorArray={good.color}
            color={color}
            colorError={colorError}
            action={setColor}
          />
        </div>
        <Button type={"button"} action={addToBasket}>
          {checkInCart(good.id) ? "Remove from cart" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}
