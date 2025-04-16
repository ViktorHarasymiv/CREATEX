import React, { useState } from "react";

import { BsCart2 } from "react-icons/bs";

import css from "./Cart.module.css";
import Modal from "./Modal/Modal";

const overlay = {
  zIndex: "9999",
  position: "fixed",

  top: "0",
  bottom: "0",
  left: "0",
  right: "0",

  backgroundColor: "rgba(0, 0, 0, 0.7)",
};
const content = {
  zIndex: "9999",
  display: "flex",
  flexDirection: "column",

  position: "fixed",
  right: "0",

  top: "0",
  bottom: "0",

  maxWidth: "352px",
  width: "100%",

  transfotm: "translate(-50%, -50%)",

  color: "var(--gray-900)",
  backgroundColor: "rgb(255, 255, 255)",

  paddingBlock: "32px",
};

function Card() {
  const [openCart, setOpenCart] = useState(false);

  const openModal = () => {
    if (openCart) {
      setOpenCart(false);
    } else setOpenCart(true);
  };
  return (
    <>
      <div onClick={openModal} className={css.cart_tile}>
        <BsCart2 className={css.cart_icon} />
        <div className={css.value_cart_tile}> + </div>
      </div>
      {openCart && (
        <Modal overlay={overlay} content={content} closePage={openModal} />
      )}
    </>
  );
}

export default Card;
