import css from "./SignIn.module.css";

import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

import LoggedWithMedia from "../Form/LoggedWithMedia";
import SignInForm from "../Form/SignInForm";

function SignIn({ close, switchSignUp, switchSuccess, changeContent }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Очистка обробника при анмаунті компонента
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [close]);

  const overlayClose = (event) => {
    event.stopPropagation();
    close();
  };

  return (
    <div onClick={overlayClose} className="overlay">
      <div onClick={(e) => e.stopPropagation()} className="override">
        <button onClick={close} className="auth_form--close-button">
          <IoMdClose />
        </button>
        <div className="auth_title--tile">
          <h2 className="auth_form--title">Sign In</h2>
          <p className="auth_form--about">
            Sign in to your account using email and password provided during
            registration.
          </p>
        </div>
        <SignInForm
          close={close}
          switchSuccess={switchSuccess}
          changeContent={changeContent}
        />
        <div className={css.form_change_modal}>
          <span>Don't have an account?</span>{" "}
          <button type="button" onClick={switchSignUp} className={css.accent}>
            Sign up
          </button>
        </div>
        <LoggedWithMedia />
      </div>
    </div>
  );
}

export default SignIn;
