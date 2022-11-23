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
  offerElement.querySelector('.popup__text--capacity').textContent = `${object.offer.rooms} комнаты для ${object.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
  offerElement.querySelector('.popup__avatar').src = object.author.avatar;

  const photoList = offerElement.querySelector('.popup__photos');
  const photoItem = offerElement.querySelector('.popup__photo');
  if (object.offer.photos) {
    photoList.innerHTML = '';
    object.offer.photos.forEach((photo) => {
      const photoNode = photoItem.cloneNode(true);
      photoNode.src = photo;
      photoList.append(photoNode);
    });
  } else {
    photoList.style.display = 'none';
  }

  const featureList = offerElement.querySelectorAll('.popup__feature');
  if (object.offer.features) {
    featureList.forEach((featureItem) => {
      const isFeature = object.offer.features.some((element) => featureItem.classList.contains(`popup__feature--${element}`));

      if (!isFeature) {
        featureItem.remove();
      }
    });
  } else {
    offerElement.querySelector('.popup__features').style.display = 'none';
  }

  return offerElement;
};

export {renderAccomodationOffer};
