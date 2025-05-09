import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromBasket } from "../../../../../redux/basketSlice";
import Button from "../../../../Button/Button";

import css from "./Modal.module.css";

import { IoMdClose } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlinePayments } from "react-icons/md";
import { Link } from "react-router-dom";

function Modal({ overlay, content, closePage, valute }) {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basketArr);

  const deleteItem = (id) => {
    dispatch(deleteFromBasket(id));
  };

  const totalPrice = basket.reduce(
    (sum, { price, salePrice }) => sum + (salePrice ? salePrice : price),
    0
  );

  const changeValute = () => {
    if (valute == "Dollar") {
      return totalPrice.toFixed(2);
    } else return (totalPrice * 0.876).toFixed(2);
  };

  return (
    <div style={overlay}>
      <div style={content}>
        <div className={css.cart_title_tile}>
          <span className={css.cart_title}>Your cart ({basket.length})</span>
          <IoMdClose onClick={closePage} className={css.close_icon} />
        </div>
        <ul className={css.cart_items_tile}>
          {basket.map((item) => {
            return (
              <li key={item.id} className={css.basket_product_tile}>
                <img
                  src={`/images/goods/${item.image[0]}`}
                  alt={item.title}
                  width={80}
                  height={80}
                />
                <div className={css.basket_product_info_tile}>
                  <div className={css.basket_tile_top}>
                    <h4>{item.title}</h4>
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
              <span>{changeValute()}</span>
            </b>
          </div>
          <Link onClick={closePage} to={"./checkout"}>
            <Button>
              <MdOutlinePayments
                style={{ marginRight: "9px", width: "22px", height: "22px" }}
              />
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Modal;
