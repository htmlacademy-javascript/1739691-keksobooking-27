import {blockSubmitButton, unblockSubmitButton, showSuccessMessage, showErrorMessage} from './util.js';
import {sendData} from './api.js';
import {resetPhotos} from './avatar.js';
import {resetFilters} from './filters.js';

const userForm = document.querySelector('.ad-form');
const roomNumber = userForm.querySelector('#room_number');
const roomCapacity = userForm.querySelector('#capacity');
const title = userForm.querySelector('#title');
const price = userForm.querySelector('#price');
const type = userForm.querySelector('#type');
const checkInTime = userForm.querySelector('#timein');
const checkOutTime = userForm.querySelector('#timeout');
const slider = document.querySelector('.ad-form__slider');
const reset = document.querySelector('.ad-form__reset');

const apartPrice = {
  minPrice: {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  },
  maxPrice: 100000
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: apartPrice.maxPrice
  },
  start: price.placeholder,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.noUiSlider.on('update', () => {
  price.value = slider.noUiSlider.get();
});

const roomsToGuest = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const guestToRooms = {
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3'],
  0: ['100']
};

const validateTitle = (value) =>
  value.length >= 30 && value.length <= 100;

const getTitleErrorMessage = () => `Длинна заголовка должна быть от 30 до 100 символов. Сейчас ${title.value.length} символов`;


const validatePrice = () => price.value >= apartPrice.minPrice[type.value];

const getPriceErrorMessage = () => `Введите стоимость от ${apartPrice.minPrice[type.value]} до ${apartPrice.maxPrice}`;

const validateCapacity = () => roomsToGuest[roomNumber.value].includes(roomCapacity.value);

const getRoomsErrorMessage = () =>
  `Указанное колличество комнат вмещает ${roomsToGuest[roomNumber.value].join(' или ')} гостей!`;

const getGuestsErrorMessage = () =>
  `Указанному колличеству гостей необходимо ${guestToRooms[roomCapacity.value].join(' или ')} комнаты!`;

const onRoomTypeChange = () => {
  price.placeholder = apartPrice.minPrice[type.value];
  price.min = apartPrice.minPrice[type.value];
  slider.noUiSlider.updateOptions({
    start: price.placeholder,
  });
};

const onCheckInTimeChange = () => {
  checkInTime.value = checkOutTime.value;
};

const onCheckOutTimeChange = () => {
  checkOutTime.value = checkInTime.value;
};

const pristine = new Pristine(userForm, {
  classTo: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
}, true
);

pristine.addValidator(
  title,
  validateTitle,
  getTitleErrorMessage
);

pristine.addValidator(
  price,
  validatePrice,
  getPriceErrorMessage
);

pristine.addValidator(
  roomNumber,
  validateCapacity,
  getRoomsErrorMessage
);

pristine.addValidator(
  roomCapacity,
  validateCapacity,
  getGuestsErrorMessage
);

const onRoomsNumberChange = () => {
  pristine.validate(roomCapacity);
  pristine.validate(roomNumber);
};

const onGuestsNumberChange = () => {
  pristine.validate(roomNumber);
  pristine.validate(roomCapacity);
};

roomNumber.addEventListener('change', onRoomsNumberChange);
roomCapacity.addEventListener('change', onGuestsNumberChange);
checkInTime.addEventListener('change', onCheckOutTimeChange);
checkOutTime.addEventListener('change', onCheckInTimeChange);

type.addEventListener('change', () => {
  onRoomTypeChange();
  if (price.value) {
    pristine.validate();
  }
});

const resetSlider = () => {
  slider.noUiSlider.reset();
};

const resetForm = () => {
  userForm.reset();
};

const resetPage = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  resetPhotos();
  resetSlider();
  resetForm();
  resetFilters();
  pristine.reset();
};

reset.addEventListener('click', resetPage);

const setUserFormSubmit = () => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          showSuccessMessage();
          unblockSubmitButton();
          resetPage();
        },
        () => {
          showErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, resetForm};
