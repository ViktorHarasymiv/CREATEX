import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import clsx from "clsx";

import css from "./Navigation.module.css";

function Navigation() {
  const location = useLocation();

  const buildLinkClass = (localPath) => {
    return clsx(css.middle_link, location.pathname === localPath && css.active);
  };

  return (
    <nav className={css.middle_tile_nav}>
      <NavLink to="/women" className={buildLinkClass("/women")}>
        Women
      </NavLink>
      <NavLink to="/men" className={buildLinkClass("/men")}>
        Men
      </NavLink>
      <NavLink to="/girls" className={buildLinkClass("/girls")}>
        Girls
      </NavLink>
      <NavLink to="/boys" className={buildLinkClass("/boys")}>
        Boys
      </NavLink>
      <NavLink to="/sale" className={buildLinkClass("/sale")}>
        Sale
      </NavLink>
    </nav>
  );
}

export default Navigation;
