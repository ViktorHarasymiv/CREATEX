import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../../redux/wishlistSlice";

import "../../styles/productCard.css";
import css from "./../NewArrivals/ArrivalsItem/ArrivalsItem.module.css";

import starEmpty from "./../Wishlist/icons/StarEmpty.svg";
import starSelect from "./../Wishlist/icons/StarColor.svg";

import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";

function ProductCard({
  id,
  gender,
  title,
  image,
  alt,
  ratingStart,
  saleValue,
  price,
  sale,
}) {
  // STATE
  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // STORE
  const wishlistArray = useSelector((state) => state.wishlist.products);
  const dispatch = useDispatch();

  // FUNCTION

  const deleteLike = (id) => {
    dispatch(deleteProduct(id));
  };

  const getLike = (id, title, ratingStart, price, sale, saleValue, image) => {
    dispatch(
      addProduct({
        id,
        gender,
        title,
        rating,
        price,
        sale,
        saleValue,
        image,
      })
    );
  };

  const salePrice = price - price * (saleValue / 100);

  const wishlistID = wishlistArray.map((item) => {
    return item.id;
  });

  return (
    <div key={id} className="product_card">
      <div className={css.product_image_tile}>
        <Link to={`/${gender}/${id}`}>
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
          {wishlistID.find((itemID) => itemID == id) ? (
            <button onClick={deleteLike} className={css.favorite_button}>
              <IoMdHeart style={{ fill: "red" }} />
            </button>
          ) : (
            <button
              onClick={() =>
                getLike(id, title, rating, price, sale, saleValue, image)
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

export default ProductCard;
