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
            .filter((women) => women.gender == "men")
            .map((womenItems) => {
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
              } = womenItems;

              return (
                <ProductCard
                  key={id}
                  gender={gender}
                  id={id}
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
