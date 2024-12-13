import {OperationsService} from "../../services/operations-service.js";
import {UrlUtils as urlUtils} from "../../utils/url-utils.js";
import {AuthUtils} from "../../utils/auth-utils.js";

export class CategoryCreating {
    constructor() {
        this.titleNewCategoryInput = document.getElementById('title-new-category');
        document.getElementById('button-back').addEventListener('click', () => {
            window.history.back();
        });
        this.creatingCategoryElement = document.getElementById('creating-category');
        this.titleNewCategoryInput.addEventListener('input', this.activeButton.bind(this));
        this.creatingCategoryElement.addEventListener('click', this.creatingCategory.bind(this));
        this.category = urlUtils.getUrlHashPart();
    }

    activeButton() {
        if (this.titleNewCategoryInput.value !== '') {
            this.creatingCategoryElement.classList.remove('disabled');
        } else {
            this.creatingCategoryElement.classList.add('disabled');
        }
    };

    async creatingCategory() {

        let partUrl = ''
        if (this.category === 'incomes') {
            partUrl = '/income';
        } else if (this.category === 'expenses') {
            partUrl = '/expense';
        }
        try {
            const operationsResult = await OperationsService.createCategory(partUrl, {
                title: this.titleNewCategoryInput.value,
            });
            if (operationsResult) {
                AuthUtils.setCategoryData(operationsResult.id, operationsResult.title, this.category);
                location.href = '#/operations/creating';
            } else if (operationsResult.error) {
                console.log(operationsResult.error);
                location.href = '#/';
            }

        } catch (error) {
            console.log(error);
        }
    }
}