import React from "react";

import css from "./Button.module.css";

function Button({ children, type, style, action }) {
  return (
    <button
      onClick={action}
      type={type}
      style={{ ...style }}
      className={css.button_primary}
    >
      <span className={css.button_context}>{children}</span>
    </button>
  );
}

export default Button;
