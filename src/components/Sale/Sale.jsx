import { useSelector } from "react-redux";

import HistoryBar from "../HistoryBar/HistoryBar";
import ProductCard from "./ProductCard";

function Sale({ valute }) {
  const products = useSelector((state) => state.goods.items);
  return (
    <>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_page">
          {products
            .filter((sale) => sale.filter == "sale")
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
    </>
  );
}

export default Sale;
