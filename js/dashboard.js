// js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    // Busca os IDs padrão ou as classes alternativas usadas no admin.html
    const toggleBtn = document.getElementById('menuToggleBtn') || document.querySelector('.sidebar-header');
    const sidebar = document.getElementById('sidebarMenu') || document.querySelector('.sidebar-floating');
    const mainContent = document.getElementById('mainAdminContent') || document.querySelector('.admin-wrapper');

    if (toggleBtn && sidebar && mainContent) {
        toggleBtn.addEventListener('click', () => {
            // Alterna a classe 'collapsed' na sidebar (colapsa/minimiza)
            sidebar.classList.toggle('collapsed');
            
            // Alterna a classe 'expanded' no conteúdo principal
            mainContent.classList.toggle('expanded');
            
            console.log("↔️ Menu lateral alternado com sucesso.");
        });
    } else {
        // Log preventivo silencioso para indicar que a página atual não usa menu colapsável
        console.log("ℹ️ Elementos de menu lateral não encontrados nesta página.");
    }
});