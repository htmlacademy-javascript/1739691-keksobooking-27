import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray} from './util.js';

const RANDOM_OBJECTS = 10;

const LOCATION = {
  minX: 35.65000,
  maxX: 35.70000,
  minY: 139.70000,
  maxY: 139.80000,
};

const DIGITS = 5;

const ROOM_PRICE_MIN = 3000;
const ROOM_PRICE_MAX = 60000;

const ROOM_AMOUNT_MIN = 1;
const ROOM_AMOUNT_MAX = 5;

const ROOM_GUEST_MIN = 1;
const ROOM_GUEST_MAX = 4;

const getLocation = () => ({
  lat: getRandomPositiveFloat(LOCATION.minX, LOCATION.maxX, DIGITS),
  lng: getRandomPositiveFloat(LOCATION.minY, LOCATION.maxY, DIGITS)
});

const offer = {
  title: ['Лучшее предложение', '5 минут до центра', 'Новинка', 'Низкая цена', 'Предложение недели'],
  type: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  address: '{{location.lat}}, {{location.lng}}',
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: ['Описание1', 'Описание2', 'Описание3', 'Описание4', 'Описание5', 'Описание6', 'Описание7'],
  photos: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg']
};

const createAuthor = (index) => ({
  avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`
});

const createObject = (index) => {
  const {lat, lng} = getLocation();

  return {
    author: {
      avatar: createAuthor(index)
    },
    offer: {
      title: getRandomArrayElement(offer.title),
      type: getRandomArrayElement(offer.type),
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(ROOM_PRICE_MIN, ROOM_PRICE_MAX),
      rooms: getRandomPositiveInteger(ROOM_AMOUNT_MIN, ROOM_AMOUNT_MAX),
      guest: getRandomPositiveInteger(ROOM_GUEST_MIN, ROOM_GUEST_MAX),
      checkin: getRandomArrayElement(offer.checkin),
      checkout: getRandomArrayElement(offer.checkout),
      features: getRandomArray(offer.features),
      description: getRandomArrayElement(offer.description),
      photos: getRandomArrayElement(offer.photos)
    },
    location: {
      lat: `${lat}`,
      lng: `${lng}`
    }
  };
};

const createObjects = () => Array.from({length: RANDOM_OBJECTS}, (_, index) => createObject(index + 1));

export {createObjects};
