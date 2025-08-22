import React from "react";

import style from "./Reviews.module.css";

import starEmpty from "/icons/StarEmpty.svg";
import starSelect from "/icons/StarColor.svg";

export default function Comments({ data }) {
  return (
    <div className={style.reviews_content}>
      {data.reviews.map(({ data, name, rating, comment }, index) => {
        return (
          <div key={index} className={style.reviews_tile}>
            <div className={style.reviews_user_tile}>
              <div
                className={style.reviews_user_info}
                style={{ marginBottom: 16 }}
              >
                <span className={style.user_name}>{name}</span>
                <span className={style.number_style}>{data}</span>
              </div>
              <div>
                {[...Array(5)].map((_, index) => {
                  const currentRating = index + 1;
                  return (
                    <span key={index}>
                      <img
                        src={currentRating <= rating ? starSelect : starEmpty}
                        alt="Rating star"
                        width={14}
                        height={14}
                      />
                    </span>
                  );
                })}
              </div>
            </div>
            <div className={style.reviews_comment_tile}>
              <span className={style.comment_text}>{comment}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
