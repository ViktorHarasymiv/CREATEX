import React from "react";

import style from "./Reviews.module.css";

import starEmpty from "/icons/StarEmpty.svg";
import starSelect from "/icons/StarColor.svg";
import RatingBar from "./RatingBar";

export default function Statistics({ data }) {
  let totalSum = 0;
  let totalCount = 0;
  let countReccommended = 0;

  let five = 0;
  let four = 0;
  let three = 0;
  let two = 0;
  let one = 0;

  for (let key in data.rating) {
    let count = data.rating[key].length;
    let value = parseInt(key);

    countReccommended += value > 3 ? count : 0;
    five += value === 5 ? count : 0;
    four += value === 4 ? count : 0;
    three += value === 3 ? count : 0;
    two += value === 2 ? count : 0;
    one += value === 1 ? count : 0;

    totalSum += value * count;
    totalCount += count;
  }

  let average = totalSum / totalCount;

  const ratingData = [
    { stars: 5, count: five, color: "var(--success)" },
    { stars: 4, count: four, color: "#1fdf58" },
    { stars: 3, count: three, color: "#f2ea2b" },
    { stars: 2, count: two, color: "var(--warning)" },
    { stars: 1, count: one, color: "var(--danger)" },
  ];

  const maxCount = Math.max(...ratingData.map((r) => r.count));

  return (
    <div className={style.reviews_block}>
      <div className={style.counter_block}>
        <div className={style.total_rating_block}>
          <span className={style.reviews_lenght}>{totalCount} reviews</span>
          <div>
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <span key={index}>
                  <img
                    src={
                      currentRating <= average.toFixed(2)
                        ? starSelect
                        : starEmpty
                    }
                    alt="Rating star"
                    width={14}
                    height={14}
                  />
                </span>
              );
            })}
          </div>
        </div>
        <div className={style.reviews_reccommended}>
          <span>
            {countReccommended} out of {totalCount} (
            {((countReccommended / totalCount) * 100).toFixed(0)}%)
          </span>
          <p>Customers recommended this product</p>
        </div>
      </div>
      <div className={style.diagram_block}>
        {ratingData.map((r, index) => (
          <RatingBar
            key={index}
            stars={r.stars}
            count={r.count}
            maxCount={maxCount}
            color={r.color}
          />
        ))}
      </div>
    </div>
  );
}
