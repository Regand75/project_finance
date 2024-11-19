const burgerElement = document.getElementById("burger");
const sidebarElement = document.getElementById("sidebar");

burgerElement.addEventListener("click", openSidebar);

function openSidebar() {
    sidebarElement.classList.toggle("d-none");
    sidebarElement.classList.toggle("d-flex");
    sidebarElement.classList.toggle("sidebar-background");
    burgerElement.classList.toggle("burger-margin");
}
