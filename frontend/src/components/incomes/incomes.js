import {ModalManager} from "../modal.js";
import {OperationsService} from "../../services/operations-service.js";

export class Incomes {
    constructor() {
        this.buttonNoDeleteElement = document.getElementById("no-delete");

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
        const incomesContainerElement = document.getElementById("incomes-container");
        const blockAddingElement = document.getElementById("block-adding");
        incomesContainerElement.innerHTML = '';
        incomesContainerElement.appendChild(blockAddingElement);
        incomes.forEach((income) => {
            const div = this.createIncomeBlock(income.id, income.title);
            incomesContainerElement.insertBefore(div, blockAddingElement);
        });
    }

    createIncomeBlock(id, title, editHref = '#/incomes/edit') {
        // Создаем основной контейнер
        const block = document.createElement('div');
        block.className = 'income-block border bg-border-custom rounded';
        block.setAttribute('data-id', id);

        // Создаем заголовок блока
        const titleDiv = document.createElement('div');
        titleDiv.className = 'income-title';

        const titleText = document.createElement('h3');
        titleText.className = 'income-title-text';
        titleText.textContent = title;

        titleDiv.appendChild(titleText);

        // Создаем контейнер для кнопок
        const activeDiv = document.createElement('div');
        activeDiv.className = 'income-active d-flex';

        // Кнопка "Редактировать"
        const editButton = document.createElement('a');
        editButton.href = `${editHref}?id=${id}`;
        editButton.className = 'income-edit btn btn-primary btn-custom';
        editButton.textContent = 'Редактировать';

        // Кнопка "Удалить"
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'income-delete btn btn-danger btn-custom';
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', ModalManager.showModal);

        // Добавляем кнопки в контейнер
        activeDiv.appendChild(editButton);
        activeDiv.appendChild(deleteButton);

        // Добавляем заголовок и контейнер кнопок в основной блок
        block.appendChild(titleDiv);
        block.appendChild(activeDiv);

        return block;
    }
}