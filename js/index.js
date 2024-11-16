import {
    petInput, ownerInput, emailInput, dateInput, symptomsInput,
    formAp
} from "./modules/selectors.js"
import { fillField, validation } from "./modules/functions.js";


//EventListeners
petInput.addEventListener('input', fillField)
ownerInput.addEventListener('input', fillField)
emailInput.addEventListener('input', fillField)
dateInput.addEventListener('input', fillField)
symptomsInput.addEventListener('input', fillField)
formAp.addEventListener('submit', validation);

