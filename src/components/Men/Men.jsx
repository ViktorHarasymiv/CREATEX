import { useState } from "react";
import { useSelector } from "react-redux";
import HistoryBar from "../HistoryBar/HistoryBar";

import ProductCard from "../Goods/components/ProductCard";
import Sort from "../SortModule/Sort";
import Filters from "../Filters/Filters";
import LoadMore from "../Button/LoadMore";

function Men({ valute, filter, setFilter, sliceValue, setSliceValue }) {
  const products = useSelector((state) => state.goods.items);
  const [onFilters, setOnFilters] = useState(true);

  const filteredMen = products.filter(
    (men) =>
      men.gender == "men" &&
      (filter != "All"
        ? men.category == filter ||
          men.subCategory == filter ||
          (men.numeric
            ? men.numeric.includes(filter)
            : men.size.includes(filter)) ||
          men.color.includes(filter) ||
          men.filter == filter ||
          (men.price > filter[0] && men.price < filter[1])
        : men)
  );

  return (
    <main>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_wrapper">
          <Sort
            data={filteredMen.length}
            setFilter={setFilter}
            sliceValue={sliceValue}
            setSliceValue={setSliceValue}
            showFilter={setOnFilters}
            isOnFilter={onFilters}
          ></Sort>
          <div className="product_wrapper-sort">
            {onFilters && <Filters setFilter={setFilter}></Filters>}
            {filteredMen.length > 0 ? (
              <div className="product_column_page">
                <div className="product_page">
                  {filteredMen.slice(0, sliceValue).map((mensArray, index) => {
                    return (
                      <ProductCard
                        key={index}
                        data={mensArray}
                        valute={valute}
                      />
                    );
                  })}
                </div>
                {filteredMen.length > 6 && (
                  <LoadMore
                    sliceValue={sliceValue}
                    setSliceValue={setSliceValue}
                    context={
                      sliceValue >= filteredMen.length
                        ? "Hide All"
                        : "Load More"
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

export default Men;
