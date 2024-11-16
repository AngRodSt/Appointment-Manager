import { appList, formAp, btnForm } from "../selectors.js";
import { loadEdit, clearObject } from "../functions.js";
import { edit } from "../variables.js";
export default class Appointment {
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

    deleteAp(appointmentDelete) {
        this.appointment = this.appointment.filter(ap => ap.id !== appointmentDelete.id);
        this.showAp();

    }
    showAp() {

        while (appList.firstChild) {
            appList.removeChild(appList.firstChild);
        }

        if (this.appointment.length === 0) {
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
            btnEdit.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'gap-2', 'sm:w-full');
            btnEdit.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            const clone = structuredClone(appointment)
            btnEdit.onclick = () => { loadEdit(clone) }

            const btnDelete = document.createElement('button');
            btnDelete.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'gap-2', 'sm:w-full');
            btnDelete.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            btnDelete.onclick = () => {
                this.deleteAp(clone)
                if (edit.value) {
                    formAp.reset();
                    edit.value = false;
                    btnForm.value = "Register Patient"
                    clearObject();
                }
            }

            const containerButton = document.createElement('DIV');
            containerButton.classList.add('md:flex-row', 'flex', 'flex-col', 'flex-1', 'md:justify-between', 'mt-5', 'gap-3');

            containerButton.appendChild(btnEdit);
            containerButton.appendChild(btnDelete);

            div.appendChild(containerButton);
            appList.appendChild(div);

        });

    }
}