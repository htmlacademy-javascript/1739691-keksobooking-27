import {setUserFormSubmit} from './user-form.js';
import {disableForm} from './form.js';
import {loadMap} from './map.js';
import {getData} from './api.js';
import {createPins} from './map.js';


getData(createPins);
setUserFormSubmit();
disableForm();
loadMap();
