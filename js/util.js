// // Функция взята из интернета и доработана
// // Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
// function getRandomPositiveInteger (a, b) {
//   // Если переданы отрицительные числа, возвращаем NaN
//   if (a < 0 || b < 0) {
//     return NaN;
//   }

//   // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
//   // реализуем поддержку передачи минимального и максимального значения в любом порядке,
//   // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

//   // После нам нужно убедиться, что пользователь не передал дробные значения,
//   // для этого на всякий пожарный случай нижнюю границу диапазона
//   // мы округляем к ближайшему большему целому с помощью Math.ceil,
//   // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));

//   // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
//   // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
//   // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
//   const result = Math.random() * (upper - lower + 1) + lower;
//   // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа

//   // И в конце с помощью метода Math.floor мы округляем полученный результат,
//   // потому что Math.random() генерирует только дробные числа и ноль.
//   return Math.floor(result);
// }

// // Функция взята из интернета и доработана
// // Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

// function getRandomPositiveFloat (a, b, digits = 1) {
//   // Если переданы отрицительные числа, возвращаем NaN
//   if (a < 0 || b < 0 || digits < 0) {
//     return NaN;
//   }

//   // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
//   // реализуем поддержку передачи минимального и максимального значения в любом порядке,
//   // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max
//   const lower = Math.min(a, b);
//   const upper = Math.max(a, b);

//   // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
//   // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.
//   // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
//   const result = Math.random() * (upper - lower) + lower;

//   // И в конце с помощью метода toFixed любого числа в JavaScript
//   // указать требуемое количество знаков после точки.
//   // Метод возвращает строку, поэтому с помощью унарного плюса превращаем её в число
//   return +result.toFixed(digits);
// }

// const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// const getRandomArray = (elements) => elements.slice(0, getRandomPositiveInteger(1, elements.length - 1));
// import {getData} from './api.js';
// import {createPins} from './map.js';

const ALERT_SHOW_TIME = 5000;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');

// const mapForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const submitButton = adForm.querySelector('.ad-form__submit');
// const resetButton = adForm.querySelector('.ad-form__reset');

const showAlertMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// const showMessage = (message) => {
//   const Message = message.cloneNode(true);
//   document.body.append(Message);
//   const closeModal = () => {
//     Message.remove();
//     document.removeEventListener('keydown', onEscKeydown);
//   };
// };

// const activateMapForm = () => {
//   mapForm.classList.remove('map__filters--disabled');
// };

// const activateAdForm = () => {
//   adForm.classList.remove('ad-form--disabled');
// };

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);

  successMessage.addEventListener('click', () => {
    successMessage.remove();
  }, { once: true }
  );

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successMessage.remove();
    }
  }, { once: true }
  );
};

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);

  errorMessage.addEventListener('click', () => {
    errorMessage.remove();
  }, { once: true }
  );

  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  }, { once: true }
  );

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorMessage.remove();
    }
  }, { once: true }
  );
};

// const resetForm = () => {
//   resetButton.click();
// };

// resetButton.addEventListener('click', () => {
//   resetSlider();
//   resetMainPinMarker();
//   getData(createPins);
// });


export {showAlertMessage, blockSubmitButton, unblockSubmitButton, showSuccessMessage, showErrorMessage};
// export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray};
