import { useState } from "react";

import { Link } from "react-router-dom";

import "./productCard.css";
import css from "../../NewArrivals/ArrivalsItem/ArrivalsItem.module.css";

import ConfigPrice from "../../ui/ConfigPrice";
import SaleBadg from "../../ui/SaleBadg/SaleBadg";

import Like from "../../ui/Like/Like";
import Rating from "../../ui/Rating/Rating";

function ProductCard({ data, valute }) {
  // STATE

  const [rating, setRating] = useState(data.ratingStart || 0);

  /* VALUTE */

  const changeValute = (PRICE) => {
    if (data.valute == "Dollar") {
      return PRICE.toFixed(2);
    } else return (PRICE * 0.876).toFixed(2);
  };

  /* BODY */

  const priceStyleObj = {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 20,
  };

  return (
    <div key={data.id} className={css.product_card}>
      {data.sale && <SaleBadg value={data.saleValue} />}
      <Rating
        value={data.ratingStart}
        rating={data.rating}
        setRating={setRating}
      />
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
