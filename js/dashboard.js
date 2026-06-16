document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('menuToggleBtn');
    const sidebar = document.getElementById('sidebarMenu');
    const mainContent = document.getElementById('mainAdminContent');

    if (toggleBtn && sidebar && mainContent) {
        toggleBtn.addEventListener('click', () => {
            // Alterna a classe 'collapsed' na sidebar (colapsa/minimiza)
            sidebar.classList.toggle('collapsed');
            
            // Alterna a classe 'expanded' no conteúdo principal (faz o texto ganhar mais espaço)
            mainContent.classList.toggle('expanded');
        });
    }
});