import React, { useState } from "react";
import Modal from "../Modal/Modal";

import css from "./Burger.module.css";

import clsx from "clsx";

function ButtonBurger({ switchSignIn, switchSignUp }) {
  const [activeMenu, setActiveMenu] = useState(false);

  const buildLinkClass = () => {
    return clsx(css.navIcon, activeMenu === true && css.active);
  };

  const setOpen = () => {
    if (activeMenu) {
      setActiveMenu(false);
      document.querySelector("html").classList.remove("lock");
    } else {
      document.querySelector("html").classList.add("lock");
      setActiveMenu(true);
    }
  };

  return (
    <>
      <div onClick={setOpen} className={buildLinkClass({ activeMenu })}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {activeMenu && (
        <Modal
          setOpen={setOpen}
          switchSignIn={switchSignIn}
          switchSignUp={switchSignUp}
        />
      )}
    </>
  );
}

export default ButtonBurger;
