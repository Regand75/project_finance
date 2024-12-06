import {ModalManager} from "../modal.js";
import {CustomHttp} from "../../services/custom-http.js";
import config from "../../../config/config.js";

export class OperationsList {
    constructor() {
        this.buttonNoDeleteElement = document.getElementById("no-delete");
        this.buttonDeleteIncomeExpenseElement = document.querySelectorAll(".operations-delete");

        if (this.buttonDeleteIncomeExpenseElement) {
            this.buttonDeleteIncomeExpenseElement.forEach(button => {
                button.addEventListener('click', ModalManager.showModal);
            });
        }

        if (this.buttonNoDeleteElement) {
            this.buttonNoDeleteElement.addEventListener('click', ModalManager.hideModal);
        }
        this.getOperations().then();
    }

    async getOperations() {
        const result = await CustomHttp.request(config.host + '/operations?period=all');
        console.log('результат', result);
        return;
        // this.showRecords(result.response);
    }

    // showRecords() {
    //
    // }
}