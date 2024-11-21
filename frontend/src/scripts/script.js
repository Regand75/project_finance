const burgerElement = document.getElementById("burger");
const sidebarElement = document.getElementById("sidebar");
const modalOverlayElement = document.getElementById("modal-overlay");
const buttonDeleteIncomeElements = document.querySelectorAll('.income-delete');
const buttonDeleteExpenseElements = document.querySelectorAll('.expense-delete');
const buttonDeleteIncomeExpenseElement = document.querySelectorAll(".income-expense-delete");
const buttonNoDeleteElement = document.getElementById("no-delete");
const userIconElement = document.getElementById("user-icon");
const dropdownMenuElement = document.getElementById("dropdown-menu");

burgerElement.addEventListener('click', showSidebar);

buttonDeleteIncomeElements.forEach(button => {
    button.addEventListener('click', showModal);
});

if (buttonNoDeleteElement) {
    buttonNoDeleteElement.addEventListener('click', hideModal);
}

buttonDeleteExpenseElements.forEach(button => {
    button.addEventListener('click', showModal);
});

userIconElement.addEventListener('click', showLogout);

buttonDeleteIncomeExpenseElement.forEach(button => {
    button.addEventListener('click', showModal);
})


function showSidebar() {
    sidebarElement.classList.toggle("d-none");
    sidebarElement.classList.toggle("d-flex");
    sidebarElement.classList.toggle("sidebar-background");
    burgerElement.classList.toggle("burger-margin");
}

function showModal() {
    modalOverlayElement.classList.add("active");
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    modalOverlayElement.classList.remove("active");
    document.body.style.overflow = '';
}

function showLogout() {
    dropdownMenuElement.classList.toggle('show');
}

