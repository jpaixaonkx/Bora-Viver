# 🛫 BORA VIVER VIAGENS — Esqueleto do App
## Estrutura de Arquivos para VS Code Terminal

```
boraviver-app/
│
├── index.html                    ← PÁGINA PRINCIPAL (já criada) — Animação 3D Three.js, avião interativo com mouse
│
├── assets/
│   ├── logo.png                  ← Logotipo fornecido
│   ├── fonts/                    ← Fontes customizadas (opcional)
│   └── icons/                    ← Ícones SVG personalizados
│
├── css/
│   ├── variables.css             ← Paleta: --pink #D4006A, --blue #1A73C6, --yellow #F5C518, --cyan #00B4D8
│   ├── global.css                ← Reset, tipografia, utilitários, animações globais
│   ├── components.css            ← Botões flutuantes, cards, modais, badges
│   └── animations.css            ← Keyframes 3D, hover effects, transitions
│
├── js/
│   ├── three-scene.js            ← Cena 3D principal (Three.js r128)
│   ├── auth.js                   ← Login, cadastro, JWT, validação de formulários
│   ├── api.js                    ← Chamadas ao backend (fetch wrapper)
│   ├── masks.js                  ← Máscaras CPF, CEP, telefone, cartão
│   └── router.js                 ← SPA routing (hashbang ou History API)
│
│
│ ════════════════════════════════════════════
│  ÁREA DO CLIENTE
│ ════════════════════════════════════════════
│
├── cliente/
│   ├── dashboard-cliente.html    ← Home do cliente: busca rápida, próximas viagens, ofertas personalizadas
│   │
│   ├── passagens/
│   │   ├── busca.html            ← Busca de voos: origem/destino, datas, passageiros, classe
│   │   ├── resultados.html       ← Lista de voos com filtros: preço, cia aérea, escalas, horário
│   │   └── checkout.html        ← Seleção de assento, bagagem, dados passageiros, pagamento
│   │
│   ├── hospedagem/
│   │   ├── busca.html            ← Busca de hotéis: destino, datas, hóspedes, categoria
│   │   ├── resultados.html       ← Mapa + lista, filtros: estrelas, preço, amenidades
│   │   ├── detalhe.html          ← Fotos, avaliações, quartos, localização, disponibilidade
│   │   └── checkout.html        ← Reserva, dados, pagamento
│   │
│   ├── pacotes/
│   │   ├── busca.html            ← Pacotes completos: destino, duração, tipo (lua de mel, família, aventura)
│   │   ├── resultados.html       ← Cards de pacotes com economia destacada
│   │   └── detalhe.html          ← Itinerário dia a dia, o que está incluso, fotos, reserva
│   │
│   ├── aluguel-carro/
│   │   ├── busca.html            ← Local, datas, tipo de carro
│   │   └── resultados.html       ← Comparativo locadoras com fotos dos veículos
│   │
│   ├── seguro-viagem/
│   │   ├── cobertura.html        ← Planos de seguro com comparativo de coberturas
│   │   └── checkout.html        ← Dados, declaração de saúde, pagamento
│   │
│   ├── minha-conta/
│   │   ├── perfil.html           ← Dados pessoais, foto, documentos, preferências
│   │   ├── minhas-viagens.html   ← Próximas e passadas, status em tempo real, check-in
│   │   ├── favoritos.html        ← Destinos e hotéis salvos
│   │   ├── avaliacoes.html       ← Avaliações deixadas e pendentes
│   │   ├── pagamentos.html       ← Cartões salvos, histórico de transações, notas fiscais
│   │   └── notificacoes.html     ← Alertas de preço, lembretes, promoções personalizadas
│   │
│   └── suporte/
│       ├── central.html          ← FAQ, chat ao vivo, tickets abertos
│       └── ticket.html           ← Detalhe de ticket de suporte
│
│
│ ════════════════════════════════════════════
│  ÁREA DO ADMINISTRADOR
│ ════════════════════════════════════════════
│
└── admin/
    ├── dashboard-admin.html      ← PAINEL PRINCIPAL: KPIs em tempo real, gráficos, alertas do sistema
    │
    ├── clientes/
    │   ├── lista.html            ← Tabela paginada com busca, filtros, exportar CSV/PDF
    │   ├── detalhe.html          ← Perfil completo: histórico de viagens, pagamentos, comportamento
    │   └── editar.html           ← Editar dados, status, bloquear conta
    │
    ├── vendas/
    │   ├── passagens.html        ← Faturamento passagens: gráficos, filtro por período, cia aérea
    │   ├── hospedagem.html       ← Faturamento hotéis: taxa de conversão, reservas, cancelamentos
    │   ├── pacotes.html          ← Faturamento pacotes: margem, destinos mais vendidos
    │   └── relatorios.html       ← Relatórios consolidados, exportação, BI
    │
    ├── catalogo/
    │   ├── destinos.html         ← CRUD de destinos, fotos, descrições, preços base
    │   ├── pacotes.html          ← CRUD de pacotes, montagem de itinerários
    │   ├── promocoes.html        ← Criar e gerenciar promoções, cupons de desconto
    │   └── banners.html          ← Banners do app, ordem, vigência
    │
    ├── financeiro/
    │   ├── faturamento.html      ← Receita total, comissões, repasses — atualização em tempo real
    │   ├── pagamentos.html       ← Transações, chargebacks, reembolsos
    │   └── metas.html            ← Metas por período, projeção de vendas
    │
    ├── configuracoes/
    │   ├── geral.html            ← Dados da empresa, logotipo, tema do app
    │   ├── integrações.html      ← APIs de parceiros: GDS, hotéis, pagamento
    │   └── permissoes.html       ← Usuários admin, papéis e permissões
    │
    └── sistema/
        ├── logs.html             ← Logs de acesso, erros, auditoria
        └── cache.html            ← Status do sistema, limpeza de cache


════════════════════════════════════════════
🎨 PALETA DE CORES (do logotipo)
════════════════════════════════════════════

--pink:       #D4006A   (BORA — rosa vibrante)
--pink-light: #FF2E8D
--blue:       #1A73C6   (VIVER — azul intenso)
--blue-dark:  #0F4A8A
--cyan:       #00B4D8   (acento de destaque)
--yellow:     #F5C518   (avião dourado do logo)
--dark:       #0a0f1e   (fundo escuro)
--glass:      rgba(255,255,255,0.07)  (cards glassmorphism)


════════════════════════════════════════════
⚙️ COMANDOS PARA CRIAR NO TERMINAL VS CODE
════════════════════════════════════════════

# 1. Criar a estrutura de pastas (Windows PowerShell)
mkdir boraviver-app
cd boraviver-app
mkdir assets, css, js, cliente, admin
mkdir cliente\passagens, cliente\hospedagem, cliente\pacotes
mkdir cliente\aluguel-carro, cliente\seguro-viagem
mkdir cliente\minha-conta, cliente\suporte
mkdir admin\clientes, admin\vendas, admin\catalogo
mkdir admin\financeiro, admin\configuracoes, admin\sistema

# 1b. Linux / Mac
mkdir -p boraviver-app/{assets/{fonts,icons},css,js,cliente/{passagens,hospedagem,pacotes,aluguel-carro,seguro-viagem,minha-conta,suporte},admin/{clientes,vendas,catalogo,financeiro,configuracoes,sistema}}
cd boraviver-app

# 2. Copiar o index.html para a raiz e rodar
# (Arraste o index.html gerado para a pasta raiz)

# 3. Instalar live server (recomendado)
npm install -g live-server
live-server --port=3000

# Ou com VS Code: instale a extensão "Live Server" e clique em "Go Live"


════════════════════════════════════════════
📱 TECNOLOGIAS UTILIZADAS
════════════════════════════════════════════

Frontend:
- HTML5 + CSS3 (Glassmorphism, Grid, Flexbox, CSS Variables)
- Three.js r128 (animações 3D — avião, nuvens, estrelas, parallax com mouse)
- Vanilla JS ES6+ (sem framework — leve e rápido para mobile)
- CSS Animations + Web Animations API

Integrações a implementar:
- ViaCEP API (preenchimento automático de endereço)
- Amadeus / Sabre GDS (passagens aéreas em tempo real)
- Booking.com Partner API (hospedagem)
- Stripe / Mercado Pago (pagamentos)
- Firebase / Supabase (banco de dados + auth em tempo real)
- OneSignal (push notifications)
- Twilio / WhatsApp Business (SMS e notificações)


════════════════════════════════════════════
🔗 ORDEM DE DESENVOLVIMENTO SUGERIDA
════════════════════════════════════════════

Fase 1 — Fundação
  [x] index.html (concluído — animação 3D + modal login/cadastro)
  [ ] variables.css + global.css + components.css
  [ ] auth.js (validação, máscaras, JWT mock)

Fase 2 — Cliente
  [ ] dashboard-cliente.html
  [ ] busca de passagens + resultados
  [ ] busca de hotéis + resultados
  [ ] minha-conta / perfil

Fase 3 — Admin
  [ ] dashboard-admin.html (KPIs, gráficos Chart.js, tempo real)
  [ ] lista de clientes com datatable
  [ ] faturamento com gráficos ao vivo

Fase 4 — Integração e Backend
  [ ] Conectar APIs reais (GDS, hotéis, pagamentos)
  [ ] WebSockets para dados em tempo real
  [ ] PWA (manifest + service worker para iOS/Android)
