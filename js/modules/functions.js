
import { appointmentObj, edit, DB } from "./variables.js";
import Alert from "./classes/Alert.js";
import Appointment from "./classes/Appointment.js";
import {
    petInput, ownerInput, emailInput, dateInput, symptomsInput,
    formAp, btnForm
} from "./selectors.js"


const appointment = new Appointment();

export function EventListener(){
    petInput.addEventListener('input', fillField)
    ownerInput.addEventListener('input', fillField)
    emailInput.addEventListener('input', fillField)
    dateInput.addEventListener('input', fillField)
    symptomsInput.addEventListener('input', fillField)
    formAp.addEventListener('submit', validation);
}


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

        const transaction = DB.value.transaction(['appointment'], 'readwrite');
        const objectStore = transaction.objectStore('appointment');

        objectStore.put(appointmentObj);

        transaction.oncomplete = ()=>{
            new Alert({
                messege: 'Appointment edited successly ',
                type: ''
            })
            
            btnForm.value = "Register Patient"
        }
        transaction.onerror = ()=>{
            throw console.error('Error editing the appointment');
        }
        
    }
    else {

        appointment.addAp({ ...appointmentObj });

        const transaction = DB.value.transaction(['appointment'], 'readwrite');
        const objectStore = transaction.objectStore('appointment');

        objectStore.add(appointmentObj);

        transaction.oncomplete = function(){
            new Alert({
                messege: 'Appointment added successly ',
                type: ''
            })
        }
       
    }
    edit.value = false;
    appointment.showAp();
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

export function deleteAppointemente(id){
    const transaction = DB.value.transaction(['appointment'], 'readwrite');
    const objectStore = transaction.objectStore('appointment');

    objectStore.delete(id);

    transaction.oncomplete = ()=>{
        appointment.showAp();
    }
    transaction.onerror = ()=>{
        throw console.error("Transaction failed");
    }
}

export function createDB(){
    const createDB =  window.indexedDB.open('appointment', 1);

    createDB.onerror = function(){
        throw console.error('Error creating DataBase');
    }

    createDB.onsuccess = function(){
        DB.value = createDB.result;
        appointment.showAp();

    }

    createDB.onupgradeneeded = function(e){
        const db = e.target.result;

        const objectStore = db.createObjectStore('appointment', {
            keyPath: 'id',
            autoIncrement: true
        });

        objectStore.createIndex('pet', 'pet',{unique:false});
        objectStore.createIndex('owner', 'owner',{unique:false});
        objectStore.createIndex('email', 'email',{unique:false});
        objectStore.createIndex('date', 'date',{unique:false});
        objectStore.createIndex('symptoms', 'symptoms',{unique:false});
        objectStore.createIndex('id', 'id',{unique:true});
    }
}