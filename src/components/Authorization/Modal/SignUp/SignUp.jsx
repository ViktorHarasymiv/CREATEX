import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

import css from "./SignUp.module.css";
import SignUpForm from "../Form/SignUpForm";
import LoggedWithMedia from "../Form/LoggedWithMedia";

function SignUp({ close, switchSignIn, switchSuccess, changeContent }) {
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

  return (
    <div className="overlay">
      <div onClick={(e) => e.stopPropagation()} className="override">
        <button onClick={close} className="auth_form--close-button">
          <IoMdClose />
        </button>
        <div className="auth_title--tile">
          <h2 className="auth_form--title">Sign up</h2>
          <p className="auth_form--about">
            Registration takes less than a minute but gives you full control
            over your orders.
          </p>
        </div>
        <SignUpForm
          close={close}
          switchSuccess={switchSuccess}
          changeContent={changeContent}
        />
        <div className={css.form_change_modal}>
          <span>Already have an account?</span>{" "}
          <button type="button" onClick={switchSignIn} className={css.accent}>
            Sign in
          </button>
        </div>
        <LoggedWithMedia />
      </div>
    </div>
  );
}

export default SignUp;
