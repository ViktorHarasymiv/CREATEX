import React from "react";

import css from "./Button.module.css";

function Button({ children, type, height }) {
  return (
    <button
      type={type}
      style={{ maxHeight: height }}
      className={css.button_primary}
    >
      <span className={css.button_context}>{children}</span>
    </button>
  );
}

export default Button;
