import React, { useState } from "react";

import style from "./Rating.module.css";

import starEmpty from "../../../../public/icons/StarEmpty.svg";
import starSelect from "../../../../public/icons/StarColor.svg";

export default function Rating({ value, rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div className={style.rating_tile}>
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <span key={index}>
            <img
              src={
                currentRating <= (hover || rating || value)
                  ? starSelect
                  : starEmpty
              }
              alt=""
              width={14}
              height={14}
              onClick={() => setRating(currentRating)}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            />
          </span>
        );
      })}
    </div>
  );
}
