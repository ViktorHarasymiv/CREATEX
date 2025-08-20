import React from "react";

import style from "./ColorCheckBox.module.css";

export default function ColorCheckBox({
  colorArray,
  color,
  colorError,
  action,
}) {
  return (
    <div className={style.colors_select}>
      {colorArray.map((item, index) => {
        return (
          <div
            onClick={() => action(item)}
            key={index}
            className={style.color_select_tile}
            style={{
              border: `1.5px solid ${
                color == item ? "var(--primary)" : "var(--gray-400)"
              }`,
            }}
          >
            <div
              className={style.color_tile}
              key={index}
              style={{
                backgroundColor: item,
                width: "16px",
                height: "16px",
              }}
            ></div>
          </div>
        );
      })}
      <span className={style.error_color}>
        {colorError && <span className={style.color_text}>Choose a color</span>}
      </span>
    </div>
  );
}
