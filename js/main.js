// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const sidebarMenu = document.getElementById('sidebarMenu');

    // Só adiciona o evento se o botão de abrir E a sidebar existirem na página
    if (menuToggle && sidebarMenu) {
        menuToggle.addEventListener('click', () => {
            sidebarMenu.classList.toggle('collapsed');
            console.log("↔️ Menu lateral alternado.");
        });
    }

    // Só adiciona o evento de fechar se o botão de fechar E a sidebar existirem
    if (closeMenu && sidebarMenu) {
        closeMenu.addEventListener('click', () => {
            sidebarMenu.classList.add('collapsed');
            console.log("🔒 Menu lateral fechado.");
        });
    }
});