export class ModalManager {

    static showModal() {
        document.getElementById("modal-overlay").classList.add("active");
        document.body.style.overflow = 'hidden';
    }

    static hideModal() {
        document.getElementById("modal-overlay").classList.remove("active");
        document.body.style.overflow = '';
    }

}
