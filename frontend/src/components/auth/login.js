import {CustomHttp} from "../../services/custom-http.js";
import config from "../../../config/config.js";
import {Auth} from "../../services/auth.js";

export class Login {
    constructor() {

    this.processElement = null;
    this.rememberMeElement = null;
    this.commonErrorElement = null;
        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            },
        ];

        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = () => {
                this.validateField(item, item.element);
            }
        });

        this.rememberMeElement = document.getElementById('rememberMe');
        this.commonErrorElement = document.getElementById('common-error');
        this.processElement = document.getElementById('process-button');
        this.processElement.addEventListener('click', this.processForm.bind(this));
    }

    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.classList.add('is-invalid');
            field.valid = false;
        } else {
            element.classList.remove('is-invalid');
            field.valid = true;
        }
        this.validateForm();
    };

    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        if (validForm) {
            this.processElement.removeAttribute('disabled');
        } else {
            this.processElement.setAttribute('disabled', 'disabled');
        }
        return validForm;
    };

    async processForm() {
        this.commonErrorElement.style.display = 'none';
        if (this.validateForm()) {
            const email = this.fields.find(item => item.name === 'email').element.value;
            const password = this.fields.find(item => item.name === 'password').element.value;

            try {
                const result = await CustomHttp.request(config.host + '/login', 'POST', {
                    email: email,
                    password: password,
                    rememberMe: this.rememberMeElement.checked,
                });
                if (result) {
                    if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken || !result.user.name || !result.user.lastName || !result.user.id) {
                        this.commonErrorElement.style.display = 'block';
                        throw new Error(result.message);
                    }
                    Auth.setToken(result.tokens.accessToken, result.tokens.refreshToken);
                    Auth.setUserInfo({
                        name: result.user.name,
                        lastName: result.user.lastName,
                        id: result.user.id,
                    });
                    location.href = '#/';
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
}

