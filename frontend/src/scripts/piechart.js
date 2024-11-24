
const dataIncomes = {
    labels: ['Депозиты', 'Зарплата', 'Сбережения', 'Инвестиции'],
    datasets: [
        {
            label: 'My Dataset',
            data: [10, 30, 5, 25],
            borderWidth: 1 // Толщина границ
        }
    ]
};

const configIncomes = {
    type: 'pie',
    data: dataIncomes, // Подключение данных
    options: {
        responsive: true, // Диаграмма адаптируется к размерам контейнера
        plugins: {
            legend: {
                position: 'top', // Положение легенды
            },
        }
    },
};
const dataExpenses = {
    labels: ['Еда', 'Жильё', 'Здоровье', 'Кафе', 'Авто', 'Одежда', 'Развлечения', 'Счета', 'Спорт'],
    datasets: [
        {
            label: 'My Dataset',
            data: [30, 20, 15, 15, 10, 15, 10, 5, 12],
            borderWidth: 1 // Толщина границ
        }
    ]
};

const configExpenses = {
    type: 'pie',
    data: dataExpenses, // Подключение данных
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
const ctxIncomes = document.getElementById('pieChartIncomes').getContext('2d');
const ctxExpenses = document.getElementById('pieChartExpenses').getContext('2d');
const myPieChartIncomes = new Chart(ctxIncomes, configIncomes);
const myPieChartExpenses = new Chart(ctxExpenses, configExpenses);