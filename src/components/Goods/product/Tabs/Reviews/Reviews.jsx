import React from "react";

import style from "./Reviews.module.css";

import Statistics from "./Statistics";
import Comments from "./Comments";

export default function Reviews({ data }) {
  return (
    <div className={style.tab_wrapper}>
      <Statistics data={data} />
      <Comments data={data}></Comments>
    </div>
  );
}
