import {ModalManager} from "./modal.js";

export class IncomesExpense {
    constructor() {
        this.buttonNoDeleteElement = document.getElementById("no-delete");
        this.buttonDeleteIncomeExpenseElement = document.querySelectorAll(".income-expense-delete");

        if (this.buttonDeleteIncomeExpenseElement) {
            this.buttonDeleteIncomeExpenseElement.forEach(button => {
                button.addEventListener('click', ModalManager.showModal);
            });
        }

        if (this.buttonNoDeleteElement) {
            this.buttonNoDeleteElement.addEventListener('click', ModalManager.hideModal);
        }
    }
}