import {OperationsService} from "../../services/operations-service.js";

export class IncomeCreating {
    constructor() {
        this.titleNewCategoryInput = document.getElementById('title-new-category');
        this.creatingCategoryElement = document.getElementById('creating-category');
        this.titleNewCategoryInput.addEventListener('input', this.activeButton.bind(this));
        this.creatingCategoryElement.addEventListener('click', this.creatingCategory.bind(this));
    }

    activeButton() {
        if (this.titleNewCategoryInput.value !== '') {
            this.creatingCategoryElement.classList.remove('disabled');
        } else {
            this.creatingCategoryElement.classList.add('disabled');
        }
    };

    async creatingCategory() {
        try {
            const result = await OperationsService.createCategory('/income', {
                title: this.titleNewCategoryInput.value,
            });
            if (result) {
                location.href = '#/operations/creating';
            }

        } catch (error) {
            console.log(error);
        }
    }
}