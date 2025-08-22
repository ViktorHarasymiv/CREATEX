import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import HistoryBar from "../HistoryBar/HistoryBar";

import ProductCard from "../Goods/components/ProductCard";
import Filters from "../Filters/Filters";
import Sort from "../SortModule/Sort";
import LoadMore from "../Button/LoadMore";

function Women({ valute, filter, setFilter, sliceValue, setSliceValue }) {
  const products = useSelector((state) => state.goods.items);

  const [onFilters, setOnFilters] = useState(true);

  // useEffect(() => {
  //   const updateColumns = () => {
  //     const width = window.innerWidth;

  //     let baseColumns;
  //     if (width > 1078.98) baseColumns = 4;
  //     else if (width > 777.98) baseColumns = 3;
  //     else if (width <= 539.98) baseColumns = 1;
  //     else baseColumns = 2;

  //     // Якщо фільтр відкритий — зменшуємо кількість колонок
  //     const adjustedColumns = onFilters
  //       ? Math.max(1, baseColumns - 1)
  //       : baseColumns;

  //     setColumns(adjustedColumns);
  //   };

  //   updateColumns();
  //   window.addEventListener("resize", updateColumns);
  //   return () => window.removeEventListener("resize", updateColumns);
  // }, [onFilters]);

  const filteredWomen = products.filter(
    (women) =>
      women.gender == "women" &&
      (filter != "All"
        ? women.category == filter ||
          women.subCategory == filter ||
          (women.numeric
            ? women.numeric.includes(filter)
            : women.size.includes(filter)) ||
          women.color.includes(filter) ||
          women.filter == filter ||
          (women.price > filter[0] && women.price < filter[1])
        : women)
  );
  return (
    <main>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_wrapper">
          <Sort
            array={products}
            data={filteredWomen.length}
            setFilter={setFilter}
            sliceValue={sliceValue}
            setSliceValue={setSliceValue}
            showFilter={setOnFilters}
            isOnFilter={onFilters}
          ></Sort>
          <div className="product_wrapper-sort">
            {onFilters && <Filters setFilter={setFilter}></Filters>}
            {filteredWomen.length > 0 ? (
              <div className="product_column_page">
                <div className="product_page">
                  {filteredWomen
                    .slice(0, sliceValue)
                    .map((womenArray, index) => {
                      return <ProductCard key={index} data={womenArray} />;
                    })}
                </div>
                {filteredWomen.length > 6 && (
                  <LoadMore
                    sliceValue={sliceValue}
                    setSliceValue={setSliceValue}
                    context={
                      sliceValue >= filteredWomen.length
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

export default Women;
