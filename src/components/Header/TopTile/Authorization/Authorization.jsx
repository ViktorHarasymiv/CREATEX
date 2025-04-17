import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import css from "./Sign.module.css";

import SignIn from "./Modal/SignIn";
import Registration from "./Modal/Registration";

import { MdOutlineAccountCircle } from "react-icons/md";

const overlay = {
  zIndex: "9999",
  position: "fixed",

  top: "0",
  bottom: "0",
  left: "0",
  right: "0",

  backgroundColor: "rgba(0, 0, 0, 0.7)",
};

const override = {
  zIndex: "9999",
  display: "block",

  position: "fixed",
  top: "50%",
  right: "50%",
  transfotm: "translate(-50%, -50%)",
};

function Authorization() {
  const location = useLocation();

  const [signIn, setSignin] = useState(false);
  const [registration, setRegistration] = useState(false);

  const openModalPageSignIn = () => {
    if (location.pathname !== "/SignIn" && signIn != true) {
      setSignin(true);
      setRegistration(false);
    } else {
      setSignin(false);
    }
  };

  const openModalPageRegistration = () => {
    if (location.pathname !== "/registration" && registration != true) {
      setRegistration(true);
      setSignin(false);
    } else {
      setRegistration(false);
    }
  };

  return (
    <div className={css.authorization_tile}>
      <MdOutlineAccountCircle
        style={{ fontSize: "18px", marginRight: "8px  " }}
      />
      <Link onClick={openModalPageSignIn}>Log In</Link>

      {/* MODAL */}
      {signIn && (
        <SignIn
          overlay={overlay}
          content={override}
          closePage={openModalPageSignIn}
        />
      )}
      <span style={{ marginInline: "5px" }}>/</span>
      <Link onClick={openModalPageRegistration}>Sign Up</Link>

      {/* MODAL */}
      {registration && (
        <Registration
          overlay={overlay}
          content={override}
          closePage={openModalPageRegistration}
        />
      )}
    </div>
  );
}

export default Authorization;
