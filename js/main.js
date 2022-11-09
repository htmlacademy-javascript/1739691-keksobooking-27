import {renderAccomodationOffer} from './card.js';
import {createObjects} from './data.js';
import {disableForm, activeForm} from './form.js';
import {getUserFormValidation} from './user-form.js';

renderAccomodationOffer(createObjects()[0]);

getUserFormValidation();
disableForm();
activeForm();
