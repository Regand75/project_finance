import {OperationsService} from "../../services/operations-service.js";
import {AuthUtils} from "../../utils/auth-utils.js";

export class OperationCreating {
    constructor() {
        this.categoryData = sessionStorage.getItem('categoryData');
        this.categoryData = AuthUtils.getCategoryData();
        this.operationCreatingButton = document.getElementById('operation-creating');
        this.operationCreatingButton.addEventListener('click', this.saveOperation.bind(this));

        document.getElementById('button-back').addEventListener('click', () => {
            window.history.back();
        });

        this.typeElement = document.getElementById('type');
        this.categoryElement = document.getElementById('category');
        this.fields = [
            {
                name: 'amount',
                id: 'amount',
                element: null,
                regex: /^\d*$/,
                valid: false,
            },
            {
                name: 'date',
                id: 'date',
                element: null,
                regex: /^([0-2]\d|3[01])\.(0\d|1[0-2])\.(\d{4})$/,
                valid: false,
            },
            {
                name: 'comment',
                id: 'comment',
                element: null,
                valid: false,
            },
        ];

        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = () => {
                this.validateField(item, item.element);
            }
        })
    }

    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.classList.add('is-invalid');
            field.valid = false;
        } else {
            element.classList.remove('is-invalid');
            field.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        if (validForm) {
            this.operationCreatingButton.removeAttribute('disabled');
        } else {
            this.operationCreatingButton.setAttribute('disabled', 'disabled');
        }
        return validForm;
    };


    async saveOperation(e) {
        e.preventDefault();
        if (this.validateForm()) {
            const amount = this.fields.find(item => item.name === 'amount').element.value;
            const date = this.fields.find(item => item.name === 'date').element.value;
            const comment = document.getElementById('comment').value;
            try {
                const operationResult = await OperationsService.saveOperation({
                    type: this.categoryData.category,
                    amount: amount,
                    date: date,
                    comment: comment,
                    category_id: this.categoryData.id,
                });
                if (operationResult) {
                    location.href = `#/${this.categoryData.category}`;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}