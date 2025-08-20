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
import SaleBadg from "../ui/SaleBadg/SaleBadg";
import Rating from "../ui/Rating/Rating";

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

  return (
    <div className={css.product_card}>
      {data.sale && <SaleBadg value={data.saleValue} />}
      <Rating value={data.rating} />
      <div className={css.product_image_tile}>
        <Link to={`/${data.gender}/${data.id}`}>
          <img
            className={css.product_image}
            src={data.image[0]}
            alt={data.alt}
          />
        </Link>
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
