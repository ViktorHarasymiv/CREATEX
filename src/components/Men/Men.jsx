import React from "react";
import { useSelector } from "react-redux";

import HistoryBar from "../HistoryBar/HistoryBar";

import css from "./Men.module.css";
import ProductCard from "./ProductCard";

function Men() {
  const products = useSelector((state) => state.goods.items);

  return (
    <>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_page">
          {products
            .filter((men) => men.gender == "men")
            .map((MensItems) => {
              const {
                id,
                gender,
                title,
                image,
                alt,
                rating,
                saleValue,
                price,
                sale,
              } = MensItems;

              return (
                <ProductCard
                  key={id}
                  id={id}
                  gender={gender}
                  title={title}
                  image={image}
                  alt={alt}
                  ratingStart={rating}
                  saleValue={saleValue}
                  price={price}
                  sale={sale}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Men;
