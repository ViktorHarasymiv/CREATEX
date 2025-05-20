import { useState, useRef, useEffect } from "react";
import html2pdf from "html2pdf.js";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  updateOrder,
  updateAddress,
  updatePromo,
} from "../../redux/orderSlice";
import { deleteFromBasket, setAmoutAction } from "../../redux/basketSlice";

import css from "./Checkout.module.css";
import style from "../Header/MiddleTile/Cart/Basket/Modal.module.css";

import { BsPlusLg } from "react-icons/bs";
import { PiMinus } from "react-icons/pi";

import { AiOutlineDelete } from "react-icons/ai";

import Sign_In from "./icons/Person.png";

import HistoryBar from "../HistoryBar/HistoryBar";

function Checkout({ valute }) {
  const dispatch = useDispatch();

  /* SLICE */

  const basket = useSelector((state) => state.basket.basketArr);
  const faktureFile = useSelector((state) => state.order.fakture);
  const PROMO = useSelector((state) => state.order.promo);
  const shippingMethod = useSelector((state) => state.order.shippingMethod);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (basket.length > 0) {
      dispatch(updateOrder({ ...basket }));
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

  /* SHIPPING */

  const [address, setAddrees] = useState(null);

  /* ADDRESS */
  useEffect(() => {
    if (address == null) {
      return;
    } else {
      dispatch(updateAddress(address));
    }
  }, [address]);

  /* PROMO */
  let promoName = "";

  const [promoValue, setPromoValue] = useState(null);
  const [promo, setPromo] = useState(null);

  const promoChacked = () => {
    {
      PROMO.map((item) => {
        if (item.name == promo) {
          setPromoValue(item.value);
        }
      });
    }
    return;
  };

  const priceWithPromo = promoValue
    ? (
        changeValute(totalPrice) -
        (changeValute(totalPrice) * promoValue) / 100
      ).toFixed(2)
    : changeValute(totalPrice);

  useEffect(() => {
    if (promo == null) {
      return;
    } else {
      promoChacked();
      dispatch(updatePromo(promo));
    }
  }, [promo]);

  return (
    <>
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className={css.checkout_wrapper}>
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
                <ul className={css.checkout_item_wrapper}>
                  <li>
                    <button
                      onClick={() => {
                        setAddrees({
                          name: "Viktor",
                          surname: "Harasymiv",
                          telephone: "+48962982155",
                        });
                      }}
                    >
                      Set address
                    </button>
                  </li>
                </ul>
              </div>
              {/* Shipping */}
              <div className={css.checkout_item_tile}>
                <h3 className={css.checkout_item_title}>3. Shipping Method</h3>
                <div>
                  {shippingMethod.map(({ title, data, costs }, index) => {
                    return (
                      <div key={index} className={css.checkout_shipping_change}>
                        <div className={css.checkout_shipping_radio_tile}>
                          <input
                            id={title}
                            type="radio"
                            name="method"
                            value={title}
                            className={css.radio_primary}
                          />
                          <label htmlFor={title}>{title}</label>
                        </div>
                        <p>{data}</p>
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
          <div className={css.checkout_total_tile}>
            <div className={css.checkout_promo_tile}>
              <h4 className={css.checkout_promo_title}>Apply a promo code</h4>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setPromoValue(null);
                  setPromo(promoName);
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
                    className={css.checkout_promo_input}
                  />
                  <button>Apply</button>
                </label>
              </form>
            </div>
            <div className={css.checkout_summary_tile}>
              <h2 className={css.checkout_summary_title}>Order totals</h2>
              <div className={css.checkout_summary_price_tile}>
                <p>
                  <b className={css.checkout_summary_options}>
                    Order total:
                    <span>
                      {valute == "Dollar" ? "$" : "€"}
                      {changeValute(totalPrice)}
                    </span>
                  </b>
                </p>
                <p className={css.checkout_summary_options}>
                  Shipping costs:{" "}
                  <span>
                    <PiMinus></PiMinus>
                  </span>
                </p>
                <p className={css.checkout_summary_options}>
                  Promo:{" "}
                  <span>
                    {PROMO.find((item) => promo === item.name) ? (
                      promo
                    ) : (
                      <PiMinus />
                    )}
                  </span>
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
                <h2>Order total:</h2>
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
