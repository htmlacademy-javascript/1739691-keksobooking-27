import {activeForm} from './form.js';
import {renderAccomodationOffer} from './card.js';

const TOKYO_CENTER = {
  lat: 35.68091,
  lng: 139.76529
};

const MAP_ZOOM = 10;
const PIN_AMOUNT = 10;

const map = L.map('map-canvas');
const resetButton = document.querySelector('.ad-form__reset');
const address = document.querySelector('#address');
const markerGroup = L.layerGroup().addTo(map);

const mainPin = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pin = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const loadMap = () => {
  map.on('load', () => {
    activeForm();
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
});

mainMarker.on('moveend', (evt) => {
  const newAddress = evt.target.getLatLng();
  address.value = `${(newAddress.lat).toFixed(5)}, ${(newAddress.lng).toFixed(5)}`;
});

export {loadMap, createPins};

