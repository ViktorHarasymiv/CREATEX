import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import style from "./../SortModule/Sort.module.css";

import HistoryBar from "../HistoryBar/HistoryBar";
import ProductCard from "../Goods/components/ProductCard";
import Sort from "../SortModule/Sort";
import LoadMore from "../Button/LoadMore";
import Pagination from "../Pagination/Pagination";

function Sale({ valute, filter, setFilter, sliceValue, setSliceValue }) {
  const products = useSelector((state) => state.goods.items);

  // PRODUCT SALE DATA

  const filteredSale = products.filter(
    (sale) =>
      sale.filter === "Sale" &&
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

  const [page, setPage] = useState(0);

  return (
    <>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className="product_wrapper">
          <div className="product_wrapper-sort">
            <Sort
              data={filteredSale.length}
              setFilter={setFilter}
              sliceValue={sliceValue}
              setSliceValue={setSliceValue}
            ></Sort>
            {filteredSale.length > 0 ? (
              <div className="product_page">
                {filteredSale.slice(page, sliceValue).map((saleItems) => {
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
            ) : (
              <h4>No products found, please enter another value</h4>
            )}
            {filteredSale.length > 8 && (
              // <LoadMore
              //   sliceValue={sliceValue}
              //   setSliceValue={setSliceValue}
              //   context={
              //     sliceValue >= filteredSale.length ? "Hide All" : "Load More"
              //   }
              // />
              <Pagination
                data={filteredSale}
                totalPages={filteredSale.length / 8}
                page={page}
                setPage={setPage}
                sliceValue={sliceValue}
                setSliceValue={setSliceValue}
                onPageChanges={setSliceValue}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sale;
