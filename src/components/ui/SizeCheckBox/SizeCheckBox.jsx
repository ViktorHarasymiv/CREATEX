import React from "react";

import style from "./SizeCheckBox.module.css";

export default function SizeCheckBox({ sizeArray, size, error, action }) {
  return (
    <div className={style.size_select}>
      <form className={style.sizeForm}>
        {sizeArray.map((item, index) => {
          return (
            <label
              key={index}
              className={
                size == item
                  ? style.size_item_label_active
                  : style.size_item_label
              }
            >
              <span className={style.size_number}>{item}</span>

              <input type="radio" name="size" value={item} onChange={action} />
            </label>
          );
        })}
        {error && <span className={style.size_error}>Choose a size</span>}
      </form>
    </div>
  );
}
