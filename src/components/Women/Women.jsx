import { useSelector } from "react-redux";

import css from "./Women.module.css";

import HistoryBar from "../HistoryBar/HistoryBar";

import ProductCard from "../Goods/components/ProductCard";
import Filters from "../Filters/Filters";
import Sort from "../SortModule/Sort";
import LoadMore from "../Button/LoadMore";

function Women({ valute, filter, setFilter, sliceValue, setSliceValue }) {
  const products = useSelector((state) => state.goods.items);

  const filteredWomen = products.filter(
    (women) =>
      women.gender == "women" &&
      (filter != "All"
        ? women.category == filter ||
          women.subCategory == filter ||
          women.sizeNumm.includes(filter) ||
          women.size.includes(filter) ||
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
          <div className="product_wrapper-sort">
            <Sort
              array={products}
              data={filteredWomen.length}
              setFilter={setFilter}
              sliceValue={sliceValue}
              setSliceValue={setSliceValue}
            ></Sort>
            {filteredWomen.length > 0 ? (
              <div className="product_page">
                {filteredWomen.slice(0, sliceValue).map((womenItems) => {
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
            ) : (
              <h4>No products found, please enter another value</h4>
            )}
            {filteredWomen.length > 6 && (
              <LoadMore
                sliceValue={sliceValue}
                setSliceValue={setSliceValue}
                context={
                  sliceValue >= filteredWomen.length ? "Hide All" : "Load More"
                }
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Women;
