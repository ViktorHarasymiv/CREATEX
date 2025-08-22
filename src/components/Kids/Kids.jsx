import { useState } from "react";

import { useSelector } from "react-redux";

import HistoryBar from "../HistoryBar/HistoryBar";

import ProductCard from "../Goods/components/ProductCard";
import Filters from "../Filters/Filters";
import Sort from "../SortModule/Sort";

export default function Kids({
  valute,
  filter,
  setFilter,
  sliceValue,
  setSliceValue,
}) {
  const products = useSelector((state) => state.goods.items);

  const [onFilters, setOnFilters] = useState(true);
  return (
    <main>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_wrapper">
          <Sort
            showFilter={onFilters}
            onFilter={setOnFilters}
            sliceValue={sliceValue}
            setSliceValue={setSliceValue}
          ></Sort>
          <div className="product_wrapper-sort">
            {onFilters && <Filters setFilter={setFilter} />}
            <div className="product_page">
              {products
                .filter(
                  (kids) =>
                    kids.gender == "kids" &&
                    (filter != "All"
                      ? kids.category == filter ||
                        kids.subCategory == filter ||
                        (kids.numeric
                          ? kids.numeric.includes(filter)
                          : kids.size.includes(filter)) ||
                        kids.color.includes(filter) ||
                        kids.filter == filter ||
                        (kids.price > filter[0] && kids.price < filter[1])
                      : kids)
                )
                .slice(0, sliceValue)
                .map((kidsItem) => {
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
                  } = kidsItem;

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
    </main>
  );
}
