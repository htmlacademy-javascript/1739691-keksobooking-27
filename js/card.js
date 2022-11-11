const card = document.querySelector('#card').content.querySelector('.popup');

const apartType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const renderAccomodationOffer = (object) => {
  const offerElement = card.cloneNode(true);

  offerElement.querySelector('.popup__title').textContent = object.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = object.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${object.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = apartType[object.offer.type];
  offerElement.querySelector('.popup__description').textContent = object.offer.description;
  offerElement.querySelector('.popup__text--capacity').textContent = `${object.offer.rooms} комнаты для ${object.offer.guest} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
  offerElement.querySelector('.popup__avatar').src = object.author.avatar.avatar;
  offerElement.querySelector('.popup__photo').src = object.offer.photos;

  const featureList = offerElement.querySelector('.popup__features').querySelectorAll('.popup__feature');
  const modifiers = object.offer.features.map((feature) => `popup__feature--${feature}`);

  featureList.forEach((featureItem) => {
    const modifier = featureItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featureItem.remove();
    }
  });

  return offerElement;
};

export {renderAccomodationOffer};
