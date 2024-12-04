export class Main {
    constructor() {
        if (!localStorage.getItem('accessToken')) {
            return location.href = '#/login';
        }

        this.dataIncomes = {
            labels: ['Депозиты', 'Зарплата', 'Сбережения', 'Инвестиции'],
            datasets: [
                {
                    label: 'My Dataset',
                    data: [10, 30, 5, 25],
                    borderWidth: 1 // Толщина границ
                }
            ]
        };
        this.configIncomes = {
            type: 'pie',
            data: this.dataIncomes, // Подключение данных
            options: {
                responsive: true, // Диаграмма адаптируется к размерам контейнера
                plugins: {
                    legend: {
                        position: 'top', // Положение легенды
                    },
                }
            },
        };
        this.dataExpenses = {
            labels: ['Еда', 'Жильё', 'Здоровье', 'Кафе', 'Авто', 'Одежда', 'Развлечения', 'Счета', 'Спорт'],
            datasets: [
                {
                    label: 'My Dataset',
                    data: [30, 20, 15, 15, 10, 15, 10, 5, 12],
                    borderWidth: 1 // Толщина границ
                }
            ]
        };
        this.configExpenses = {
            type: 'pie',
            data: this.dataExpenses, // Подключение данных
            options: {
                responsive: true, // Диаграмма адаптируется к размерам контейнера
                plugins: {
                    legend: {
                        position: 'top', // Положение легенды
                    },
                }
            },
        };
        // Инициализация диаграммы
        this.ctxIncomes = document.getElementById('pieChartIncomes').getContext('2d');
        this.ctxExpenses = document.getElementById('pieChartExpenses').getContext('2d');
        this.myPieChartIncomes = new Chart(this.ctxIncomes, this.configIncomes);
        this.myPieChartExpenses = new Chart(this.ctxExpenses, this.configExpenses);
    }
}