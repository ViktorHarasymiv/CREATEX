import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromBasket,
  setAmoutAction,
} from "../../../../../redux/basketSlice";
import Button from "../../../../Button/Button";

import css from "./Modal.module.css";

import { BsPlusLg } from "react-icons/bs";
import { PiMinus } from "react-icons/pi";

import { IoMdClose } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlinePayments } from "react-icons/md";

function Modal({ overlay, content, closePage, setOpen, valute }) {
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

  // CLOSE

  const openModal = (event) => {
    if (event.target === event.currentTarget) {
      document.querySelector("html").classList.remove("lock");
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        document.querySelector("html").classList.remove("lock");
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal]);

  // BODY

  console.log(basket);

  return (
    <div onClick={openModal} style={overlay}>
      <div style={content}>
        <div className={css.cart_title_tile}>
          <span className={css.cart_title}>Your cart ({basket.length})</span>
          <IoMdClose onClick={openModal} className={css.close_icon} />
        </div>
        <ul className={css.cart_items_tile}>
          {basket.map((item) => {
            return (
              <li key={item.id} className={css.basket_product_tile}>
                <img
                  src={item.image[0]}
                  alt={item.title}
                  width={80}
                  height={80}
                />
                <div className={css.basket_product_info_tile}>
                  <div className={css.basket_tile_top}>
                    <Link to={`/${item.gender}/${item.id}`}>
                      <h4 onClick={openModal}>{item.title}</h4>
                    </Link>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className={css.basket_delete_button}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                  <div className={css.basket_product_checked_info}>
                    <span className={css.basket_product_color}>
                      Color: {item.color}
                    </span>
                    <span className={css.basket_product_size}>
                      Size: {item.size}
                    </span>
                    <span className={css.basket_product_size}>
                      Price:{" "}
                      {(
                        changeValute(item.price, item.sale, item.salePrice) *
                        item.count
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className={css.basket_count_product}>
                    <div className={css.count_price_buttons}>
                      <button
                        className={css.custom_count_button}
                        onClick={() => {
                          if (item.count >= 50) {
                            return;
                          } else {
                            changeAmout(item.id, item.count + 1);
                          }
                        }}
                      >
                        <BsPlusLg className={css.amout_button} />
                      </button>
                      <span className={css.amout_value}>{item.count}</span>
                      <button
                        className={css.custom_count_button}
                        onClick={() => {
                          if (item.count <= 1) {
                            return;
                          } else {
                            changeAmout(item.id, item.count - 1);
                          }
                        }}
                      >
                        <PiMinus className={css.amout_button} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={css.total_tile}>
          <div className={css.subtotal_tile}>
            <span className={css.subtotal_text}>Subtotal:</span>
            <b className={css.total_price}>
              <span style={{ marginRight: "3px" }}>
                {valute == "Dollar" ? "$" : "€"}
              </span>
              <span>{changeValute(totalPrice)}</span>
            </b>
          </div>
          {basket.length > 0 && (
            <Link
              onClick={() => closePage()}
              to={"/checkout"}
              className={css.checkout_link}
            >
              <Button>
                <MdOutlinePayments
                  style={{ marginRight: "9px", width: "22px", height: "22px" }}
                />
                Checkout
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
