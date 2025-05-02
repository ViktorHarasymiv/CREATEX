import React from "react";
import { Link, useLocation } from "react-router-dom";
import css from "./PageBar.module.css";

import Home from "./icons/Home.svg";

function PageBar() {
  const location = useLocation();

  return (
    <div className={css.history_bar}>
      <div className="container">
        <ul className={css.history_list}>
          <li className={css.history_item}>
            <Link to="/">
              <img src={Home} alt="Home" />
            </Link>
          </li>
          <li className={css.history_item}>
            <Link to={location.pathname} className={css.history_link}>
              <span>
                {location.pathname.charAt(1).toUpperCase() +
                  location.pathname.slice(2)}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PageBar;
