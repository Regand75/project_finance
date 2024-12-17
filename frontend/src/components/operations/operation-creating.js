import {OperationsService} from "../../services/operations-service.js";
import {CommonUtils} from "../../utils/common-utils.js";

export class OperationCreating {
    constructor(parseHash) {
        const { params } = parseHash();
        this.params = params;
        this.typeElement = document.getElementById('typeSelect');
        this.categoryElement = document.getElementById('categorySelect');
        this.operationCreatingButton = document.getElementById('operation-creating');
        this.operationCreatingButton.addEventListener('click', this.saveOperation.bind(this));

        document.getElementById('button-back').addEventListener('click', () => {
            // this.deleteCategory(this.params).then();
            window.history.back();
        });

        this.typeElement.addEventListener('change', this.changeCategorySelect.bind(this));

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

        this.getCategories(this.params.category).then();
    }

    async getCategories(categoryType) {
        try {
            const categoriesResult = await OperationsService.getCategories(`/${categoryType}`);
            if (categoriesResult && categoriesResult.length > 0) {
                this.showTypeSelects();
                this.showCategorySelects(categoriesResult);
            } else if (categoriesResult.error) {
                console.log(categoriesResult.error);
                location.href = '#/operations';
            }
        } catch (error) {
            console.log(error);
        }
    }

    async changeCategorySelect() {
        try {
            const categoriesResult = await OperationsService.getCategories(`/${this.typeElement.value}`);
            if (categoriesResult && categoriesResult.length > 0) {
                this.showCategorySelects(categoriesResult);
            } else if (categoriesResult.error) {
                console.log(categoriesResult.error);
                location.href = '#/operations';
            }
        } catch (error) {
            console.log(error);
        }
    }

    // async deleteCategory(params) {
    //     try {
    //         const deleteResult = await OperationsService.deleteCategory(`/${this.params.category}/${params.id}`);
    //         if (deleteResult) {
    //             location.href = `#/${this.params.category}/creating`;
    //         } else if (deleteResult.error) {
    //             console.log(deleteResult.error);
    //             location.href = '#/operations';
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    showTypeSelects() {
        for (let i = 0; i < this.typeElement.options.length; i++) {
            if (this.typeElement.options[i].value === this.params.category) {
                this.typeElement.options[i].selected = true;
            }
        }
    }

    showCategorySelects(categoryList) {
        this.categoryElement.innerHTML = ''; // очищаем select
        categoryList.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id;
            option.innerText = item.title;
            if (this.params.id === option.value) {
                option.selected = true;
            }
            this.categoryElement.appendChild(option);
        });
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
            const date = CommonUtils.convertDate(this.fields.find(item => item.name === 'date').element.value);
            const comment = document.getElementById('comment').value;
            try {
                const operationResult = await OperationsService.createOperation({
                    type: this.typeElement.value,
                    amount: parseInt(amount),
                    date: date,
                    comment: comment,
                    category_id: parseInt(this.categoryElement.value),
                });
                if (operationResult) {
                    location.href = '#/operations';
                }
                if (operationResult.error) {
                    console.log(operationResult.error);
                    location.href = `#/${this.typeElement.value}s`;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}