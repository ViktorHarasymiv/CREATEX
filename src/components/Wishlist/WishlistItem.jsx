import { Link } from "react-router-dom";

/* HOOKS */

import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/wishlistSlice";

/* STYLE */
import css from "./../NewArrivals/ArrivalsItem/ArrivalsItem.module.css";

/* ICONS */

import { AiOutlineDelete } from "react-icons/ai";
import starEmpty from "./icons/StarEmpty.svg";
import starSelect from "./icons/StarColor.svg";

function WishlistItem({ data, valute }) {
  const dispatch = useDispatch();

  const deleteLike = (id) => {
    dispatch(deleteProduct(id));
  };

  /* VALUTE */

  const changeValute = (PRICE) => {
    if (valute == "Dollar") {
      return PRICE.toFixed(2);
    } else return (PRICE * 0.876).toFixed(2);
  };

  /* BODY */

  console.log(data);

  return (
    <div className={css.product_tile}>
      <div className={css.product_image_tile}>
        <Link to={`/${data.gender}/${data.id}`}>
          <img
            className={css.product_image}
            src={data.image[0]}
            alt={data.alt}
          />
        </Link>
        <div className={css.top_info_panel}>
          <div className={css.sale_tile}>
            {data.saleValue.length > 0 && (
              <span className={css.sale_band}>-{data.saleValue}%</span>
            )}
          </div>
          <div className={css.rating_tile}>
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <span key={index}>
                  <img
                    src={currentRating <= data.rating ? starSelect : starEmpty}
                    alt=""
                    width={14}
                    height={14}
                  />
                </span>
              );
            })}
          </div>
        </div>
        <div className={css.favorite_tile}>
          <button className={css.favorite_button}>
            <AiOutlineDelete onClick={() => deleteLike(data.id)} />
          </button>
        </div>
      </div>
      <div className={css.product_info}>
        <h3 className={css.product_title}>{data.title}</h3>
        <div className={css.valute_tile}>
          {data.sale && (
            <span
              style={{
                color: "var(--danger)",
                fontWeight: "700",
                fontSize: "24px",
                lineHeight: "1",
              }}
            >
              <span className="valute">{valute == "Dollar" ? "$" : "€"}</span>
              {(
                changeValute(data.price) -
                changeValute(data.price) * (data.saleValue / 100)
              ).toFixed(2)}
            </span>
          )}
          <span
            style={{
              textDecoration: data.sale ? "line-through" : "none",
              fontSize: data.sale ? "16px" : "24",
              color: data.sale ? "var(--gray-700)" : "var(--gray-900)",
              fontWeight: data.sale ? "400" : "900",
            }}
            className={css.product_price}
          >
            <span className="valute">{valute == "Dollar" ? "$" : "€"}</span>
            {changeValute(data.price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default WishlistItem;
