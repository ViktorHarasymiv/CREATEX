import React, { useState, useEffect } from "react";

import TopTile from "../TopTile/TopTile";
import MiddleTile from "../MiddleTile/MiddleTile";
import UnderTile from "../UnderTile/UnderTile";

import css from "./Header.module.css";

function Header({
  switchSignIn,
  switchSignUp,
  openSubscribe,
  setValute,
  valute,
  heroOffset,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 1024.98) {
      setMobileMenu(true);
    } else {
      setMobileMenu(false);
    }
  }, [windowWidth]);

  return (
    <header className={css.header_component}>
      <TopTile
        active={mobileMenu}
        setValute={setValute}
        valute={valute}
        switchSignIn={switchSignIn}
        switchSignUp={switchSignUp}
      />
      <MiddleTile
        active={mobileMenu}
        windowWidth={windowWidth}
        valute={valute}
        heroOffset={heroOffset}
        switchSignIn={switchSignIn}
        switchSignUp={switchSignUp}
      />
      <UnderTile openSubscribe={openSubscribe} />
    </header>
  );
}

export default Header;
