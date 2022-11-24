import {activateForm} from './form.js';
import {renderAccomodationOffer} from './card.js';
import {getData} from './api.js';

const TOKYO_CENTER = {
  lat: 35.68091,
  lng: 139.76529
};

const MAP_ZOOM = 10;
const PIN_AMOUNT = 10;
const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR = [26, 52];
const PIN_SIZE = [40, 40];
const PIN_ANCHOR = [26, 52];


const map = L.map('map-canvas');
const resetButton = document.querySelector('.ad-form__reset');
const address = document.querySelector('#address');
const markerGroup = L.layerGroup().addTo(map);

const mainPin = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR,
});

const pin = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: PIN_SIZE,
  iconAnchor: PIN_ANCHOR,
});

const setAddress = (coordinates) => {
  address.value = `${(coordinates.lat).toFixed(5)}, ${(coordinates.lng).toFixed(5)}`;
};

const loadMap = () => {
  map.on('load', () => {
    activateForm();
    setAddress(TOKYO_CENTER);
  })
    .setView({
      lat: TOKYO_CENTER.lat,
      lng: TOKYO_CENTER.lng,
    }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const createPins = (points) => {
  markerGroup.clearLayers();

  points.slice(0, PIN_AMOUNT).forEach((point) => {
    const {lat, lng} = point.location;
    const marker = L.marker(
      {
        lat,
        lng
      },
      {
        pin,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(renderAccomodationOffer(point));
  });
};

const mainMarker = L.marker(
  {
    lat: TOKYO_CENTER.lat,
    lng: TOKYO_CENTER.lng,
  },
  {
    draggable: true,
    icon: mainPin
  }
);

mainMarker.addTo(map);

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: TOKYO_CENTER.lat,
    lng: TOKYO_CENTER.lng,
  });
  map.setView({
    lat: TOKYO_CENTER.lat,
    lng: TOKYO_CENTER.lng,
  }, MAP_ZOOM);
  getData(createPins);
});

mainMarker.on('moveend', (evt) => {
  const newAddress = evt.target.getLatLng();
  setAddress(newAddress);
});

const resetMap = () => {
  mainMarker.setLatLng({
    lat: TOKYO_CENTER.lat,
    lng: TOKYO_CENTER.lng,
  });
  map.setView({
    lat: TOKYO_CENTER.lat,
    lng: TOKYO_CENTER.lng,
  }, MAP_ZOOM);
  getData(createPins);
};

export {TOKYO_CENTER, loadMap, createPins, setAddress, resetMap};

