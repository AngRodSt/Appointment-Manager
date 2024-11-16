import { formAp } from "../selectors.js";
export default class Alert {
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
