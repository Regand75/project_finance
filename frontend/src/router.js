import {Form} from "./components/form.js";

export class Router {
    constructor() {
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'src/templates/pages/index.html',
                styles: 'src/styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/login',
                title: 'Вход',
                template: 'src/templates/pages/auth/login.html',
                styles: 'src/styles/index.css',
                load: () => {
                    new Form();
                }
            },
            {
                route: '#/sign-up',
                title: 'Регистрация',
                template: 'src/templates/pages/auth/sign-up.html',
                styles: 'src/styles/index.css',
                load: () => {
                    new Form();
                }
            },
            {
                route: '#/incomes-expenses',
                title: 'Доходы и расходы',
                template: 'src/templates/pages/incomes-expenses/incomes-expenses.html',
                styles: 'src/styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/incomes-expenses/edit',
                title: 'Доходы и расходы',
                template: 'src/templates/pages/incomes-expenses/edit.html',
                styles: 'src/styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/incomes-expenses/creating',
                title: 'Доходы и расходы',
                template: 'src/templates/pages/incomes-expenses/creating.html',
                styles: 'src/styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/incomes',
                title: 'Доходы',
                template: 'src/templates/pages/incomes/incomes.html',
                styles: 'src/styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/incomes/edit',
                title: 'Редактирование доходов',
                template: 'src/templates/pages/incomes/edit.html',
                styles: 'src/styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/incomes/creating',
                title: 'Создание доходов',
                template: 'src/templates/pages/incomes/creating.html',
                styles: 'src/styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/expenses',
                title: 'Расходы',
                template: 'src/templates/pages/expenses/expenses.html',
                styles: 'src/styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/expenses/edit',
                title: 'Редактирование расходов',
                template: 'src/templates/pages/expenses/edit.html',
                styles: 'src/styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/expenses/creating',
                title: 'Создание расходов',
                template: 'src/templates/pages/expenses/creating.html',
                styles: 'src/styles/index.css',
                load: () => {

                }
            },
        ]
    }

    async openRoute() {
        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash;
        });

        if (!newRoute) {
            window.location.hash = '/';
            return;
        }

        document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());
        document.getElementById('styles').setAttribute('href', newRoute.styles);
        document.getElementById('title').innerText = newRoute.title;
        newRoute.load();
    }
}