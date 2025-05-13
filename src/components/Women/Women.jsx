import { useState } from "react";
import { useSelector } from "react-redux";

import css from "./Women.module.css";

import style from "./../SortModule/Sort.module.css";

import HistoryBar from "../HistoryBar/HistoryBar";

import ProductCard from "./ProductCard";
import Filters from "../Filters/Filters";
import Sort from "../SortModule/Sort";

function Women({ valute, filter, setFilter }) {
  const products = useSelector((state) => state.goods.items);

  const filteredWomenArray = () => {
    return products.filter(
      (women) => women.gender == "women" && women.category == fiteredList
    );
  };

  return (
    <>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_wrapper">
          <Filters data={products} setFilter={setFilter} />
          <div className={style.sort_module_wrapper}>
            <Sort setFilter={setFilter}></Sort>
            <div className="product_page">
              {products
                .filter(
                  (women) =>
                    women.gender == "women" &&
                    (filter != "All"
                      ? women.category == filter ||
                        women.subCategory == filter ||
                        women.sizeNumm.includes(filter) ||
                        women.size.includes(filter) ||
                        women.color.includes(filter) ||
                        women.filter == filter
                      : women)
                )
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
                      id={id}
                      gender={gender}
                      title={title}
                      image={image}
                      alt={alt}
                      ratingStart={rating}
                      saleValue={saleValue}
                      price={price}
                      sale={sale}
                      valute={valute}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Women;
