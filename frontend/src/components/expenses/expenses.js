import {ModalManager} from "../modal.js";
import {CommonUtils} from "../../utils/common-utils.js";

export class Expenses {
    constructor() {
        this.buttonNoDeleteElement = document.getElementById("no-delete");
        this.buttonDeleteExpenseElements = document.querySelectorAll('.expense-delete');
        this.buttonSaveExpenseElement = document.getElementById('expense-save');

        if (this.buttonDeleteExpenseElements) {
            this.buttonDeleteExpenseElements.forEach(button => {
                button.addEventListener('click', ModalManager.showModal);
            });
        }

        if (this.buttonNoDeleteElement) {
            this.buttonNoDeleteElement.addEventListener('click', ModalManager.hideModal);
        }

        if (this.buttonSaveExpenseElement) {
            this.buttonSaveExpenseElement.addEventListener('click', CommonUtils.saveOperation);
        }
    }

}