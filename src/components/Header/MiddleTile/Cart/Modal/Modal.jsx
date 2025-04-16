import React from "react";
import Button from "../../../../Button/Button";

import css from "./Modal.module.css";

import { IoMdClose } from "react-icons/io";

import { MdOutlinePayments } from "react-icons/md";
import { Link } from "react-router-dom";

function Modal({ overlay, content, closePage }) {
  return (
    <div style={overlay}>
      <div style={content}>
        <div className={css.cart_title_tile}>
          <span className={css.cart_title}>Your cart (+)</span>
          <IoMdClose onClick={closePage} className={css.close_icon} />
        </div>
        <div className={css.cart_items_tile}></div>
        <div className={css.total_tile}>
          <div className={css.subtotal_tile}>
            <span className={css.subtotal_text}>Subtotal:</span>
            <b className={css.total_price}>
              <span style={{ marginRight: "3px" }}>$</span>
              <span>000.00</span>
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
