import { Link } from "react-router-dom";

import css from "./ArrivalsItem.module.css";

import Rating from "../../ui/Rating/Rating";
import ConfigPrice from "../../ui/ConfigPrice";
import Like from "../../ui/Like/Like";

function ArrivalsItem({ data, valute }) {
  // Dynamic style

  const priceStyleObj = {
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 20,
  };

  const styleObj = {
    zIndex: 2,
    position: "absolute",
    top: 16,
    right: 16,
  };

  return (
    <div className={css.product_card}>
      {data.filter == "New" && (
        <span className={css.new_band}>{data.filter}</span>
      )}
      <Rating value={data.rating} style={styleObj}></Rating>
      <Link to={`/${data.gender}/${data.id}`}>
        <div className={css.product_image_tile}>
          <img
            className={css.product_image}
            src={data.image[0]}
            alt={data.alt}
            width={285}
            style={{ backgroundColor: "#f8f8f8" }}
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
          />
        </div>
      </Link>
    </div>
  );
}

export default ArrivalsItem;
