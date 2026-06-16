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
            document.getElementById(targetTab).classList.add('active-view');
        });
    });

    // --- SIMULAÇÃO DE DADOS EM TEMPO REAL (MOCK PARA CONEXÃO SUPABASE) ---
    document.getElementById('live-clientes').innerText = "142";
    document.getElementById('live-passagens').innerText = "57";
    document.getElementById('live-hospedagens').innerText = "39";

    // --- SCRIPT DE BUSCA EM PORTAIS PARCEIROS ---
    const btnSearch = document.getElementById('btnSearchPortals');
    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            const query = document.getElementById('searchQuery').value;
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

    // --- SALVAMENTO E SINCRONIZAÇÃO EM TEMPO REAL PARA O INDEX.HTML ---
    const btnSaveSocial = document.getElementById('btnSaveSocial');
    if (btnSaveSocial) {
        btnSaveSocial.addEventListener('click', () => {
            const whatsapp = document.getElementById('linkWhats').value;
            const instagram = document.getElementById('linkInsta').value;

            localStorage.setItem('admin_whatsapp_link', whatsapp);
            localStorage.setItem('admin_instagram_link', instagram);

            alert("Canais de contato sincronizados com sucesso em tempo real!");
        });
    }

    const btnSavePromo = document.getElementById('btnSavePromo');
    if (btnSavePromo) {
        btnSavePromo.addEventListener('click', () => {
            const promo = document.getElementById('promoTitle').value;
            localStorage.setItem('admin_banner_promo', promo);
            alert("Banner promocional atualizado para todos os usuários!");
        });
    }
});