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