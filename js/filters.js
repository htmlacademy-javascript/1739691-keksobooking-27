import {debounce} from './util.js';
import {createPins} from './map.js';

const DEFAULT_VALUE = 'any';
const RENDER_DELAY = 500;

const mapFilters = document.querySelector('.map__filters');
const filterType = mapFilters.querySelector('#housing-type');
const filterPrice = mapFilters.querySelector('#housing-price');
const filterRooms = mapFilters.querySelector('#housing-rooms');
const filterGuests = mapFilters.querySelector('#housing-guests');

const price = {
  low: {
    min: 0,
    max: 10000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  high: {
    min: 50000,
    max: 100000
  },
};

const getFilterType = (object) =>
  filterType.value === DEFAULT_VALUE || object.offer.type === filterType.value;

const getFilterPrice = (object) =>
  filterPrice.value === DEFAULT_VALUE || (object.offer.price >= price[filterPrice.value].min && object.offer.price <= price[filterPrice.value].max);

const getFilterRooms = (object) =>
  filterRooms.value === DEFAULT_VALUE || object.offer.rooms === Number(filterRooms.value);

const getFilterGuests = (object) =>
  filterGuests.value === DEFAULT_VALUE || object.offer.guests === Number(filterGuests.value);

const getFilterFeatures = (object) => {
  const checkedFeatures = mapFilters.querySelectorAll('[type = "checkbox"]:checked');
  if (!checkedFeatures.length) {
    return true;
  }
  if (!object.offer.features) {
    return false;
  }

  const checkedValues = Array.from(checkedFeatures).map((checkedFeature) => checkedFeature.value);

  return checkedValues.every((checkedValue) => object.offer.features.includes(checkedValue));
};

const pageFilters = (object) => getFilterType(object) && getFilterPrice(object) && getFilterRooms(object) && getFilterGuests(object) && getFilterFeatures(object);

const activateFilters = (offers) => {
  const onFiltersChange = (debounce(() => createPins(offers.filter(pageFilters)), RENDER_DELAY,));

  mapFilters.addEventListener('change', onFiltersChange);
};

const resetFilters = () => {
  mapFilters.reset();
};

export {resetFilters, activateFilters};
