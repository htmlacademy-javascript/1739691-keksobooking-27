import './data.js';
import {createObjects} from './data.js';

const card = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const similarObjects = createObjects();
const popupFragment = document.createDocumentFragment();

const apartType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

similarObjects.forEach(({author:{avatar}, offer:{title, address, price, type, description, rooms, guest, checkin, checkout, photos, features}}) => {
  const offerElement = card.cloneNode(true);

  offerElement.querySelector('.popup__title').textContent = title;
  offerElement.querySelector('.popup__text--address').textContent = address;
  offerElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = apartType[type];
  offerElement.querySelector('.popup__description').textContent = description;
  offerElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guest} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  offerElement.querySelector('.popup__features').textContent = features;
  offerElement.querySelector('.popup__avatar').src = avatar.avatar;
  offerElement.querySelector('.popup__photo').src = photos;

  // const featuresContainer = card.querySelector('.popup__features');
  // const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  // const featuresListModifiers = features.map((feature) => `popup__feature-- ${feature}`);

  // featuresList.forEach((featuresListItem) => {
  //   const modifier = featuresListItem.classList[1];

  //   if (!featuresListModifiers.includes(modifier)) {
  //     featuresListItem.remove();
  //   }
  // });

  popupFragment.appendChild(offerElement);
});

mapCanvas.appendChild(popupFragment);
