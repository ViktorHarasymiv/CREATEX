export function PriceWithSale(price, saleValue) {
  return price - price * (saleValue / 100);
}

function changePrice(price, saleValue, valute) {
  return changeValute(PriceWithSale(price, saleValue), valute);
}

export function Price(price, saleValue, valute, count) {
  if (count < 1) return price;
  else {
    return (changePrice(price, saleValue, valute) * count).toFixed(2);
  }
}

function changeValute(price, valute) {
  if (valute === "Dollar") {
    return price.toFixed(2);
  } else return (price * 0.876).toFixed(2);
}
