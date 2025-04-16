import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import css from "./Modal.module.css";
import style from "./../../Header/MiddleTile/Navigation/Navigation.module.css";
import clsx from "clsx";

function Navigation({ setOpen }) {
  const location = useLocation();

  const buildLinkClass = (localPath) => {
    return clsx(
      style.middle_link,
      location.pathname === localPath && style.active
    );
  };
  return (
    <nav className={css.middle_tile_nav}>
      <NavLink
        onClick={setOpen}
        to="/women"
        className={buildLinkClass("/women")}
      >
        Women
      </NavLink>
      <NavLink onClick={setOpen} to="/men" className={buildLinkClass("/men")}>
        Men
      </NavLink>
      <NavLink
        onClick={setOpen}
        to="/girls"
        className={buildLinkClass("/girls")}
      >
        Girls
      </NavLink>
      <NavLink onClick={setOpen} to="/boys" className={buildLinkClass("/boys")}>
        Boys
      </NavLink>
      <NavLink onClick={setOpen} to="/sale" className={buildLinkClass("/sale")}>
        Sale
      </NavLink>
    </nav>
  );
}

export default Navigation;
