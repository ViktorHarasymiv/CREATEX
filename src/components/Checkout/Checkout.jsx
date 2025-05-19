import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { deleteFromBasket, setAmoutAction } from "../../redux/basketSlice";

import css from "./Checkout.module.css";

import Sign_In from "./icons/Person.png";

import HistoryBar from "../HistoryBar/HistoryBar";

function Checkout() {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basketArr);

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
                <ul className={css.checkout_item_wrapper}>
                  {basket.map((item) => {
                    return <li>{item.title}</li>;
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
          </div>
          <div className={css.checkout_total_tile}>123</div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
