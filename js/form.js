const adForm = document.querySelector('.ad-form');
const adFormInput = adForm.querySelectorAll('input');
const adFormSelect = adForm.querySelectorAll('select');

const mapFilters = document.querySelector('.map__filters');
const mapFiltersInput = mapFilters.querySelectorAll('input');
const mapFiltersSelect = mapFilters.querySelectorAll('select');

const disableElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = true;
  });
};

const activeElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = false;
  });
};

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  disableElements(adFormInput);
  disableElements(adFormSelect);
  disableElements(mapFiltersInput);
  disableElements(mapFiltersSelect);
};

const activeForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  activeElements(adFormInput);
  activeElements(adFormSelect);
  activeElements(mapFiltersInput);
  activeElements(mapFiltersSelect);
};

export {disableForm, activeForm};
