const userForm = document.querySelector('.ad-form');
const roomNumber = userForm.querySelector('#room_number');
const roomCapacity = userForm.querySelector('#capacity');

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

const validateTitle = (value) =>
  value.length >= 30 && value.length <= 100;

pristine.addValidator(
  userForm.querySelector('#title'),
  validateTitle
);

const validateRoomsAndGuests = () => roomsAndGuests[roomNumber.value].includes(roomCapacity.value);

function getAccomodationErrorMessage () {
  return `
  ${roomNumber.value}
  ${roomCapacity.value}
  ${roomNumber.value === '1 комната' ? 'недоступна' : 'недоступны'}
  `;
}

pristine.addValidator(roomNumber, validateRoomsAndGuests, getAccomodationErrorMessage);
pristine.addValidator(roomCapacity, validateRoomsAndGuests, getAccomodationErrorMessage);

userForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


