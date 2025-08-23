export const configRating = (value) => {
  let totalSum = 0;
  let totalCount = 0;
  let countReccommended = 0;

  let average = 0;

  let five = 0;
  let four = 0;
  let three = 0;
  let two = 0;
  let one = 0;

  for (let key in value) {
    let count = value[key].length;
    let parseValue = parseInt(key);

    countReccommended += parseValue > 3 ? count : 0;

    five += parseValue === 5 ? count : 0;
    four += parseValue === 4 ? count : 0;
    three += parseValue === 3 ? count : 0;
    two += parseValue === 2 ? count : 0;
    one += parseValue === 1 ? count : 0;

    totalSum += parseValue * count;
    totalCount += count;
  }

  average = totalSum / totalCount;

  return {
    result: {
      average,
      countReccommended,
      totalCount,
    },
    columns: {
      five,
      four,
      three,
      two,
      one,
    },
  };
};
