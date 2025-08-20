import { useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../../../redux/wishlistSlice";

import "./productCard.css";
import css from "../../NewArrivals/ArrivalsItem/ArrivalsItem.module.css";

import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import SaleBadg from "../../ui/SaleBadg/SaleBadg";
import Rating from "../../ui/Rating/Rating";

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

  const [rating, setRating] = useState(ratingStart || 0);
  const [isLiked, setIsLiked] = useState(false);

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
    <div key={id} className={css.product_card}>
      {sale && <SaleBadg value={saleValue} />}
      <Rating value={ratingStart} rating={rating} setRating={setRating} />
      <div className={css.product_image_tile}>
        <Link to={`/${gender}/${id}`}>
          <img className={css.product_image} src={image[0]} alt={alt} />
        </Link>
        <div
          onClick={() =>
            wishlistID.some((itemID) => itemID == id)
              ? deleteLike(id)
              : getLike(id, title, rating, price, sale, saleValue, image)
          }
          className={css.favorite_tile}
        >
          <button className={css.favorite_button}>
            {wishlistID.find((itemID) => itemID == id) ? (
              <IoMdHeart
                style={{
                  fill: wishlistID.find((itemID) => itemID == id)
                    ? "red"
                    : "var(--primary)",
                }}
              />
            ) : (
              <CiHeart
                style={{
                  fill: "var(--primary)",
                }}
              ></CiHeart>
            )}
          </button>
        </div>
      </div>
      <div className={css.product_info}>
        <h3 className={css.product_title}>{title}</h3>
        <div className={css.valute_tile}>
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
