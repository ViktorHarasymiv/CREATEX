import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./authorization.css";

import SignIn from "./Modal/SignIn/SignIn";
import SignUp from "./Modal/SignUp/SignUp";

import { MdOutlineAccountCircle } from "react-icons/md";

function Authorization() {
  // const location = useLocation();

  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const openModalPageSignIn = () => {
    if (signIn != true) {
      document.querySelector("html").classList.add("lock");
      setSignIn(true);
      setSignUp(false);
    } else {
      document.querySelector("html").classList.remove("lock");
      setSignIn(false);
    }
  };

  const openModalPageRegistration = () => {
    if (signUp != true) {
      document.querySelector("html").classList.add("lock");
      setSignUp(true);
      setSignIn(false);
    } else {
      document.querySelector("html").classList.remove("lock");
      setSignUp(false);
    }
  };

  return (
    <div className="authorization_tile">
      <MdOutlineAccountCircle
        style={{ fontSize: "18px", marginRight: "8px  " }}
      />
      <Link onClick={openModalPageSignIn}>Log In</Link>

      {/* MODAL */}
      {signIn && (
        <SignIn
          openSignUp={openModalPageRegistration}
          closePage={openModalPageSignIn}
        />
      )}
      <span style={{ marginInline: "5px" }}>/</span>
      <Link onClick={openModalPageRegistration}>Sign Up</Link>

      {/* MODAL */}
      {signUp && (
        <SignUp
          openSignIn={openModalPageSignIn}
          closePage={openModalPageRegistration}
        />
      )}
    </div>
  );
}

export default Authorization;
