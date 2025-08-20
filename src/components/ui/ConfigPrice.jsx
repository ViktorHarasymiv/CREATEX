import React from "react";

// Utils

import { Price } from "../../utils/configPrice";

export default function ConfigPrice({
  style,
  price,
  count,
  sale,
  saleValue,
  valute,
}) {
  return (
    <div>
      {sale ? (
        <div style={{ ...style }}>
          <span
            style={{
              color: "var(--danger)",
              lineHeight: "1",
            }}
          >
            {valute == "Dollar" ? "$" : "€"}
            {Price(price, saleValue, valute, count)}
          </span>

          <span
            style={{
              marginLeft: "14px",
              textDecoration: "line-through",
              fontSize: "18px",
              color: "var(--gray-700)",
              fontWeight: "400",
            }}
          >
            {valute == "Dollar" ? "$" : "€"}
            {Price(price, (saleValue = 0), valute, count)}
          </span>
        </div>
      ) : (
        <span style={{ ...style }}>
          {valute == "Dollar" ? "$" : "€"}
          {Price(price, (saleValue = 0), valute, count)}
        </span>
      )}
    </div>
  );
}
