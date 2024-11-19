import { generateId } from "./functions.js";


export let DB = {};

export let edit = {
    value: false
} 

export let appointmentObj = {
    id: generateId(),
    pet: '',
    owner: '',
    email: '',
    date: '',
    symptoms: ''
}
