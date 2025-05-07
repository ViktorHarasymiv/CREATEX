import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../../../redux/wishlistSlice";

import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import starEmpty from "../../../icons/StarEmpty.svg";
import starSelect from "../../../icons/StarColor.svg";

import css from "./ArrivalsItem.module.css";
import { Link } from "react-router-dom";

function ArrivalsItem({
  id,
  gender,
  title,
  image,
  alt,
  ratingState,
  saleValue,
  price,
  sale,

  data,
}) {
  const wishlistArray = useSelector((state) => state.wishlist.products);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(ratingState || 0);
  const [hover, setHover] = useState(0);

  const salePrice = price - price * (saleValue / 100);

  // ADD CONTACT ACTION

  const getLike = (
    id,
    title,
    gender,
    rating,
    price,
    sale,
    saleValue,
    image
  ) => {
    dispatch(
      addProduct({
        id,
        title,
        gender,
        rating,
        price,
        sale,
        saleValue,
        image,
      })
    );
  };

  const deleteLike = () => {
    dispatch(deleteProduct(data.id));
    setIsLiked(false);
  };

  const wishlistID = wishlistArray.map((item) => {
    return item.id;
  });

  return (
    <div className={css.product_tile}>
      <div className={css.product_image_tile}>
        <Link to={`/${gender}/${id}`}>
          <img
            className={css.product_image}
            src={`images/goods/${image[0]}`}
            alt={alt}
            width={285}
            style={{ backgroundColor: "#f8f8f8" }}
          />
        </Link>
        <div className={css.top_info_panel}>
          <div className={css.sale_tile}>
            {saleValue > 0 && (
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
                      currentRating <= (hover || rating || ratingState)
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
          {wishlistID.find((itemID) => itemID == id) ? (
            <button onClick={deleteLike} className={css.favorite_button}>
              <IoMdHeart style={{ fill: "red" }} />
            </button>
          ) : (
            <button
              onClick={() =>
                getLike(
                  id,
                  title,
                  gender,
                  rating,
                  price,
                  sale,
                  saleValue,
                  image
                )
              }
              className={css.favorite_button}
            >
              <CiHeart onClick={() => setIsLiked(true)} />
            </button>
          )}
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
              ${salePrice.toFixed(2)}
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
