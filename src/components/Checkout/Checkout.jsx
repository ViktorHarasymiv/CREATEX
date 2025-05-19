import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { deleteFromBasket, setAmoutAction } from "../../redux/basketSlice";

import css from "./Checkout.module.css";
import style from "../Header/MiddleTile/Cart/Basket/Modal.module.css";

import { BsPlusLg } from "react-icons/bs";
import { PiMinus } from "react-icons/pi";

import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlinePayments } from "react-icons/md";

import Sign_In from "./icons/Person.png";

import HistoryBar from "../HistoryBar/HistoryBar";
import PdfGenerator from "./MyOrder";

function Checkout({ overlay, content, closePage, setOpen, valute }) {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basketArr);

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

  const openModal = (event) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  };

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
                              <h4 onClick={openModal}>{item.title}</h4>
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
                  <li>
                    <h4>Subtotal : </h4>
                  </li>
                </ul>
                <div className={css.checkout_subtotal_title}></div>
              </div>
              {/* Address */}
              <div className={css.checkout_item_tile}>
                <h3 className={css.checkout_item_title}>
                  2. Shipping & Billing Address
                </h3>
              </div>
              {/* Shipping */}
              <div className={css.checkout_item_tile}>
                <h3 className={css.checkout_item_title}>3. Shipping Method</h3>
              </div>
              {/* Payment */}
              <div className={css.checkout_item_tile}>
                <h3 className={css.checkout_item_title}>4. Payment Method</h3>
              </div>
            </div>
            <button onClick={generatePDF}>Завантажити PDF</button>
          </div>
          <div className={css.checkout_total_tile}>123</div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
