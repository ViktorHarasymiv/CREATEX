import * as React from "react";

import css from "./TopTile.module.css";

import Phone from "./Phone/Phone";
import Navigation from "./Navigation/Navigation";
import Currency from "./Сurrency/Сurrency";
import Authorization from "./Authorization/Authorization";

function TopTile({ active, setValute, valute }) {
  return (
    <div className={css.top_tile_wrapper}>
      <div className="container">
        <div className={css.top_tile}>
          {!active && (
            <>
              <Phone />
              <Navigation />
            </>
          )}
          <Currency setValute={setValute} valute={valute} />
          <Authorization />
        </div>
      </div>
    </div>
  );
}

export default TopTile;
