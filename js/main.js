// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveInteger (a, b) {
  // Если переданы отрицительные числа, возвращаем NaN
  if (a < 0 || b < 0) {
    return NaN;
  }

  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

  // После нам нужно убедиться, что пользователь не передал дробные значения,
  // для этого на всякий пожарный случай нижнюю границу диапазона
  // мы округляем к ближайшему большему целому с помощью Math.ceil,
  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower + 1) + lower;
  // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа

  // И в конце с помощью метода Math.floor мы округляем полученный результат,
  // потому что Math.random() генерирует только дробные числа и ноль.
  return Math.floor(result);
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveFloat (a, b, digits = 1) {
  // Если переданы отрицительные числа, возвращаем NaN
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }

  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower) + lower;

  // И в конце с помощью метода toFixed любого числа в JavaScript
  // указать требуемое количество знаков после точки.
  // Метод возвращает строку, поэтому с помощью унарного плюса превращаем её в число
  return +result.toFixed(digits);
}

const RANDOM_OBJECTS = 10;

const LOCATION = {
  x: getRandomPositiveFloat(35.65000, 35.70000, 5),
  y: getRandomPositiveFloat(139.70000, 139.80000, 5)
};

const ROOM_PRICE_MIN = 3000;
const ROOM_PRICE_MAX = 60000;

const ROOM_AMOUNT_MIN = 1;
const ROOM_AMOUNT_MAX = 5;

const ROOM_GUEST_MIN = 1;
const ROOM_GUEST_MAX = 4;


const OFFER = {
  title: ['Лучшее предложение', '5 минут до центра', 'Новинка', 'Низкая цена', 'Предложение недели'],
  type: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  address: '{{location.lat}}, {{location.lng}}',
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: ['Описание1', 'Описание2', 'Описание3', 'Описание4', 'Описание5', 'Описание6', 'Описание7'],
  photos: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg']
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createAuthor = (index) => ({
  avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`
});

const createObject = (index) => ({
  author: {
    avatar: createAuthor(index)
  },
  offer: {
    title: getRandomArrayElement(OFFER.title),
    type: getRandomArrayElement(OFFER.type),
    address: `${LOCATION.x}, ${LOCATION.y}`,
    price: getRandomPositiveInteger (ROOM_PRICE_MIN, ROOM_PRICE_MAX),
    rooms: getRandomPositiveInteger(ROOM_AMOUNT_MIN, ROOM_AMOUNT_MAX),
    guest: getRandomPositiveInteger(ROOM_GUEST_MIN, ROOM_GUEST_MAX),
    checkin: getRandomArrayElement(OFFER.checkin),
    checkout: getRandomArrayElement(OFFER.checkout),
    features: getRandomArrayElement(OFFER.features),
    description: getRandomArrayElement(OFFER.description),
    photos: getRandomArrayElement(OFFER.photos)
  },
  location: {
    lat: `${LOCATION.x}`,
    lng: `${LOCATION.y}`
  }
});

const createObjects = Array.from({length: RANDOM_OBJECTS}, (_, index) => createObject(index + 1));

createObjects();
