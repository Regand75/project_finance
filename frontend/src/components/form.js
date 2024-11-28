export class Form {
    constructor(page) {
        this.processElement = null;
        this.rememberMeElement = null;
        this.page = page;
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

        if (this.page === 'sign-up') {
            this.fields.unshift(
                {
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+(?:\s[А-ЯЁ][а-яё]+)?$/,
                    valid: false,
                },)
            this.fields.push(
                {
                    name: 'repeat-password',
                    id: 'repeat-password',
                    element: null,
                    valid: false,
                },)
        }

        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = () => {
                this.validateField(item, item.element);
            }
        });

        if (this.page === 'login') {
            this.rememberMeElement = document.getElementById('remember-me'); // checkbox 'Запомнить меня'
        }

        this.processElement = document.getElementById('process-button');
        this.processElement.onclick = () => {
            this.processForm();
        }
    }

    validateField(field, element) {
        if (field.name === 'repeat-password') {
            const passwordField = this.fields.find(item => item.name === 'password');
            if (!element.value || element.value !== passwordField.element.value) {
                element.classList.add('is-invalid');
                field.valid = false;
            } else {
                element.classList.remove('is-invalid');
                field.valid = true;
            }
        } else if (!element.value || !element.value.match(field.regex)) {
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

    processForm() {
        if (this.validateForm()) {
            location.href = '#/index';
        }
    };
}

