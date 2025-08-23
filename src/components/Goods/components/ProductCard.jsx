import { useState } from "react";

import { Link } from "react-router-dom";

import "./productCard.css";
import css from "../../NewArrivals/ArrivalsItem/ArrivalsItem.module.css";

import ConfigPrice from "../../ui/ConfigPrice";
import SaleBadg from "../../ui/SaleBadg/SaleBadg";

import Like from "../../ui/Like/Like";
import Rating from "../../ui/Rating/Rating";

function ProductCard({ data, valute }) {
  const priceStyleObj = {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 20,
  };

  const styleObj = {
    zIndex: 2,
    position: "absolute",
    top: 16,
    right: 16,
  };

  return (
    <div key={data.id} className={css.product_card}>
      {data.sale && <SaleBadg value={data.saleValue} />}
      <Rating value={data.rating} style={styleObj} />
      <Link to={`/${data.gender}/${data.id}`}>
        <div className={css.product_image_tile}>
          <img
            className={css.product_image}
            src={data.image[0]}
            alt={data.alt}
            width={285}
            height={320}
          />
          <Like id={data.id} good={data}></Like>
        </div>
        <div className={css.product_info}>
          <h3 className={css.product_title}>{data.title}</h3>
          <ConfigPrice
            style={priceStyleObj}
            price={data.price}
            count={1}
            sale={data.sale}
            saleValue={data.saleValue}
            valute={valute}
          ></ConfigPrice>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
