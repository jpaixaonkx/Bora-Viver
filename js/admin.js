document.addEventListener('DOMContentLoaded', () => {
    // --- CONTROLE DAS ABAS NATIVAS SEM REFRESH ---
    const navLinks = document.querySelectorAll('.admin-nav-link');
    const sections = document.querySelectorAll('.admin-section-view');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetTab = link.getAttribute('data-tab');
            if(!targetTab) return;

            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-view'));

            link.classList.add('active');
            
            const targetSection = document.getElementById(targetTab);
            if (targetSection) {
                targetSection.classList.add('active-view');
            }
        });
    });

    // --- SCRIPT DE BUSCA EM PORTAIS PARCEIROS ---
    const btnSearch = document.getElementById('btnSearchPortals');
    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            const query = document.getElementById('searchQuery').value.trim();
            const container = document.getElementById('portals-results-container');
            
            if(!query) {
                alert("Digite um destino para buscar!");
                return;
            }

            // Links parametrizados com a busca informada
            container.innerHTML = `
                <div style="margin-top:20px; background:rgba(255,255,255,0.02); padding:20px; border-radius:12px;">
                    <h4>Resultados de Links Gerados para "${query}":</h4>
                    <p style="margin: 10px 0;">👉 <a href="https://www.skyscanner.com.br/transporte/passagens-para/${encodeURIComponent(query)}" target="_blank" style="color:#FFCC00; text-decoration:none; font-weight:bold;">Verificar Voos no SkyScanner</a></p>
                    <p style="margin: 10px 0;">👉 <a href="https://www.booking.com/searchresults.pt-br.html?ss=${encodeURIComponent(query)}" target="_blank" style="color:#0082A3; text-decoration:none; font-weight:bold;">Verificar Hoteis no Booking.com</a></p>
                </div>
            `;
        });
    }

    // --- FUNÇÃO PARA CARREGAR CONFIGURAÇÕES INICIAIS DO BANCO ---
    // Isso traz do Supabase os valores já salvos e preenche nos inputs automaticamente
    async function carregarConfiguracoesIniciais() {
        if (typeof supabase !== 'undefined') {
            try {
                const { data, error } = await supabase
                    .from('configuracoes')
                    .select('*')
                    .eq('id', 1)
                    .single();

                if (error && error.code !== 'PGRST116') throw error; // Ignora se não achar registros

                if (data) {
                    const promoInput = document.getElementById('promoTitle');
                    const whatsInput = document.getElementById('linkWhats');
                    const instaInput = document.getElementById('linkInsta');

                    if (promoInput && data.texto_banner) promoInput.value = data.texto_banner;
                    if (whatsInput && data.whatsapp_url) whatsInput.value = data.whatsapp_url;
                    if (instaInput && data.instagram_url) instaInput.value = data.instagram_url;
                }
            } catch (err) {
                console.error("Erro ao carregar dados iniciais no admin.js:", err.message);
            }
        }
    }

    // Executa a carga inicial após 1 segundo para dar tempo do Supabase iniciar no HTML
    setTimeout(carregarConfiguracoesIniciais, 1000);
});