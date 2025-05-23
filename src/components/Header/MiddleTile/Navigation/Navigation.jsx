import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import clsx from "clsx";

import css from "./Navigation.module.css";
import { useEffect } from "react";

function Navigation() {
  const location = useLocation();

  const buildLinkClass = (localPath) => {
    return clsx(css.middle_link, location.pathname === localPath && css.active);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav className={css.middle_tile_nav}>
      <NavLink to="/women" className={buildLinkClass("/women")}>
        Women
      </NavLink>
      <NavLink to="/men" className={buildLinkClass("/men")}>
        Men
      </NavLink>
      <NavLink to="/girls" className={buildLinkClass("/girls")}>
        Girl
      </NavLink>
      <NavLink to="/boys" className={buildLinkClass("/boys")}>
        Boy
      </NavLink>
      <NavLink to="/sale" className={buildLinkClass("/sale")}>
        Sale
      </NavLink>
    </nav>
  );
}

export default Navigation;
