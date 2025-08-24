import { configRating } from "../../../utils/configRating";

import starEmpty from "../../../../public/icons/StarEmpty.svg";
import starSelect from "../../../../public/icons/StarColor.svg";

export default function Rating({ value, style }) {
  const configData = configRating(value);

  console.log(configData.result.average.toFixed(2));

  return (
    <div className={style.rating_tile} style={style}>
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <span key={index}>
            <img
              src={
                currentRating <= configData.result.average.toFixed(2)
                  ? starSelect
                  : starEmpty
              }
              alt="Stars"
              width={14}
              height={14}
            />
          </span>
        );
      })}
    </div>
  );
}
