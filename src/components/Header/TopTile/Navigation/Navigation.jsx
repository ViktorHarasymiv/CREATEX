import React from "react";

import { useLocation } from "react-router-dom";

import { NavLink } from "react-router-dom";

import css from "./Navigation.module.css";
import clsx from "clsx";

function Navigation() {
  const location = useLocation();

  const buildLinkClass = (localPath) => {
    return clsx(css.link, location.pathname === localPath && css.active);
  };

  return (
    <nav className={css.top_tile_nav}>
      <NavLink to="/delivery" className={buildLinkClass("/delivery")}>
        Delivery & returns
      </NavLink>
      <NavLink to="/track" className={buildLinkClass("/track")}>
        Track order
      </NavLink>
      <NavLink to="/blog" className={buildLinkClass("/blog")}>
        Blog
      </NavLink>
      <NavLink to="/contacts" className={buildLinkClass("/contacts")}>
        Contacts
      </NavLink>
    </nav>
  );
}

export default Navigation;
