import { useSelector } from "react-redux";

import style from "./../SortModule/Sort.module.css";

import HistoryBar from "../HistoryBar/HistoryBar";
import ProductCard from "../Goods/components/ProductCard";
import Filters from "../Filters/Filters";
import Sort from "../SortModule/Sort";

function Sale({ valute, filter, setFilter, sliceValue, setSliceValue }) {
  const products = useSelector((state) => state.goods.items);

  const kidsGoods = useSelector((state) => state.goods.kids);

  // PRODUCT SALE DATA
  const filteredSale = products.filter(
    (sale) =>
      sale.filter == "Sale" &&
      (filter != "All"
        ? sale.category == filter ||
          sale.subCategory == filter ||
          sale.sizeNumm.includes(filter) ||
          sale.size.includes(filter) ||
          sale.color.includes(filter) ||
          sale.filter == filter ||
          (sale.price > filter[0] && sale.price < filter[1])
        : sale)
  );

  const filteredKidsSale = kidsGoods.filter(
    (kids) =>
      kids.filter == "Sale" &&
      (filter != "All"
        ? kids.category == filter ||
          kids.subCategory == filter ||
          kids.sizeNumm.includes(filter) ||
          kids.size.includes(filter) ||
          kids.color.includes(filter) ||
          kids.filter == filter ||
          (kids.price > filter[0] && kids.price < filter[1])
        : kids)
  );

  const saleArray = [...filteredSale, ...filteredKidsSale];

  return (
    <>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_wrapper">
          <Filters data={products} setFilter={setFilter} />
          <div className="product_wrapper-sort">
            <Sort
              data={saleArray.length}
              setFilter={setFilter}
              sliceValue={sliceValue}
              setSliceValue={setSliceValue}
            ></Sort>
            {saleArray.length > 0 ? (
              <div className="product_page">
                {saleArray.slice(0, sliceValue).map((saleItems) => {
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
                  } = saleItems;

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
                {filteredKidsSale.slice(0, sliceValue).map((saleItems) => {
                  const {
                    id,
                    gender,
                    title,
                    category,
                    image,
                    alt,
                    rating,
                    saleValue,
                    price,
                    sale,
                  } = saleItems;

                  return (
                    <ProductCard
                      key={id}
                      id={id}
                      gender={gender}
                      title={title}
                      category={category}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Sale;
