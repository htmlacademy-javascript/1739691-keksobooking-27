const userForm = document.querySelector('.ad-form');
const roomNumber = userForm.querySelector('#room_number');
const roomCapacity = userForm.querySelector('#capacity');
const title = userForm.querySelector('#title');
const price = userForm.querySelector('#price');
const type = userForm.querySelector('#type');

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

const roomsAndGuests = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комната': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей']
};

const pristine = new Pristine(userForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
}, true
);

const validateTitle = () =>
  title.length >= 30 && title.length <= 100;

const getTitleErrorMessage = () => `Длинна заголовка должна быть от 30 до 100 символов. Сейчас ${title.value.length} символов`;

const validatePrice = () =>
  price >= apartPrice.minPrice[type.value] && price <= apartPrice.maxPrice;

const getPriceErrorMessage = () => `Введите стоимость от ${apartPrice.minPrice[type.value]} до ${apartPrice.maxPrice}`;

const validateRoomsAndGuests = () => roomsAndGuests[roomNumber.value].includes(roomCapacity.value);

const getAccomodationErrorMessage = () =>
  `
  ${roomNumber.value}
  ${roomCapacity.value}
  ${roomNumber.value === '1 комната' ? 'недоступна' : 'недоступны'}
`;

const getUserFormValidation = () => {
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
    validateRoomsAndGuests,
    getAccomodationErrorMessage
  );

  pristine.addValidator(
    roomCapacity,
    validateRoomsAndGuests,
    getAccomodationErrorMessage
  );
};

userForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {getUserFormValidation};
