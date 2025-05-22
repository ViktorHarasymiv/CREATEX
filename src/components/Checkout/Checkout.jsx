import { useState, useRef, useEffect } from "react";
import html2pdf from "html2pdf.js";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  updateOrder,
  updatePromo,
  updateDelivery,
} from "../../redux/orderSlice";
import { deleteFromBasket, setAmoutAction } from "../../redux/basketSlice";

import css from "./Checkout.module.css";
import style from "../Header/MiddleTile/Cart/Basket/Modal.module.css";

import { BsPlusLg } from "react-icons/bs";
import { PiMinus } from "react-icons/pi";

import { AiOutlineDelete } from "react-icons/ai";

import Sign_In from "./icons/Person.png";

import HistoryBar from "../HistoryBar/HistoryBar";
import AddressForm from "./Form/AddressForm";

function Checkout({ valute }) {
  const dispatch = useDispatch();

  // STATE

  const [shippCost, setShippCost] = useState(0);
  const [shippTitle, setShippTitle] = useState("");

  /* SLICE */

  const basket = useSelector((state) => state.basket.basketArr);
  const PROMO = useSelector((state) => state.order.promo);
  const shippingMethod = useSelector((state) => state.order.shippingMethod);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (basket.length > 0) {
      dispatch(updateOrder(basket));
    }
  }, [basket]);

  const contentRef = useRef();

  const generatePDF = () => {
    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: "styled-document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(contentRef.current)
      .save();
  };

  const deleteItem = (id) => {
    dispatch(deleteFromBasket(id));
  };

  const changeAmout = (id, number) => {
    dispatch(setAmoutAction({ id, count: number }));
  };

  const changeValute = (price, sale, salePrice) => {
    if (valute == "Dollar") {
      return sale == true ? salePrice.toFixed(2) : price.toFixed(2);
    } else
      return sale == true
        ? (salePrice * 0.876).toFixed(2)
        : (price * 0.876).toFixed(2);
  };

  const totalPrice = basket.reduce(
    (sum, { price, sale, salePrice, count }) =>
      sum + (sale == true ? salePrice * count : price * count),
    0
  );

  /* PROMO */
  let promoName = "";

  const [promoValue, setPromoValue] = useState(null);
  const [promo, setPromo] = useState(null);

  const promoChacked = () => {
    PROMO.map((item) => {
      if (item.name == promo) {
        setPromoValue(item.value);
      }
    });
  };

  const priceWithPromo = promoValue
    ? (
        changeValute(isNaN(shippCost) ? totalPrice : totalPrice + shippCost) -
        (changeValute(isNaN(shippCost) ? totalPrice : totalPrice + shippCost) *
          promoValue) /
          100
      ).toFixed(2)
    : changeValute(isNaN(shippCost) ? totalPrice : totalPrice + shippCost);

  useEffect(() => {
    if (promo == null) {
      return;
    }
    if (PROMO.find(({ name }) => name == promo)) {
      promoChacked();
      dispatch(updatePromo(promo));
    }
  }, [promo]);

  // ERROR PROMO

  const [error, setError] = useState("");

  const errorPromo = () => {
    if (PROMO.find((item) => promoName == item.name)) {
      setError("Succsess");
    } else if (PROMO.find((item) => promoName != item.name)) {
      setError("Promo code is invalid.");
    }
    return;
  };

  // Shipping Method

  const changePrice = (price) => {
    if (typeof price === "number") {
      if (valute == "Euro") {
        return (price * 0.876).toFixed(2);
      } else return price.toFixed(2);
    } else return price;
  };

  useEffect(() => {
    if (shippCost == null || shippCost == 0) {
      return;
    }
    dispatch(updateDelivery(shippTitle));
  }, [shippCost]);

  return (
    <>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className={css.checkout_wrapper}>
          {basket.length > 0 ? (
            <div className={css.checkout_product_tile}>
              <div className={css.checkout_title_tile}>
                <h2 className={css.checkout_title}>Checkout</h2>
                <Link to={"/"} className={css.checkout_back_link}>
                  Back to shopping
                </Link>
              </div>
              <div className={css.checkout_sign_link_tile}>
                <img
                  className={css.checkout_sign_in_logo}
                  src={Sign_In}
                  alt="sign in logo"
                />
                <div className={css.checkout_sign_link_title}>
                  <span>Already have an account?</span>
                  <Link
                    className={css.checkout_back_link}
                    style={{ marginInline: "7px" }}
                  >
                    Sign in
                  </Link>
                  <span>for faster checkout experience</span>
                </div>
              </div>
              <div className={css.checkout_order_tile}>
                {/* Item */}
                <div className={css.checkout_item_tile}>
                  <h3 className={css.checkout_item_title}>1. Item Review</h3>
                  <ul ref={contentRef} className={css.checkout_item_wrapper}>
                    {basket.map((item) => {
                      return (
                        <li key={item.id} className={style.basket_product_tile}>
                          <img
                            src={`/images/goods/${item.image[0]}`}
                            alt={item.title}
                            width={80}
                            height={80}
                          />
                          <div className={style.basket_product_info_tile}>
                            <div className={style.basket_tile_top}>
                              <Link to={`/${item.gender}/${item.id}`}>
                                <h4>{item.title}</h4>
                              </Link>
                              <button
                                onClick={() => deleteItem(item.id)}
                                className={style.basket_delete_button}
                              >
                                <AiOutlineDelete />
                              </button>
                            </div>
                            <div className={style.basket_product_checked_info}>
                              <span className={style.basket_product_color}>
                                Color: {item.color}
                              </span>
                              <span className={style.basket_product_size}>
                                Size: {item.size}
                              </span>
                              <span className={style.basket_product_size}>
                                Price:{" "}
                                {(
                                  changeValute(
                                    item.price,
                                    item.sale,
                                    item.salePrice
                                  ) * item.count
                                ).toFixed(2)}
                              </span>
                            </div>
                            <div className={style.basket_count_product}>
                              <div className={style.count_price_buttons}>
                                <button
                                  className={style.custom_count_button}
                                  onClick={() => {
                                    if (item.count >= 50) {
                                      return;
                                    } else {
                                      changeAmout(item.id, item.count + 1);
                                    }
                                  }}
                                >
                                  <BsPlusLg className={style.amout_button} />
                                </button>
                                <span className={style.amout_value}>
                                  {item.count}
                                </span>
                                <button
                                  className={style.custom_count_button}
                                  onClick={() => {
                                    if (item.count <= 1) {
                                      return;
                                    } else {
                                      changeAmout(item.id, item.count - 1);
                                    }
                                  }}
                                >
                                  <PiMinus className={style.amout_button} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                    <li className={css.checkout_subtotal_price}>
                      <h4>
                        Subtotal : {valute == "Dollar" ? "$" : "€"}
                        {changeValute(totalPrice)}
                      </h4>
                    </li>
                  </ul>
                </div>
                {/* Address */}
                <div className={css.checkout_item_tile}>
                  <h3 className={css.checkout_item_title}>
                    2. Shipping & Billing Address{" "}
                  </h3>
                  <AddressForm />
                </div>
                {/* Shipping Method */}
                <div className={css.checkout_item_tile}>
                  <h3 className={css.checkout_item_title}>
                    3. Shipping Method
                  </h3>
                  <div className={css.checkout_shipping_radio_block}>
                    {shippingMethod.map(({ title, data, costs }, index) => {
                      return (
                        <div
                          key={index}
                          className={css.checkout_shipping_radio_tile}
                        >
                          <label
                            htmlFor={title}
                            className={css.checkout_shipping_radio_label}
                          >
                            <input
                              onChange={(event) => {
                                setShippCost(Number(event.target.value));
                                setShippTitle(title);
                              }}
                              id={title}
                              type="radio"
                              name="method"
                              value={changePrice(costs)}
                              className={css.radio_primary}
                            />
                            <div
                              className={
                                css.checkout_shipping_radio_label_context
                              }
                            >
                              <h4>{title}</h4>
                              <p className={css.shhiping_info}>{data}</p>
                            </div>
                          </label>
                          <p className={css.shhiping_info_price}>
                            {typeof costs != "number"
                              ? ""
                              : valute == "Dollar"
                              ? "$"
                              : "€"}
                            {typeof costs === "number"
                              ? changePrice(costs)
                              : costs}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Payment */}
                <div className={css.checkout_item_tile}>
                  <h3 className={css.checkout_item_title}>4. Payment Method</h3>
                </div>
              </div>
              <button onClick={generatePDF}>Завантажити PDF</button>
            </div>
          ) : (
            <h2 style={{ textDecoration: "underline", paddingBlock: 150 }}>
              <Link to={"/"}>
                Your shop cart is empty, please back to shopping
              </Link>
            </h2>
          )}
          <div className={css.checkout_total_tile}>
            <div className={css.checkout_promo_tile}>
              <h4 className={css.checkout_promo_title}>Apply a promo code</h4>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setPromo(promoName);
                  errorPromo();
                  event.target.reset();
                }}
              >
                <label htmlFor="promo" className={css.checkout_promo_label}>
                  <input
                    onChange={(event) => {
                      promoName = event.target.value;
                    }}
                    id="promo"
                    name="promo"
                    type="text"
                    placeholder="Enter promo code"
                    disabled={PROMO.find((item) => promo == item.name) && true}
                    className={css.checkout_promo_input}
                  />
                  <button
                    type="submit"
                    disabled={PROMO.find((item) => promo == item.name) && true}
                  >
                    Apply
                  </button>
                </label>
              </form>
              {promo && <span className={css.promo_error}>{error}</span>}
            </div>
            <div className={css.checkout_summary_tile}>
              <h2 className={css.checkout_summary_title}>Сomputation :</h2>
              <div className={css.checkout_summary_price_tile}>
                <p>
                  <b className={css.checkout_summary_options}>
                    Order :
                    <span>
                      {valute == "Dollar" ? "$" : "€"}
                      {changeValute(totalPrice)}
                    </span>
                  </b>
                </p>
                <p className={css.checkout_summary_options}>
                  Shipping costs :
                  <b>
                    {isNaN(shippCost) || shippCost == 0
                      ? ""
                      : valute == "Dollar"
                      ? "$"
                      : "€"}
                    {isNaN(shippCost) || shippCost == 0 ? (
                      <PiMinus></PiMinus>
                    ) : (
                      changePrice(shippCost)
                    )}
                  </b>
                </p>
                <p className={css.checkout_summary_options}>
                  Promo :
                  <b>
                    {PROMO.find(({ name }) => promo === name) ? (
                      promo
                    ) : (
                      <PiMinus />
                    )}
                  </b>
                </p>

                <p className={css.checkout_summary_options}>
                  Discount:
                  <b>
                    {PROMO.find((item) => promo === item.name) ? (
                      ` - ${promoValue}%`
                    ) : (
                      <PiMinus />
                    )}
                  </b>
                </p>
              </div>
              <div className={css.checkout_summary_total}>
                <h2>Orders total:</h2>
                <h3>
                  {valute == "Dollar" ? "$" : "€"}
                  {priceWithPromo}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
