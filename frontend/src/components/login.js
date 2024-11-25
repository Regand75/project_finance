(function () {
    const Login = {
        processElement: null,
        rememberMeElement: null,
        fields: [
            {
                name: 'email',
                id: 'email',
                element: null,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                valid: false,
            },
        ],
        init() {
            this.fields.forEach(item => {
                item.element = document.getElementById(item.id);
                item.element.onchange = () => {
                    this.validateField(item, item.element);
                }
            });

            this.rememberMeElement = document.getElementById('remember-me'); // checkbox 'Запомнить меня'

            this.processElement = document.getElementById('process-button');
            this.processElement.onchange = () => {
                this.validateForm();
            }
        },

        validateField(field, element) {
            if (!element.value) {
                element.classList.add('is-invalid');
                field.valid = false;
            } else {
                element.classList.remove('is-invalid');
                field.valid = true;
            }
            this.validateForm();
        },

        validateForm() {
            const validForm = this.fields.every(item => item.valid);
            if (validForm) {
                this.processElement.removeAttribute('disabled');
            } else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
        },
    };

    Login.init();
})();
