import { Link } from "react-router-dom";

/* HOOKS */

import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/wishlistSlice";

/* STYLE */

import css from "./../NewArrivals/ArrivalsItem/ArrivalsItem.module.css";

const styleObj = {
  zIndex: 2,
  position: "absolute",
  top: 16,
  right: 16,
};

/* ICONS */

import { AiOutlineDelete } from "react-icons/ai";

import SaleBadg from "../ui/SaleBadg/SaleBadg";
import Rating from "../ui/Rating/Rating";
import ConfigPrice from "../ui/ConfigPrice";

function WishlistItem({ data, valute }) {
  const dispatch = useDispatch();

  const deleteLike = (id) => {
    dispatch(deleteProduct(id));
  };

  const priceStyleObj = {
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 20,
  };

  /* BODY */

  return (
    <div className={css.product_card}>
      {data.sale && <SaleBadg value={data.saleValue} />}
      <Rating value={data.rating} style={styleObj} />
      <div className={css.product_image_tile}>
        <Link to={`/${data.gender}/${data.id}`}>
          <img
            className={css.product_image}
            src={data.image[0]}
            alt={data.alt}
          />
        </Link>
        <button className={css.deleteLike}>
          <AiOutlineDelete
            onClick={() => deleteLike(data.id)}
            width={12}
            height={12}
          />
        </button>
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
        />
      </div>
    </div>
  );
}

export default WishlistItem;
