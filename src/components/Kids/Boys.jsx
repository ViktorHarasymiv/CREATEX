import { useSelector } from "react-redux";

import style from "./../SortModule/Sort.module.css";

import HistoryBar from "../HistoryBar/HistoryBar";

import ProductCard from "../Goods/components/ProductCard";
import Sort from "../SortModule/Sort";

export default function Kids({
  valute,
  setFilter,
  filter,
  sliceValue,
  setSliceValue,
}) {
  const products = useSelector((state) => state.goods.items);

  const boysGoods = products.filter(
    (boy) =>
      boy.category === "boy" &&
      (filter != "All"
        ? boy.category == filter ||
          boy.subCategory == filter ||
          boy.numeric.includes(filter) ||
          boy.size.includes(filter) ||
          boy.color.includes(filter) ||
          boy.filter == filter ||
          (boy.price > filter[0] && boy.price < filter[1])
        : boy)
  );

  return (
    <main>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_wrapper">
          <div className="product_wrapper-sort">
            <Sort
              setFilter={setFilter}
              sliceValue={sliceValue}
              setSliceValue={setSliceValue}
            ></Sort>
            <div className="product_page">
              {boysGoods.slice(0, sliceValue).map((boys) => {
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
                } = boys;

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
