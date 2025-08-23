import React from "react";
import starEmpty from "/icons/StarEmpty.svg";

import style from "./Reviews.module.css";

export default function RatingBar({ stars, count, maxCount, color }) {
  const percentage = (count / maxCount) * 100;

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
      <div className={style.star_block}>
        <span className={style.number_style}>{stars}</span>
        <img src={starEmpty} alt="Star" width={12} height={12} />
      </div>
      <div
        style={{
          backgroundColor: "#eee",
          width: "100%",
          height: "4px",
          borderRadius: "8px",
          overflow: "hidden",
          marginLeft: "16px",
          marginRight: "16px",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
            height: "100%",
          }}
        />
      </div>
      <span className={style.number_style}>{count}</span>
    </div>
  );
}
