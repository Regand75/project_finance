import {Main} from "./components/main.js";
import {Incomes} from "./components/incomes.js";
import {Expenses} from "./components/expenses.js";
import {IncomesExpense} from "./components/incomes-expenses.js";
import {Form} from "./components/auth/form.js";
import {Auth} from "./services/auth.js";
import {Logout} from "./components/auth/logout.js";

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
                template: 'src/templates/pages/main.html',
                useLayout: 'src/templates/layout.html',
                load: () => {
                    new Main();
                },
                styles: [
                    'layout.css',
                    'index.css',
                    'adaptive.css',
                ],
            },
            {
                route: '#/login',
                title: 'Вход',
                template: 'src/templates/pages/auth/login.html',
                useLayout: false,
                load: () => {
                    new Form('login');
                },
                styles: [
                    'auth.css',
                ],
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'src/templates/pages/auth/signup.html',
                useLayout: false,
                load: () => {
                    new Form('signup');
                },
                styles: [
                    'auth.css',
                ],
            },
            {
                route: '#/logout',
                load: () => {
                    new Logout();
                }
            },
            {
                route: '#/incomes-expenses',
                title: 'Доходы и расходы',
                template: 'src/templates/pages/incomes-expenses/incomes-expenses.html',
                useLayout: 'src/templates/layout.html',
                load: () => {
                    new IncomesExpense();
                },
                styles: [
                    'layout.css',
                    'index.css',
                    'adaptive.css',
                ],
            },
            {
                route: '#/incomes-expenses/edit',
                title: 'Доходы и расходы',
                template: 'src/templates/pages/incomes-expenses/edit.html',
                useLayout: 'src/templates/layout.html',
                load: () => {
                    new IncomesExpense();
                },
                styles: [
                    'layout.css',
                    'index.css',
                    'adaptive.css',
                ],
            },
            {
                route: '#/incomes-expenses/creating',
                title: 'Доходы и расходы',
                template: 'src/templates/pages/incomes-expenses/creating.html',
                useLayout: 'src/templates/layout.html',
                load: () => {
                    new IncomesExpense(t);
                },
                styles: [
                    'layout.css',
                    'index.css',
                    'adaptive.css',
                ],
            },
            {
                route: '#/incomes',
                title: 'Доходы',
                template: 'src/templates/pages/incomes/incomes.html',
                useLayout: 'src/templates/layout.html',
                load: () => {
                    new Incomes();
                },
                styles: [
                    'layout.css',
                    'index.css',
                    'adaptive.css',
                ],
            },
            {
                route: '#/incomes/edit',
                title: 'Редактирование доходов',
                template: 'src/templates/pages/incomes/edit.html',
                useLayout: 'src/templates/layout.html',
                load: () => {
                    new Incomes();
                },
                styles: [
                    'layout.css',
                    'index.css',
                    'adaptive.css',
                ],
            },
            {
                route: '#/incomes/creating',
                title: 'Создание доходов',
                template: 'src/templates/pages/incomes/creating.html',
                useLayout: 'src/templates/layout.html',
                load: () => {
                    new Incomes();
                },
                styles: [
                    'layout.css',
                    'index.css',
                    'adaptive.css',
                ],
            },
            {
                route: '#/expenses',
                title: 'Расходы',
                template: 'src/templates/pages/expenses/expenses.html',
                useLayout: 'src/templates/layout.html',
                load: () => {
                    new Expenses();
                },
                styles: [
                    'layout.css',
                    'index.css',
                    'adaptive.css',
                ],
            },
            {
                route: '#/expenses/edit',
                title: 'Редактирование расходов',
                template: 'src/templates/pages/expenses/edit.html',
                useLayout: 'src/templates/layout.html',
                load: () => {
                    new Expenses();
                },
                styles: [
                    'layout.css',
                    'index.css',
                    'adaptive.css',
                ],
            },
            {
                route: '#/expenses/creating',
                title: 'Создание расходов',
                template: 'src/templates/pages/expenses/creating.html',
                useLayout: 'src/templates/layout.html',
                load: () => {
                    new Expenses();
                },
                styles: [
                    'layout.css',
                    'index.css',
                    'adaptive.css',
                ],
            },
        ]
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
    }

    async activateRoute() {
        // const oldRoute = window.location.hash.split('?')[0]; // получаем текущий путь URL из адресной строки
        // if (oldRoute) {
        //     const currentRoute = this.routes.find(item => item.route === oldRoute); // берем старый route
        //     if (currentRoute.styles && currentRoute.styles.length > 0) {
        //         // находим и удаляем старые стили
        //         currentRoute.styles.forEach(style => {
        //             const linkElement = document.querySelector(`link[href='src/styles/${style}']`);
        //             if (linkElement) {
        //                 linkElement.remove();
        //             }
        //         });
        //     }
        // }

        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash;
        });

        if (newRoute) {
            const urlRoute = window.location.hash.split('?')[0];
            if (urlRoute === '#/logout') {
                Auth.removeToken();
                localStorage.removeItem(Auth.userInfoKey);
                window.location.href = '#/login';
                return;
            }

            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title;
            }

            // if (newRoute.styles && newRoute.styles.length > 0) {
            //     newRoute.styles.forEach(style => {
            //         const link = document.createElement('link');
            //         link.rel = 'stylesheet';
            //         link.href = `src/styles/${style}`;
            //         document.head.appendChild(link);
            //     });
            // }

            if (newRoute.template) {
                let contentBlock = this.contentPageElement;
                this.contentPageElement.classList.remove('content-center-auth');
                if (newRoute.useLayout) {
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');

                    this.profileUserElement = document.getElementById('profile-user');
                    const userInfo = Auth.getUserInfo();
                    if (userInfo && userInfo.name && userInfo.lastName) {
                        this.profileUserElement.innerText = `${userInfo.name} ${userInfo.lastName}`;
                    }

                    this.userIconElement = document.getElementById("user-icon");
                    this.dropdownMenuElement = document.getElementById("dropdown-menu");
                    this.userIconElement.addEventListener('click', this.showLogout.bind(this));

                    this.activateMenuItem(newRoute);
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
            console.log('No route found');
        }
    }
    activateMenuItem(route) {
        document.querySelectorAll('.sidebar-menu .nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if ((route.route.includes(href) && href !== '#/') || (route.route === "#/" && href === '#/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        })
    }

    showLogout() {
        this.dropdownMenuElement.classList.toggle('show');
    }
}