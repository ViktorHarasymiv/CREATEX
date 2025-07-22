import { Link } from "react-router-dom";

import style from "../../../NewArrivals/ArrivalsItem/ArrivalsItem.module.css";
import css from "./Search.module.css";
import { IoIosClose } from "react-icons/io";

import ICO from "../../../../../public/images/goods/drop21-1.avif";

function SearchTile({ DATA, value, valute, autoClose }) {
  const salePrice = (price, saleValue) => {
    return changeValute(price) - changeValute(price) * (saleValue / 100);
  };
  const changeValute = (price) => {
    if (valute == "Dollar") {
      return price.toFixed(2);
    } else return (price * 0.876).toFixed(2);
  };

  return (
    <div className={css.search_tile}>
      <IoIosClose onClick={autoClose} className={css.close_modal_search} />
      <ul>
        {value != "" &&
        DATA.filter((item) => item.title.toLowerCase().includes(value)).length >
          0 ? (
          DATA.filter((item) => item.title.toLowerCase().includes(value)).map(
            (filteredSearch) => (
              <li key={filteredSearch.id}>
                <Link
                  onClick={autoClose}
                  to={`/${filteredSearch.gender}/${filteredSearch.id}`}
                  className={css.filteredSearch_link}
                >
                  <div className={css.filteredSearch_product}>
                    <img src={ICO} className={css.filteredSearch_image} />
                    <div className={css.filteredSearch_info_product}>
                      <div className={css.filteredSearch_about_product}>
                        <h5 className={css.search_title}>
                          {filteredSearch.title}
                        </h5>
                        <span className={css.filteredSearch_gender}>
                          {filteredSearch.gender}
                        </span>
                      </div>
                      <div className={style.valute_tile}>
                        {filteredSearch.sale && (
                          <span
                            style={{
                              color: "var(--danger)",
                              fontWeight: "700",
                              fontSize: "20px",
                              lineHeight: "1",
                            }}
                          >
                            {valute == "Dollar" ? "$" : "€"}
                            {salePrice(
                              filteredSearch.price,
                              filteredSearch.saleValue
                            ).toFixed(2)}
                          </span>
                        )}
                        <span
                          style={{
                            textDecoration: filteredSearch.sale
                              ? "line-through"
                              : "none",
                            fontSize: filteredSearch.sale ? "14px" : "16px",
                            color: filteredSearch.sale
                              ? "var(--gray-700)"
                              : "var(--gray-900)",
                            fontWeight: filteredSearch.sale ? "400" : "900",
                          }}
                          className={style.product_price}
                        >
                          {valute == "Dollar" ? "$" : "€"}
                          {changeValute(filteredSearch.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            )
          )
        ) : (
          <li>
            <p className={css.no_results}>
              No products found, please enter another keyword
            </p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default SearchTile;
