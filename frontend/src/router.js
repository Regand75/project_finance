import {Main} from "./components/main.js";
import {Incomes} from "./components/incomes/incomes.js";
import {Expenses} from "./components/expenses/expenses.js";
import {OperationsList} from "./components/operations/operations-list.js";
import {AuthUtils} from "./utils/auth-utils.js";
import {Logout} from "./components/auth/logout.js";
import {Form} from "./components/auth/form.js";
import {IncomeCreating} from "./components/incomes/incoome-creating.js";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        this.toggleElement = null;
        this.activeBlockElement = null;
        this.listElement = null;
        this.collapsedSvgElement = null;
        this.currentRoute = '#/login';
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
                route: '#/operations',
                title: 'Доходы и расходы',
                template: 'src/templates/pages/operations/list.html',
                useLayout: 'src/templates/layout.html',
                load: () => {
                    new OperationsList();
                },
                styles: [
                    'layout.css',
                    'index.css',
                    'adaptive.css',
                ],
            },
            {
                route: '#/operations/edit',
                title: 'Доходы и расходы',
                template: 'src/templates/pages/operations/edit.html',
                useLayout: 'src/templates/layout.html',
                load: () => {

                },
                styles: [
                    'layout.css',
                    'index.css',
                    'adaptive.css',
                ],
            },
            {
                route: '#/operations/creating',
                title: 'Доходы и расходы',
                template: 'src/templates/pages/operations/creating.html',
                useLayout: 'src/templates/layout.html',
                load: () => {

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
                title: 'Создание дохода',
                template: 'src/templates/pages/incomes/creating.html',
                useLayout: 'src/templates/layout.html',
                load: () => {
                    new IncomeCreating();
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
        const previousRoute = this.currentRoute; // Сохраняем предыдущий маршрут
        this.currentRoute = window.location.hash; // Обновляем текущий маршрут
        // Находим объект маршрута для предыдущего
        const previousRouteObject = this.routes.find(route => route.route === previousRoute);
        if (previousRouteObject.styles && previousRouteObject.styles.length > 0) {
            // находим и удаляем старые стили
            previousRouteObject.styles.forEach(style => {
                const linkElement = document.querySelector(`link[href='src/styles/${style}']`);
                if (linkElement) {
                    linkElement.remove();
                }
            });
        }

        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash;
        });

        if (newRoute) {
            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title;
            }

            if (newRoute.styles && newRoute.styles.length > 0) {
                newRoute.styles.forEach(style => {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = `src/styles/${style}`;
                    document.head.appendChild(link);
                });
            }

            if (newRoute.template) {
                let contentBlock = this.contentPageElement;
                this.contentPageElement.classList.remove('content-center-auth');

                if (newRoute.useLayout) {
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');
                    this.profileUserElement = document.getElementById('profile-user');
                    const userInfo = AuthUtils.getUserInfo();

                    if (userInfo && userInfo.name && userInfo.lastName) {
                        this.profileUserElement.innerText = `${userInfo.name} ${userInfo.lastName}`;
                    }

                    this.burgerElement = document.getElementById("burger");
                    this.sidebarElement = document.getElementById("sidebar");
                    this.toggleElement = document.getElementById('toggle');
                    this.activeBlockElement = document.getElementById('active-block');
                    this.listElement = document.getElementById('dashboard-collapse');
                    this.collapsedSvgElement = document.getElementById('collapsed-svg');
                    this.userIconElement = document.getElementById("user-icon");
                    this.dropdownMenuElement = document.getElementById("dropdown-menu");
                    this.userIconElement.addEventListener('click', this.showLogout.bind(this));

                    this.burgerElement.addEventListener('click', this.showSidebar.bind(this));

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
            window.location = '#/login';
            console.log('No route found');
        }
    }

    activateMenuItem(route) {
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if ((route.route.includes(href) && href !== '#/') || (route.route === "#/" && href === '#/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
            if (route.route.includes('#/incomes') || route.route.includes('#/expenses')) {
                this.toggleElement.classList.add('active');
                this.activeBlockElement.classList.add('active-block');
                this.toggleElement.classList.remove('collapsed');
                this.listElement.classList.add('show');
                this.collapsedSvgElement.classList.add('collapsed');
            } else {
                this.toggleElement.classList.remove('active');
                this.activeBlockElement.classList.remove('active-block');
                this.toggleElement.classList.add('collapsed');
                this.listElement.classList.remove('show');
                this.collapsedSvgElement.classList.remove('collapsed');
            }
        });
    }

    showSidebar() {
        this.sidebarElement.classList.toggle("d-none");
        this.sidebarElement.classList.toggle("d-flex");
        this.sidebarElement.classList.toggle("sidebar-background");
        this.burgerElement.classList.toggle("burger-margin");
    }

    showLogout() {
        this.dropdownMenuElement.classList.toggle('show');
    }
}