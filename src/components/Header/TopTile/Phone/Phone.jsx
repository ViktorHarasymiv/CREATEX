import React from "react";

import css from "./Phone.module.css";

function Phone() {
  return (
    <div className={css.phone_tile}>
      <span className={css.phone_context_text}>Available 24/7 at </span>
      <a className={css.phone_number} href="tel:(405) 555-0128">
        (405) 555-0128
      </a>
    </div>
  );
}

export default Phone;
