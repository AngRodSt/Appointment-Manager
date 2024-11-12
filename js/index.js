//Declarations
const petInput = document.querySelector('#pet')
const ownerInput = document.querySelector('#owner')
const emailInput = document.querySelector('#email')
const dateInput = document.querySelector('#date')
const symptomsInput = document.querySelector('#symptoms')
const formAp = document.querySelector('#appointment-form')
const appList = document.querySelector('#appointment-list')
const btnForm = document.querySelector('#appointment-form input[type="submit"]')

let edit = false;

let appointmentObj = {
    id: generateId(),
    pet: '',
    owner: '',
    email: '',
    date: '',
    symptoms: ''
}


//EventListeners
petInput.addEventListener('input', fillField)
ownerInput.addEventListener('input', fillField)
emailInput.addEventListener('input', fillField)
dateInput.addEventListener('input', fillField)
symptomsInput.addEventListener('input', fillField)
formAp.addEventListener('submit', validation);

//Classes
class Appointment {
    constructor() {
        this.appointment = [];
    }

    addAp(appointment) {
        this.appointment = [...this.appointment, appointment];
        this.showAp();
    }

    editAp(appointmentUpdate) {
        this.appointment = this.appointment.map(ap => ap.id === appointmentUpdate.id ? appointmentUpdate : ap)
        this.showAp();
    }

    deleteAp(appointmentDelete){
        this.appointment = this.appointment.filter(ap => ap.id !== appointmentDelete.id);
        this.showAp();
        
    }
    showAp() {

        while (appList.firstChild) {
            appList.removeChild(appList.firstChild);
        }

        if(this.appointment.length === 0){
            appList.innerHTML = `<p class="text-xl mt-5 mb-10 text-center">There are no patients</p>`
            return;
        }

        this.appointment.forEach(appointment => {
            const { id, pet, owner, email, date, symptoms } = appointment

            const div = document.createElement('DIV');
            div.className = 'flex flex-col rounded-lg bg-white shadow-md px-5 py-10 mb-5'
            div.innerHTML = `
            <p class="uppercase mb-2 text-sm font-bold text-gray-500">Pet Name: <span class=" text-black ">${pet}</span></p>
            <p class="uppercase mb-2 text-sm font-bold text-gray-500">Owner Name: <span class=" text-black ">${owner}</span></p>
            <p class="uppercase mb-2 text-sm font-bold text-gray-500">E-mail Contact: <span class=" text-black ">${email}</span></p>
            <p class="uppercase mb-2 text-sm font-bold text-gray-500">Discharge Date: <span class=" text-black ">${date}</span></p>
            <p class="uppercase mb-2 text-sm font-bold text-gray-500">Symptoms: <span class=" text-black ">${symptoms}</span></p>
            `
            const btnEdit = document.createElement('button');
            btnEdit.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEdit.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            const clone = structuredClone(appointment)
            btnEdit.onclick = () => {loadEdit(clone)}

            const btnDelete = document.createElement('button');
            btnDelete.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnDelete.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            btnDelete.onclick = ()=>{
                this.deleteAp(clone)
                if(edit){
                    formAp.reset();
                    edit = false;
                    btnForm.value = "Register Patient"
                    clearObject();
                }
            }

            const containerButton = document.createElement('DIV');
            containerButton.classList.add('flex', 'justify-between', 'mt-5', 'gap-3');

            containerButton.appendChild(btnEdit);
            containerButton.appendChild(btnDelete);

            div.appendChild(containerButton);
            appList.appendChild(div);

        });

    }
}
class Alert {
    constructor({ messege, type }) {
        this.messege = messege;
        this.type = type;
        this.show();
    }

    show() {

        const alertExist = document.querySelector('.alert')
        if (alertExist) {
            alertExist.remove();
        }
        const alert = document.createElement('DIV');
        alert.classList.add('text-center', 'p-3', 'text-white', 'mb-5', 'uppercase', 'alert', 'font-bold', 'text-sm');
        this.type === 'error' ? alert.classList.add('bg-red-500') : alert.classList.add('bg-green-500');
        alert.textContent = this.messege;

        const formParent = formAp.parentElement;
        formParent.insertBefore(alert, formAp);

        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

}

const appointment = new Appointment();

//Functions
function fillField(e) {
    appointmentObj[e.target.id] = e.target.value;
}

function validation(e) {
    e.preventDefault();
    if (Object.values(appointmentObj).some(valor => valor.trim() === '')) {
        new Alert({
            messege: 'All the field are mandatory',
            type: 'error'
        })
        return;
    }
    if (edit){
        appointment.editAp({...appointmentObj})
        new Alert({
            messege: 'Appointment edited successly ',
            type: ''
        })
    }
    else{
        appointment.addAp({ ...appointmentObj });
        new Alert({
            messege: 'Appointment added successly ',
            type: ''
        })
    }
    edit = false;
    btnForm.value = "Register Patient"
    clearObject();
    formAp.reset();
}

function generateId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

function clearObject() {
    Object.assign(appointmentObj, {
        id: generateId(),
        pet: '',
        owner: '',
        email: '',
        date: '',
        symptoms: ''
    })
}

function loadEdit(appointment) {
    Object.assign(appointmentObj, appointment)

    petInput.value = appointment.pet
    ownerInput.value = appointment.owner
    emailInput.value = appointment.email
    dateInput.value =  appointment.date
    symptomsInput.value =  appointment.symptoms;

    edit = true;
    btnForm.value = "Save Changes"
}