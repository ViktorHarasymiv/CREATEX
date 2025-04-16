import React from "react";

import css from "./Modal.module.css";

import Navigation from "./Navigation";

const overlay = {
  zIndex: "9999",
  position: "fixed",

  top: "0",
  bottom: "0",
  left: "0",
  right: "0",

  backgroundColor: "rgba(0, 0, 0, 0.7)",
};

function Modal({ setOpen }) {
  return (
    <div style={overlay}>
      <div className={css.content}>
        <button onClick={setOpen}>xx</button>
        <Navigation setOpen={setOpen}></Navigation>
      </div>
    </div>
  );
}

export default Modal;
