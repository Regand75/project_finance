import {Form} from "./components/form.js";
import {Main} from "./components/main.js";
import {Incomes} from "./components/incomes.js";
import {Expenses} from "./components/expenses.js";
import {IncomesExpense} from "./components/incomes-expenses.js";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        this.styleElement = document.getElementById('styles');
        this.initEvents();
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'src/templates/pages/index.html',
                useLayout: 'src/templates/layout.html',
                // styles: 'src/styles/index.css',
                load: () => {
                    new Main();
                }
            },
            {
                route: '#/login',
                title: 'Вход',
                template: 'src/templates/pages/auth/login.html',
                useLayout: false,
                // styles: 'src/styles/index.css',
                load: () => {
                    new Form('login');
                }
            },
            {
                route: '#/sign-up',
                title: 'Регистрация',
                template: 'src/templates/pages/auth/sign-up.html',
                useLayout: false,
                // styles: 'src/styles/index.css',
                load: () => {
                    new Form('sign-up');
                }
            },
            {
                route: '#/incomes-expenses',
                title: 'Доходы и расходы',
                template: 'src/templates/pages/incomes-expenses/incomes-expenses.html',
                useLayout: 'src/templates/layout.html',
                // styles: 'src/styles/index.css',
                load: () => {
                    new IncomesExpense();
                }
            },
            {
                route: '#/incomes-expenses/edit',
                title: 'Доходы и расходы',
                template: 'src/templates/pages/incomes-expenses/edit.html',
                useLayout: 'src/templates/layout.html',
                // styles: 'src/styles/index.css',
                load: () => {
                    new IncomesExpense();
                }
            },
            {
                route: '#/incomes-expenses/creating',
                title: 'Доходы и расходы',
                template: 'src/templates/pages/incomes-expenses/creating.html',
                useLayout: 'src/templates/layout.html',
                // styles: 'src/styles/index.css',
                load: () => {
                    new IncomesExpense();
                }
            },
            {
                route: '#/incomes',
                title: 'Доходы',
                template: 'src/templates/pages/incomes/incomes.html',
                useLayout: 'src/templates/layout.html',
                // styles: 'src/styles/index.css',
                load: () => {
                    new Incomes();
                }
            },
            {
                route: '#/incomes/edit',
                title: 'Редактирование доходов',
                template: 'src/templates/pages/incomes/edit.html',
                useLayout: 'src/templates/layout.html',
                // styles: 'src/styles/index.css',
                load: () => {
                    new Incomes();
                }
            },
            {
                route: '#/incomes/creating',
                title: 'Создание доходов',
                template: 'src/templates/pages/incomes/creating.html',
                useLayout: 'src/templates/layout.html',
                // styles: 'src/styles/index.css',
                load: () => {
                    new Incomes();
                }
            },
            {
                route: '#/expenses',
                title: 'Расходы',
                template: 'src/templates/pages/expenses/expenses.html',
                useLayout: 'src/templates/layout.html',
                // styles: 'src/styles/index.css',
                load: () => {
                    new Expenses();
                }
            },
            {
                route: '#/expenses/edit',
                title: 'Редактирование расходов',
                template: 'src/templates/pages/expenses/edit.html',
                useLayout: 'src/templates/layout.html',
                // styles: 'src/styles/index.css',
                load: () => {
                    new Expenses();
                }
            },
            {
                route: '#/expenses/creating',
                title: 'Создание расходов',
                template: 'src/templates/pages/expenses/creating.html',
                useLayout: 'src/templates/layout.html',
                // styles: 'src/styles/index.css',
                load: () => {
                    new Expenses();
                }
            },
        ]
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        // document.addEventListener('click', this.clickHandler.bind(this));
    }

    async activateRoute() {
        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash;
        });

        if (newRoute) {
            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title;
            }
            if (newRoute.template) {
                let contentBlock = this.contentPageElement;
                this.contentPageElement.classList.remove('content-center-auth');
                if (newRoute.useLayout) {
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');
                } else {
                    this.contentPageElement.classList.add('content-center-auth');
                }
                contentBlock.innerHTML = await fetch(newRoute.template).then(response => response.text());
            }
            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }
        } else {
            window.location = '#/';
            return;
        }

    }
}