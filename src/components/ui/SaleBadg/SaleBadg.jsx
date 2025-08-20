import React from "react";

import style from "./SaleBadg.module.css";

export default function SaleBadg({ value }) {
  return <div className={style.sale_band}>-{value}%</div>;
}
