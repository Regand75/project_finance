import {ModalManager} from "../modal.js";
import {OperationsService} from "../../services/operations-service.js";
import {OperationsUtils} from "../../utils/operations-utils.js";

export class OperationsList {
    constructor() {
        this.buttonNoDeleteElement = document.getElementById('no-delete');
        this.recordsElement = document.getElementById('records');
        this.filtersContainer = document.getElementById('filters-container'); // Родительский контейнер кнопок фильтра

        if (this.filtersContainer) {
            this.filtersContainer.addEventListener('click', this.handleFilterClick.bind(this));
        }

        if (this.buttonNoDeleteElement) {
            this.buttonNoDeleteElement.addEventListener('click', ModalManager.hideModal);
        }
        this.getOperations('today').then();

        $('#date-from').datepicker({
           format: 'dd.mm.yyyy',
           autoclose: 'off',
           todayHighlight: true,
           language: 'ru',
        });

        $('#date-by').datepicker({
           format: 'dd.mm.yyyy',
           autoclose: 'off',
           todayHighlight: true,
           language: 'ru',
        });
    }

    async getOperations(period) {
        try {
            const operationsResult = await OperationsService.getOperations(`?period=${period}`);
            this.showRecords(operationsResult);
        } catch (error) {
            console.error(error);
        }
    }

    async handleFilterClick(event) {
        const target = event.target.closest('button[data-period]');
        if (target) {
            document.querySelectorAll('button[data-period]').forEach(btn => btn.classList.remove('btn-secondary'));
            target.classList.add('btn-secondary');
            const period = target.getAttribute('data-period'); // Получаем значение фильтра

            try {
                const operationsResult = await OperationsService.getOperations(`?period=${period}`);
                // Передаем данные для отображения записей
                this.showRecords(operationsResult);
            } catch (error) {
                console.error(error);
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
}