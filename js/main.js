// Функция взята с сайта https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min < 0 || max < 0) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

getRandomInt(2, 4);


// Функция взята с сайта https://bobbyhadz.com/blog/javascript-get-random-float-in-range
function getRandomFloat(min, max, decimals) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min < 0 || max < 0) {
    return NaN;
  }

  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

getRandomFloat(3, 6, 4);
