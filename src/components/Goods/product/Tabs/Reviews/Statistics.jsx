import { configRating } from "../../../../../utils/configRating";

import style from "./Reviews.module.css";

import starEmpty from "/icons/StarEmpty.svg";
import starSelect from "/icons/StarColor.svg";
import RatingBar from "./RatingBar";

export default function Statistics({ data }) {
  const configData = configRating(data.rating);

  const ratingData = [
    { stars: 5, count: configData.columns.five, color: "var(--success)" },
    { stars: 4, count: configData.columns.four, color: "#1fdf58" },
    { stars: 3, count: configData.columns.three, color: "#f2ea2b" },
    { stars: 2, count: configData.columns.two, color: "var(--warning)" },
    { stars: 1, count: configData.columns.one, color: "var(--danger)" },
  ];

  const maxCount = Math.max(...ratingData.map((r) => r.count));

  return (
    <div className={style.reviews_block}>
      <div className={style.counter_block}>
        <div className={style.total_rating_block}>
          <span className={style.reviews_lenght}>
            {configData.result.totalCount} reviews
          </span>
          <div>
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 0;
              return (
                <span key={index}>
                  <img
                    src={
                      currentRating <= configData.result.average.toFixed(2)
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
            {configData.result.countReccommended} out of{" "}
            {configData.result.totalCount}(
            {(
              (configData.result.countReccommended /
                configData.result.totalCount) *
              100
            ).toFixed(0)}
            %)
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
