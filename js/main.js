// js/main.js
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebarMenu').classList.toggle('collapsed');
});
document.getElementById('closeMenu').addEventListener('click', () => {
    document.getElementById('sidebarMenu').classList.add('collapsed');
});