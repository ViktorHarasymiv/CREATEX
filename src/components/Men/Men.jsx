import { useSelector } from "react-redux";

import HistoryBar from "../HistoryBar/HistoryBar";

import ProductCard from "./ProductCard";
import Filters from "../Filters/Filters";

function Men({ valute, filter, setFilter }) {
  const products = useSelector((state) => state.goods.items);

  return (
    <>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_wrapper">
          <Filters data={products} setFilter={setFilter} />
          <div className="product_page">
            {products
              .filter(
                (men) =>
                  men.gender == "men" &&
                  (filter != "All"
                    ? men.category == filter ||
                      men.sizeNumm.includes(filter) ||
                      men.size.includes(filter) ||
                      men.color.includes(filter)
                    : men)
              )
              .map((MensItems) => {
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
        </div>
      </div>
    </>
  );
}

export default Men;
