import {ModalManager} from "../modal.js";
import {OperationsService} from "../../services/operations-service.js";

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
       this.getIncomes('income').then();
    }

    async getIncomes(params) {
        try {
            const incomesResult = await OperationsService.getCategories(`/${params}`);
            if (incomesResult && incomesResult.length > 0) {
                this.showIncomes(incomesResult);
            } else if (incomesResult.error) {
                console.log(incomesResult.error);
                location.href = '#/operations';
            }
        } catch (error) {
            console.log(error);
        }
    }

    showIncomes(incomes) {
        console.log(incomes);
    }
}