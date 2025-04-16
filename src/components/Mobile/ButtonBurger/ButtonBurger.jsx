import React, { useState } from "react";
import Modal from "../Modal/Modal";

import css from "./Burger.module.css";

import clsx from "clsx";

function ButtonBurger() {
  const [activeMenu, setActiveMenu] = useState(false);

  const buildLinkClass = () => {
    return clsx(css.navIcon, activeMenu === true && css.active);
  };

  const setOpen = () => {
    if (activeMenu) {
      setActiveMenu(false);
    } else setActiveMenu(true);
  };

  return (
    <>
      <div onClick={setOpen} className={buildLinkClass({ activeMenu })}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {activeMenu && <Modal setOpen={setOpen} />}
    </>
  );
}

export default ButtonBurger;
