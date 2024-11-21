// import Chart from 'chart.js/auto';

const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'], // Названия категорий
    datasets: [
        {
            label: 'My Dataset',
            data: [10, 20, 30, 15, 25], // Ваши значения
            borderWidth: 1 // Толщина границ
        }
    ]
};

const config = {
    type: 'pie', // Тип диаграммы
    data: data, // Подключение данных
    options: {
        responsive: true, // Диаграмма адаптируется к размерам контейнера
        plugins: {
            legend: {
                position: 'top', // Положение легенды
            },
            // title: {
            //     display: true, // Включение заголовка
            //     text: 'My Pie Chart' // Текст заголовка
            // }
        }
    },
};

// Инициализация диаграммы
const ctxIncomes = document.getElementById('pieChartIncomes').getContext('2d');
const ctxExpenses = document.getElementById('pieChartExpenses').getContext('2d');
const myPieChartIncomes = new Chart(ctxIncomes, config);
const myPieChartExpenses = new Chart(ctxExpenses, config);