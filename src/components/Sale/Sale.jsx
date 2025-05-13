import { useSelector } from "react-redux";

import style from "./../SortModule/Sort.module.css";

import HistoryBar from "../HistoryBar/HistoryBar";
import ProductCard from "./ProductCard";
import Filters from "../Filters/Filters";
import Sort from "../SortModule/Sort";

function Sale({ valute, filter, setFilter }) {
  const products = useSelector((state) => state.goods.items);
  return (
    <>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_wrapper">
          <Filters data={products} setFilter={setFilter} />
          <div className={style.sort_module_wrapper}>
            <Sort setFilter={setFilter}></Sort>
            <div className="product_page">
              {products
                .filter(
                  (sale) =>
                    sale.filter == "Sale" &&
                    (filter != "All"
                      ? sale.category == filter ||
                        sale.subCategory == filter ||
                        sale.sizeNumm.includes(filter) ||
                        sale.size.includes(filter) ||
                        sale.color.includes(filter) ||
                        sale.filter == filter
                      : sale)
                )
                .map((saleItems) => {
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sale;
