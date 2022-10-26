import {renderAccomodationOffer} from './card.js';
import {createObjects} from './data.js';
import {disableForm, activeForm} from './form.js';

renderAccomodationOffer(createObjects());

disableForm();
activeForm();
