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

  const saleArray = products.filter(
    (sale) =>
      sale.sale == true &&
      (filter != "All"
        ? sale.category == filter ||
          sale.subCategory == filter ||
          (sale.numeric
            ? sale.numeric.includes(filter)
            : sale.size.includes(filter)) ||
          sale.color.includes(filter) ||
          sale.filter == filter ||
          (sale.price > filter[0] && sale.price < filter[1])
        : sale)
  );

  return (
    <main>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_wrapper">
          <Sort
            data={saleArray.length}
            setFilter={setFilter}
            sliceValue={sliceValue}
            setSliceValue={setSliceValue}
            showFilter={setOnFilters}
            isOnFilter={onFilters}
          ></Sort>
          <div className="product_wrapper-sort">
            {onFilters && <Filters setFilter={setFilter}></Filters>}
            {saleArray.length > 0 ? (
              <div className="product_column_page">
                <div className="product_page">
                  {saleArray.slice(0, sliceValue).map((saleArray, index) => {
                    return (
                      <ProductCard
                        key={index}
                        data={saleArray}
                        valute={valute}
                      />
                    );
                  })}
                </div>
                {saleArray.length > 6 && (
                  <LoadMore
                    sliceValue={sliceValue}
                    setSliceValue={setSliceValue}
                    context={
                      sliceValue >= saleArray.length ? "Hide All" : "Load More"
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
