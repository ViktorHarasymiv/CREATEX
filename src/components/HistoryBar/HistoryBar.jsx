import React from "react";
import { Link, useLocation } from "react-router-dom";
import css from "./PageBar.module.css";

import arrow from "./icons/Right-chevron.svg";

import Home from "./icons/Home.svg";

function PageBar() {
  const location = useLocation();

  const segment = location.pathname.split("/");

  return (
    <div className={css.history_bar}>
      <div className="container">
        <ul className={css.history_list}>
          <li className={css.history_item}>
            <Link to="/">
              <img src={Home} alt="Home" width={16} height={16} />
            </Link>
          </li>
          <li className={css.history_item}>
            <Link to={location.pathname} className={css.history_link}>
              <div className={css.history_link_list}>
                {segment.map((item, index) => (
                  <React.Fragment key={index}>
                    {item}
                    {index < segment.length - 1 && (
                      <img
                        className={css.arrow_ico}
                        src={arrow}
                        alt="Arrow Icon"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PageBar;
