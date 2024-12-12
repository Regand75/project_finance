export class OperationCreating {
    constructor() {
        const categoryData = sessionStorage.getItem('categoryData');
        if (categoryData) {
            const {id, title} = JSON.parse(categoryData);
        } else {
            window.history.back();
        }
        document.getElementById('operation-creating').addEventListener('click', this.saveOperation.bind(this));
        document.getElementById('button-back').addEventListener('click', () => {
            window.history.back();
        });
        this.typeElement = document.getElementById('type');
        this.categoryElement = document.getElementById('category');
        this.amountInputElement = document.getElementById('amountInput');
        this.dageInputElement = document.getElementById('dateInput');
        this.commentInputElement = document.getElementById('commentInput');
    }

    saveOperation(e) {
        e.preventDefault();
    }
}