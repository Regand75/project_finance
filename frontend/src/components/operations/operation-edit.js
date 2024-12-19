import {OperationsService} from "../../services/operations-service.js";
import {CommonUtils} from "../../utils/common-utils.js";

export class OperationEdit {
    constructor(parseHash) {
        const { params } = parseHash();
        this.params = params;
        this.operationOriginalData= null;
        this.typeElement = document.getElementById('typeSelect');
        this.categoryElement = document.getElementById('categorySelect');
        this.operationEditButton = document.getElementById('operation-edit');
        // this.operationEditButton.addEventListener('click', this.saveOperation.bind(this));

        CommonUtils.initBackButton();

        // this.typeElement.addEventListener('change', this.changeCategorySelect.bind(this));

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

        this.getOperation(this.params.id).then();
    }

    async getOperation(id) {
        try {
            const operationResult = await OperationsService.getOperation(`/${id}`);
            if (operationResult) {
                console.log(operationResult);
                this.operationOriginalData = operationResult;
                for (let i = 0; i < this.typeElement.options.length; i++) {
                    if (this.typeElement.options[i].value === operationResult.type) {
                        this.typeElement.options[i].selected = true;
                    }
                }
                this.getCategories(operationResult.type);

                // this.showCategorySelect(operationResult);
                this.fields.forEach(field => {
                    const inputElement = document.getElementById(field.id);
                    if (inputElement) {
                        field.element = inputElement;
                        if (field.name === 'date' && operationResult[field.name]) {
                            // Преобразуем дату в формат день.месяц.год
                            const date = new Date(operationResult.date); // Преобразуем строку в объект Date
                            inputElement.value = new Intl.DateTimeFormat('ru-RU').format(date);
                        } else {
                            inputElement.value = operationResult[field.name];
                        }
                    }
                });
            } else if (operationResult.error) {
                console.log(operationResult.error);
                location.href = '#/operations';
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getCategories(type) {
        try {
            const categoriesResult = await OperationsService.getCategories(`/${type}`);
            if (categoriesResult && categoriesResult.length > 0) {
                this.showCategorySelect(categoriesResult);
            } else if (categoriesResult.error) {
                console.log(categoriesResult.error);
                location.href = '#/operations';
            }
        } catch (error) {
            console.log(error);
        }
    }

    // async changeCategorySelect() {
    //     try {
    //         const categoriesResult = await OperationsService.getCategories(`/${this.operationOriginalData.type}`);
    //         if (categoriesResult) {
    //             console.log(categoriesResult);
    //             this.showCategorySelects(categoriesResult);
    //         } else if (categoriesResult.error) {
    //             console.log(categoriesResult.error);
    //             location.href = '#/operations';
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    showCategorySelect(categoryList) {
        this.categoryElement.innerHTML = ''; // очищаем select
        categoryList.forEach(item => {
            const option = document.createElement("option");
            option.value = item.title;
            if (option.value === this.operationOriginalData.category) {
                option.selected = true;
            }
            option.innerText = item.title;
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
            this.operationEditButton.removeAttribute('disabled');
        } else {
            this.operationEditButton.setAttribute('disabled', 'disabled');
        }
        return validForm;
    };

    // async saveOperation(e) {
    //     e.preventDefault();
    //
    //     if (this.validateForm()) {
    //         // const amount = this.fields.find(item => item.name === 'amount').element.value;
    //         // const date = CommonUtils.convertDate(this.fields.find(item => item.name === 'date').element.value);
    //         // const comment = document.getElementById('comment').value;
    //         try {
    //             const operationResult = await OperationsService.createOperation({
    //                 type: this.typeElement.value,
    //                 amount: parseInt(amount),
    //                 date: date,
    //                 comment: comment,
    //                 category_id: parseInt(this.categoryElement.value),
    //             });
    //             if (operationResult) {
    //                 location.href = '#/operations';
    //             }
    //             if (operationResult.error) {
    //                 console.log(operationResult.error);
    //                 location.href = `#/${this.typeElement.value}s`;
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }
}