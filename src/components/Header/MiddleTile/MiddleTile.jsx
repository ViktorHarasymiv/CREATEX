import { useEffect, useState } from "react";
import clsx from "clsx";

import css from "./MiddleTile.module.css";
import "./scrolled.css";

import Logo from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";
import Search from "./Search/Search";
import Favorite from "./Favorite/Favorite";
import Card from "./Cart/Cart";

import Line from "./Line/Line";
import ButtonBurger from "../../Mobile/ButtonBurger/ButtonBurger";

function MiddleTile({
  active,
  windowWidth,
  valute,
  heroOffset,
  switchSignIn,
  switchSignUp,
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      // className={
      //   scrollY <= heroOffset
      //     ? css.middle_tile_wrapper
      //     : css.middle_tile_wrapper_scrolled
      // }
      className={clsx(
        "middle_tile_wrapper",
        scrollY > heroOffset && "scrolled"
      )}
    >
      <div className="container">
        <div className={css.middle_tile}>
          <Logo />
          {!active && <Navigation />}
          {windowWidth > 1024.98 && <Search valute={valute} />}
          <div className={css.user_commerce}>
            <Favorite />
            <Line />
            <Card valute={valute} />
          </div>
          {active && (
            <ButtonBurger
              switchSignIn={switchSignIn}
              switchSignUp={switchSignUp}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MiddleTile;
