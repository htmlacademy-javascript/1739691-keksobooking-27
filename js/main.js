import {setUserFormSubmit} from './user-form.js';
import {disableForm} from './form.js';
import {loadMap, createPins} from './map.js';
import {getData} from './api.js';
import {activateFilters} from './filters.js';
import {setUploadAvatar, setUploaAppartPhoto} from './avatar.js';

getData((objects) => {
  createPins(objects);
  activateFilters(objects);
});

setUserFormSubmit();
disableForm();
loadMap();
setUploadAvatar();
setUploaAppartPhoto();
