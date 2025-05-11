import { useState } from "react";

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
  valute,
}) {
  // STATE
  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(ratingStart || 0);
  const [hover, setHover] = useState(0);

  // STORE
  const wishlistArray = useSelector((state) => state.wishlist.products);
  const dispatch = useDispatch();

  // FUNCTION

  const deleteLike = (id) => {
    dispatch(deleteProduct(id));
    setIsLiked(false);
  };

  const getLike = (id, title, rating, price, sale, saleValue, image) => {
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

  const wishlistID = wishlistArray.map((item) => {
    return item.id;
  });

  /* VALUTE */

  const changeValute = (PRICE) => {
    if (valute == "Dollar") {
      return PRICE.toFixed(2);
    } else return (PRICE * 0.876).toFixed(2);
  };

  /* BODY */

  return (
    <div key={id} className="product_card">
      <div className={css.product_image_tile}>
        <Link to={`/${gender}/${id}`}>
          <img
            className={css.product_image}
            src={`images/goods/${image[0]}`}
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
                      currentRating <= (hover || rating || ratingStart)
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
            <button
              onClick={() => deleteLike(id)}
              className={css.favorite_button}
            >
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
                fontSize: "20px",
                lineHeight: "1",
              }}
            >
              <span className="valute">{valute == "Dollar" ? "$" : "€"}</span>
              {(
                changeValute(price) -
                changeValute(price) * (saleValue / 100)
              ).toFixed(2)}
            </span>
          )}
          <span
            style={{
              textDecoration: sale ? "line-through" : "none",
              fontSize: sale ? "14px" : "20px",
              color: sale ? "var(--gray-700)" : "var(--gray-900)",
              fontWeight: sale ? "400" : "900",
            }}
            className={css.product_price}
          >
            <span className="valute">{valute == "Dollar" ? "$" : "€"}</span>
            {changeValute(price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
