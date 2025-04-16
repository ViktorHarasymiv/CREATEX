import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import css from "./Favorite.module.css";

import clsx from "clsx";

import { CiHeart } from "react-icons/ci";

function Favorite() {
  const location = useLocation();

  const buildLinkClass = (localPath) => {
    return clsx(
      css.favorite_icon,
      location.pathname === localPath && css.active
    );
  };
  return (
    <NavLink to={"/wishlist"} className={css.favorite_tile}>
      <CiHeart className={buildLinkClass("/wishlist")} />
      <div> + </div>
    </NavLink>
  );
}

export default Favorite;
