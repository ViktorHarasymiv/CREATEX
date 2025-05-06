import React from "react";

import css from "./MiddleTile.module.css";

import Logo from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";
import Search from "./Search/Search";
import Favorite from "./Favorite/Favorite";
import Card from "./Cart/Cart";

import Line from "./Line/Line";
import ButtonBurger from "../../Mobile/ButtonBurger/ButtonBurger";

function MiddleTile({ active, windowWidth }) {
  return (
    <div className={css.middle_tile_wrapper}>
      <div className="container">
        <div className={css.middle_tile}>
          <Logo />
          {!active && <Navigation />}
          {windowWidth > 599.98 && <Search />}
          <div className={css.user_commerce}>
            <Favorite />
            <Line />
            <Card />
          </div>
          {active && <ButtonBurger />}
        </div>
      </div>
    </div>
  );
}

export default MiddleTile;
