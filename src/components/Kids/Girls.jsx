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

  const arrayGirl = products.filter(
    (kids) =>
      kids.category == "girl" &&
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
  );

  return (
    <main>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_wrapper">
          <Sort
            data={arrayGirl.length}
            setFilter={setFilter}
            sliceValue={sliceValue}
            setSliceValue={setSliceValue}
            showFilter={setOnFilters}
            isOnFilter={onFilters}
          ></Sort>
          <div className="product_wrapper-sort">
            {onFilters && <Filters setFilter={setFilter}></Filters>}
            {arrayGirl.length > 0 ? (
              <div className="product_column_page">
                <div className="product_page">
                  {arrayGirl.slice(0, sliceValue).map((arrayGirl, index) => {
                    return (
                      <ProductCard
                        key={index}
                        data={arrayGirl}
                        valute={valute}
                      />
                    );
                  })}
                </div>
                {arrayGirl.length > 6 && (
                  <LoadMore
                    sliceValue={sliceValue}
                    setSliceValue={setSliceValue}
                    context={
                      sliceValue >= arrayGirl.length ? "Hide All" : "Load More"
                    }
                  />
                )}
              </div>
            ) : (
              <h4>No products found, please enter another value</h4>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
