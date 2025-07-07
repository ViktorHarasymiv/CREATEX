import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

import css from "./SignUp.module.css";
import SignUpForm from "../Form/SignUpForm";
import LoggedWithMedia from "../Form/LoggedWithMedia";

function SignUp({ closePage, openSignIn }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closePage();
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Очистка обробника при анмаунті компонента
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closePage]);

  return (
    <div className="overlay">
      <div className="override">
        <button onClick={closePage} className="auth_form--close-button">
          <IoMdClose />
        </button>
        <div className="auth_title--tile">
          <h2 className="auth_form--title">Sign up</h2>
          <p className="auth_form--about">
            Registration takes less than a minute but gives you full control
            over your orders.
          </p>
        </div>
        <SignUpForm close={closePage} />
        <div className={css.form_change_modal}>
          <span>Already have an account?</span>{" "}
          <button type="button" onClick={openSignIn} className={css.accent}>
            Sign in
          </button>
        </div>
        <LoggedWithMedia />
      </div>
    </div>
  );
}

export default SignUp;
