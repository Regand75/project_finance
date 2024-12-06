import {ModalManager} from "../modal.js";
import {OperationsService} from "../../services/operations-service.js";

export class Incomes {
    constructor() {
        this.buttonNoDeleteElement = document.getElementById("no-delete");
        this.buttonDeleteIncomeElements = document.querySelectorAll('.income-delete');
        this.buttonSaveIncomeElement = document.getElementById('income-save');

        if (this.buttonDeleteIncomeElements) {
            this.buttonDeleteIncomeElements.forEach(button => {
                button.addEventListener('click', ModalManager.showModal);
            });
        }

        if (this.buttonNoDeleteElement) {
            this.buttonNoDeleteElement.addEventListener('click', ModalManager.hideModal);
        }

        if (this.buttonSaveIncomeElement) {
            this.buttonSaveIncomeElement.addEventListener('click', OperationsService.saveOperation);
        }
    }
}