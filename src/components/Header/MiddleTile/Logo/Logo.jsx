import React from "react";

import css from "./Logo.module.css";

import CREATEX from "../../../../images/icons/logo.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link className={css.logo_box} to={"/"}>
      <img className={css.logo} src={CREATEX} alt="CREATEX" />
    </Link>
  );
}

export default Logo;
