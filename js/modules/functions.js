
import { appointmentObj, edit } from "./variables.js";
import Alert from "./classes/Alert.js";
import Appointment from "./classes/Appointment.js";
import {
    petInput, ownerInput, emailInput, dateInput, symptomsInput,
    formAp, btnForm
} from "./selectors.js"


const appointment = new Appointment();

export function fillField(e) {
    appointmentObj[e.target.id] = e.target.value;
}

export function validation(e) {
    e.preventDefault();
    if (Object.values(appointmentObj).some(valor => valor.trim() === '')) {
        new Alert({
            messege: 'All the field are mandatory',
            type: 'error'
        })
        return;
    }
    if (edit.value) {
        appointment.editAp({ ...appointmentObj })
        new Alert({
            messege: 'Appointment edited successly ',
            type: ''
        })
    }
    else {
        appointment.addAp({ ...appointmentObj });
        new Alert({
            messege: 'Appointment added successly ',
            type: ''
        })
    }
    edit.value = false;
    btnForm.value = "Register Patient"
    clearObject();
    formAp.reset();
}

export function generateId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

export function clearObject() {
    Object.assign(appointmentObj, {
        id: generateId(),
        pet: '',
        owner: '',
        email: '',
        date: '',
        symptoms: ''
    })
}

export function loadEdit(appointment) {
    Object.assign(appointmentObj, appointment)

    petInput.value = appointment.pet
    ownerInput.value = appointment.owner
    emailInput.value = appointment.email
    dateInput.value = appointment.date
    symptomsInput.value = appointment.symptoms;

    edit.value = true;
    btnForm.value = "Save Changes"
}