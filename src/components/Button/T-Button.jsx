import React from "react";

import css from "./Button.module.css";

function T_Button({ children }) {
  return (
    <button className={css.button_transparent}>
      <span className={css.button_context_t}>{children}</span>
    </button>
  );
}

export default T_Button;
