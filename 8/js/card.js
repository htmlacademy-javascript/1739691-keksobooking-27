const card = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');


const apartType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const renderAccomodationOffer = (objects) => {
  const popupFragment = document.createDocumentFragment();

  objects.forEach(({author:{avatar}, offer:{title, address, price, type, description, rooms, guest, checkin, checkout, features, photos}}) => {
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

    popupFragment.appendChild(offerElement);
  });

  mapCanvas.appendChild(popupFragment);
};

export {renderAccomodationOffer};
