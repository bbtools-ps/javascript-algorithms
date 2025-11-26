const getMaxDecimals = (numbersArr) => {
  let maxDecimals = 0;
  for (let i = 0; i < numbersArr.length; i++) {
    let decimals = numbersArr[i].toString().split('.');
    maxDecimals = decimals[1].length > maxDecimals ? decimals[1].length : maxDecimals;
  }
  return maxDecimals;
}

const sumNumbers = (numbersArr) => {
  const maxDecimals = getMaxDecimals(numbersArr);
  const result = numbersArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  return Number(result.toFixed(maxDecimals));
}

console.log(sumNumbers([0.1, 0.2, 0.005]))
