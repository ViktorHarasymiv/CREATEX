import React, { useState } from "react";

import { CiHeart } from "react-icons/ci";
import starEmpty from "./icons/StarEmpty.svg";
import starSelect from "./icons/StarColor.svg";

import css from "./ArrivalsItem.module.css";
import { Link } from "react-router-dom";

function ArrivalsItem({
  id,
  filter,
  title,
  image,
  alt,
  ratingStart,
  saleValue,
  price,
  sale,
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className={css.product_tile}>
      <div className={css.product_image_tile}>
        <Link to={`/goods/${id}`}>
          <img
            className={css.product_image}
            src={`images/goods/${image}`}
            alt={alt}
          />
        </Link>
        <div className={css.top_info_panel}>
          <div className={css.sale_tile}>
            {saleValue.length > 0 && (
              <span className={css.sale_band}>-{saleValue}%</span>
            )}
          </div>
          <div className={css.rating_tile}>
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <span key={index}>
                  <img
                    src={
                      currentRating <= (rating || hover || ratingStart)
                        ? starSelect
                        : starEmpty
                    }
                    alt=""
                    width={14}
                    height={14}
                    onClick={() => setRating(currentRating)}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(0)}
                  />
                </span>
              );
            })}
          </div>
        </div>
        <div className={css.favorite_tile}>
          <button className={css.favorite_button}>
            <CiHeart></CiHeart>
          </button>
        </div>
      </div>
      <div className={css.product_info}>
        <h3 className={css.product_title}>{title}</h3>
        <div className={css.price_tile}>
          {sale && (
            <span
              style={{
                color: "var(--danger)",
                fontWeight: "700",
                fontSize: "24px",
                lineHeight: "1",
              }}
            >
              ${price - price * (saleValue / 100)}
            </span>
          )}
          <span
            style={{
              textDecoration: sale ? "line-through" : "none",
              fontSize: sale ? "16px" : "24",
              color: sale ? "var(--gray-700)" : "var(--gray-900)",
              fontWeight: sale ? "400" : "900",
            }}
            className={css.product_price}
          >
            ${price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ArrivalsItem;
