import {ModalManager} from "./modal.js";

export class Incomes {
    constructor() {
        this.buttonNoDeleteElement = document.getElementById("no-delete");
        this.buttonDeleteIncomeElements = document.querySelectorAll('.income-delete');

        if (this.buttonDeleteIncomeElements) {
            this.buttonDeleteIncomeElements.forEach(button => {
                button.addEventListener('click', ModalManager.showModal);
            });
        }

        if (this.buttonNoDeleteElement) {
            this.buttonNoDeleteElement.addEventListener('click', ModalManager.hideModal);
        }
    }
}