// ==========================================================================
// MOTOR 3D RECALIBRADO - SISTEMA DE 3 PONTOS + DECOLAGEM FRONTAL COMPLETA
// ==========================================================================

let cena, camera, renderizador, modeloAviao;
let flutuarClock = new THREE.Clock();

// Gerenciamento de Posições (0 = Esquerda / 1 = Centro / 2 = Direita)
let indicePosicaoAtual = 1; 

/* TABELA DE RADIANOS PARA OS 3 PONTOS:
   - Esquerda (Oeste): ~ -0.8 radianos
   - Centro (Frontal): 0 radianos
   - Direita (Leste): ~ 0.8 radianos
*/
const angulosY = [-0.8, 0, 0.8]; 

const container = document.getElementById('canvas-container3d');

function inicializar3D() {
    if (!container) return;

    cena = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderizador.setSize(container.clientWidth, container.clientHeight);
    renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderizador.domElement);

    // Iluminação estúdio para cobrir todos os ângulos (Esquerda, Centro e Direita)
    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.9);
    cena.add(luzAmbiente);

    const luzDirecional = new THREE.DirectionalLight(0xffffff, 1.2);
    luzDirecional.position.set(0, 5, 10); 
    cena.add(luzDirecional);

    const luzAzulEfeito = new THREE.PointLight(0x0082A3, 2, 10);
    luzAzulEfeito.position.set(-3, -2, 2);
    cena.add(luzAzulEfeito);

    const carregador = new THREE.GLTFLoader();
    
    carregador.load('public/assets/models/airplane.glb', (gltf) => {
        modeloAviao = gltf.scene;
        
        modeloAviao.position.set(0, 0, 0);
        
        // Começa na posição do Meio (Índice 1 = 0 radianos, cara a cara)
        modeloAviao.rotation.set(0.1, angulosY[indicePosicaoAtual], 0); 

        modeloAviao.scale.set(1.4, 1.4, 1.4);

        cena.add(modeloAviao);
        
        // Ativa interações de clique no elemento gráfico
        renderizador.domElement.style.pointerEvents = 'auto'; 
        container.style.pointerEvents = 'auto'; 
        
        renderizador.domElement.addEventListener('click', alternarEntreTresPontos);

        animarLoop();
    }, undefined, (erro) => {
        console.error('Erro ao carregar o modelo do avião:', erro);
    });
}

function animarLoop() {
    requestAnimationFrame(animarLoop);

    if (modeloAviao) {
        const tempo = flutuarClock.getElapsedTime();

        // Flutuação estável simulando sustentação
        modeloAviao.position.y = Math.sin(tempo * 1.5) * 0.12;
        modeloAviao.rotation.z = Math.cos(tempo * 1.5) * 0.02;
    }

    renderizador.render(cena, camera);
}

// 1. ALTERNA SEQUENCIALMENTE: ESQUERDA -> CENTRO -> DIREITA -> RETORNA
function alternarEntreTresPontos(event) {
    if (!modeloAviao) return;
    event.stopPropagation();

    // Avança no índice (se passar de 2, volta para o 0)
    indicePosicaoAtual = (indicePosicaoAtual + 1) % 3;
    const novoAnguloY = angulosY[indicePosicaoAtual];

    // Faz a transição de rotação suave até o novo ponto com efeito elástico
    gsap.to(modeloAviao.rotation, {
        y: novoAnguloY,
        duration: 0.65,
        ease: "back.out(1.1)"
    });
}

// 2. DECOLAGEM CRUCIAL: FORCE Y:0 (BICO DE FRENTE) ANTES DO ZOOM IMPACTANTE
// 2. DECOLAGEM CINEMATOGRÁFICA: CRUZA A TELA DA ESQUERDA PARA A DIREITA COM ZOOM
function decolarAviao() {
    if (!modeloAviao) return;

    // Desativa a flutuação natural de vento
    flutuarClock.stop();

    // Remove o evento de clique dos 3 pontos para evitar bugs durante a decolagem
    renderizador.domElement.removeEventListener('click', alternarEntreTresPontos);

    // Cria a linha do tempo para encadear os movimentos do avião
    const linhaTempoDecolagem = gsap.timeline();

    /* ETAPA 1: TELETRANSPORTE E PREPARAÇÃO (Super Rápido - Ocorre em 0.15 segundos)
       Recua o avião para trás da borda esquerda da tela, zera sua escala para não quebrar o visual 
       e vira o bico dele apontando firmemente para a direita (Leste).
    */
    linhaTempoDecolagem.to(modeloAviao.position, {
        x: -5,          // Posiciona bem na esquerda (fora da visão central)
        y: -0.5,        // Desce um pouco para pegar impulso de subida
        z: 1,           // Mantém uma distância segura da câmera
        duration: 0.15,
        ease: "power1.inOut"
    });

    linhaTempoDecolagem.to(modeloAviao.rotation, {
        x: -0.1,        // Inclinado levemente para cima (subindo)
        y: 1.5,         // Gira o bico totalmente apontado para a DIREITA
        z: 0.2,         // Inclina a asa para dar efeito de curva aerodinâmica
        duration: 0.15
    }, "-=0.15");       // Executa exatamente junto com o movimento de posição acima

    /* ETAPA 2: O RASANTE TURBINADO (Ocorre em 0.65 segundos)
       O avião corta a tela horizontalmente da esquerda para a direita, 
       ao mesmo tempo que avança contra o vidro da tela (Eixo Z) com o Super Zoom.
    */
    linhaTempoDecolagem.to(modeloAviao.position, {
        x: 6,           // Ruma violentamente até sumir pela DIREITA da tela
        y: 1.2,         // Sobe subindo a rampa de decolagem
        z: 4.5,         // Avança contra a tela criando o efeito de impacto (Zoom)
        duration: 0.65,
        ease: "power2.in" // Começa firme e ganha velocidade explosiva no final
    });

    // Multiplica o tamanho (escala) durante o trajeto para aumentar o efeito de aproximação
    linhaTempoDecolagem.to(modeloAviao.scale, {
        x: 5.5,
        y: 5.5,
        z: 5.5,
        duration: 0.65,
        ease: "power2.in"
    }, "-=0.65");       // Executa em perfeita sincronia com o rasante de posição
}
window.addEventListener('resize', () => {
    if (!container || !camera || !renderizador) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderizador.setSize(container.clientWidth, container.clientHeight);
});

inicializar3D();