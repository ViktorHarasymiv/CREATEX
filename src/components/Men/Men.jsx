import { useSelector } from "react-redux";

import style from "./../SortModule/Sort.module.css";

import HistoryBar from "../HistoryBar/HistoryBar";

import ProductCard from "../Goods/components/ProductCard";
import Filters from "../Filters/Filters";
import Sort from "../SortModule/Sort";
import LoadMore from "../Button/LoadMore";

function Men({ valute, filter, setFilter, sliceValue, setSliceValue }) {
  const products = useSelector((state) => state.goods.items);
  const filteredMen = products.filter(
    (men) =>
      men.gender == "men" &&
      (filter != "All"
        ? men.category == filter ||
          men.subCategory == filter ||
          men.sizeNumm.includes(filter) ||
          men.size.includes(filter) ||
          men.color.includes(filter) ||
          men.filter == filter ||
          (men.price > filter[0] && men.price < filter[1])
        : men)
  );

  return (
    <>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_wrapper">
          <Filters data={products} setFilter={setFilter} />
          <div className="product_wrapper-sort">
            <Sort
              data={filteredMen.length}
              setFilter={setFilter}
              sliceValue={sliceValue}
              setSliceValue={setSliceValue}
            ></Sort>

            {filteredMen.length > 0 ? (
              <div className="product_page">
                {filteredMen.slice(0, sliceValue).map((MensItems) => {
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
                      valute={valute}
                    />
                  );
                })}
              </div>
            ) : (
              <h4>No products found, please enter another value</h4>
            )}
            {filteredMen.length > 6 && (
              <LoadMore
                sliceValue={sliceValue}
                setSliceValue={setSliceValue}
                context={
                  sliceValue >= filteredMen.length ? "Hide All" : "Load More"
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Men;
