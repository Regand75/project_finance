import {ModalManager} from "../modal.js";
import {OperationsService} from "../../services/operations-service.js";
import {OperationsUtils} from "../../utils/operations-utils.js";

export class OperationsList {
    constructor() {
        this.buttonNoDeleteElement = document.getElementById('no-delete');
        this.recordsElement = document.getElementById('records');
        this.filtersContainer = document.getElementById('filters-container'); // Родительский контейнер кнопок фильтра

        // this.buttonOperationsTodayElement = document.getElementById('operations-button-today');
        // this.buttonOperationsWeekElement = document.getElementById('operations-button-week');
        // this.buttonOperationsMouthElement = document.getElementById('operations-button-mouth');
        // this.buttonOperationsYearElement = document.getElementById('operations-button-year');
        // this.buttonOperationsAllElement = document.getElementById('operations-button-all');
        // this.buttonOperationsintervalElement = document.getElementById('operations-button-interval');

        // if (this.recordsElement) {
        //     this.recordsElement.addEventListener('click', this.handleDeleteClick.bind(this));
        // }

        if (this.filtersContainer) {
            this.filtersContainer.addEventListener('click', this.handleFilterClick.bind(this));
        }

        if (this.buttonNoDeleteElement) {
            this.buttonNoDeleteElement.addEventListener('click', ModalManager.hideModal);
        }
        this.getOperations('all').then();
    }

    async getOperations(period) {
        try {
            const operationsResult = await OperationsService.getOperations(`?period=${period}`);
            this.showRecords(operationsResult);
        } catch (error) {
            console.error('Ошибка при получении операций:', error);
        }
    }
    // async getOperations() {
    //     const operationsResult = await OperationsService.getOperations('?period=all');
    //     this.showRecords(operationsResult);
    // }

    async handleFilterClick(event) {
        const target = event.target.closest('button[data-period]');
        if (target) {
            const period = target.getAttribute('data-period'); // Получаем значение фильтра
            console.log(`Фильтр выбран: ${period}`);

            try {
                // Используем статический метод для получения операций
                const operationsResult = await OperationsService.getOperations(`?period=${period}`);

                // Передаем данные для отображения записей
                this.showRecords(operationsResult);
            } catch (error) {
                console.error('Ошибка при получении операций:', error);
                alert('Не удалось загрузить данные. Попробуйте позже.');
            }
        }
    }



    showRecords(operations) {
        const recordsElement = this.recordsElement;
        recordsElement.innerHTML = ''; // Очистим таблицу перед добавлением новых записей
        // заполняем таблицу данными об операциях
        operations.forEach((operation, index) => {
            const row = this.createRow(operation, index + 1);
            recordsElement.appendChild(row);
        });
    }

    // Создание строки таблицы
    createRow(operation, orderNumber) {
        const tr = document.createElement('tr');

        // Заменяем тип операции на русский язык и задаем цвет текста
        const operationType = operation.type === 'income' ? 'доход' : 'расход';
        const textClass = operation.type === 'income' ? 'text-success' : 'text-danger';

        // Преобразуем дату в формат день.месяц.год
        const date = new Date(operation.date); // Преобразуем строку в объект Date
        const formattedDate = new Intl.DateTimeFormat('ru-RU').format(date);

        // Форматируем сумму с разделением тысяч пробелом
        const formattedAmount = Number(operation.amount).toLocaleString('ru-RU');

        tr.setAttribute('data-id', operation.id);

        tr.innerHTML = `
        <th scope="row">${orderNumber}</th>
        <td class="${textClass}">${operationType}</td>
        <td>${operation.category}</td>
        <td>${formattedAmount} $</td>
        <td>${formattedDate}</td>
        <td>${operation.comment}</td>
        <td class="text-nowrap">
            ${OperationsUtils.generateGridToolsColumn('operations', operation.id)}
        </td>
    `;
        return tr;
    }

    // Обработчик клика по кнопке удаления и редактирования
    // handleDeleteClick(event) {
    //     const target = event.target.closest('.operations-delete, .operations-edit');
    //     if (target) {
    //         const row = target.closest('tr'); // Находим родительскую строку
    //         const operationId = row.getAttribute('data-id'); // Получаем id операции
    //         if (target.classList.contains('operations-delete')) {
    //             console.log(`Удаление операции с id: ${operationId}`);
    //             ModalManager.showModal();
    //         }
    //
    //         if (target.classList.contains('operations-edit')) {
    //             console.log(`Редактирование операции с id: ${operationId}`);
    //             // Логика для редактирования операции
    //         }
    //     }
    // }
}