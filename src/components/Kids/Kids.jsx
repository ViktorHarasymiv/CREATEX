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

  const arrayKids = products.filter(
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
  );

  return (
    <main>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_wrapper">
          <Sort
            data={arrayKids.length}
            setFilter={setFilter}
            sliceValue={sliceValue}
            setSliceValue={setSliceValue}
            showFilter={setOnFilters}
            isOnFilter={onFilters}
          ></Sort>
          <div className="product_wrapper-sort">
            {onFilters && <Filters setFilter={setFilter}></Filters>}
            {arrayKids.length > 0 ? (
              <div className="product_column_page">
                <div className="product_page">
                  {arrayKids.slice(0, sliceValue).map((arrayKids, index) => {
                    return (
                      <ProductCard
                        key={index}
                        data={arrayKids}
                        valute={valute}
                      />
                    );
                  })}
                </div>
                {arrayKids.length > 6 && (
                  <LoadMore
                    sliceValue={sliceValue}
                    setSliceValue={setSliceValue}
                    context={
                      sliceValue >= arrayKids.length ? "Hide All" : "Load More"
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
