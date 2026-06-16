let scene, camera, renderer, airplane;
const container = document.getElementById('canvas-container3d');

// Variáveis de controle de movimento
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
let scrollPercent = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function init3D() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 3.8);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x0082A3, 1.8);
    mainLight.position.set(5, 4, 3);
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0xB4006E, 1.5, 12);
    fillLight.position.set(-4, 2, 2);
    scene.add(fillLight);

    // Carregador do Modelo GLTF/GLB
    const loader = new THREE.GLTFLoader();
    loader.load(
        'public/assets/models/airplane.glb', 
        (gltf) => {
            airplane = gltf.scene;
            airplane.scale.set(0.45, 0.45, 0.45); 
            
            // POSIÇÃO INICIAL FIXADA NO LADO ESQUERDO (-0.8 no eixo X)
            airplane.position.set(-0.8, -0.2, 0);
            
            scene.add(airplane);
            animate();
        },
        undefined,
        () => {
            buildProceduralAirplane();
        }
    );

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    setupPageTransitions();
}

function buildProceduralAirplane() {
    airplane = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0082A3, roughness: 0.3 });
    const wingMat = new THREE.MeshStandardMaterial({ color: 0xFFCC00, roughness: 0.2 });

    const bodyGeo = new THREE.ConeGeometry(0.15, 1.4, 12);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.z = -Math.PI / 2; 
    airplane.add(body);

    const wingGeo = new THREE.BoxGeometry(0.08, 0.02, 1.7);
    const wings = new THREE.Mesh(wingGeo, wingMat);
    wings.position.set(-0.1, 0, 0);
    airplane.add(wings);

    const tailGeo = new THREE.BoxGeometry(0.2, 0.2, 0.03);
    const tail = new THREE.Mesh(tailGeo, bodyMat);
    tail.position.set(-0.55, 0.15, 0);
    airplane.add(tail);

    // POSIÇÃO INICIAL FIXADA NO LADO ESQUERDO
    airplane.position.set(-0.8, -0.2, 0);
    scene.add(airplane);
    
    animate();
}

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / windowHalfX;
    mouseY = (event.clientY - windowHalfY) / windowHalfY;
}

function onScroll() {
    const containerDiv = document.querySelector('.app-container');
    if (containerDiv) {
        scrollPercent = containerDiv.scrollTop / (containerDiv.scrollHeight - containerDiv.clientHeight);
    }
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (airplane) {
        targetX += (mouseX - targetX) * 0.06;
        targetY += (mouseY - targetY) * 0.06;

        // Inclinação baseada no mouse
        airplane.rotation.z = -targetX * 0.6;  
        airplane.rotation.x = targetY * 0.4;   
        
        // Mapeamento mantendo o avião restrito e operando no LADO ESQUERDO
        // Ele se move sutilmente de -1.2 até -0.4 na tela, divergindo do centro/direita
        airplane.position.x = -0.8 + (targetX * 0.3);
        airplane.position.y = -0.2 + (-targetY * 0.6);

        // Scroll rotaciona o avião
        airplane.rotation.y = (Math.PI / 2) + (scrollPercent * Math.PI * 1.5);
    }

    renderer.render(scene, camera);
}

// ANIMAÇÃO DE VOLTA POR CIMA DO BOTÃO (TRAJETÓRIA EM ARCO DE MEIA-LUA)
function setupPageTransitions() {
    const triggers = document.querySelectorAll('.dynamic-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const destination = trigger.getAttribute('data-target');

            if (airplane) {
                // Desativa o controle do mouse para a animação assumir os eixos pura e perfeitamente
                document.removeEventListener('mousemove', onMouseMove);

                const tl = gsap.timeline({
                    onComplete: () => {
                        window.location.href = `views/login-cadastro.html?action=${destination}`;
                    }
                });

                // Movimento curvo: o avião sai da esquerda, inclina o bico para cima, 
                // passa voando por cima do centro (onde estão os botões/textos) e avança em direção à câmera.
                tl.to(airplane.rotation, { x: -0.4, z: 0.3, y: 0.2, duration: 0.2 })
                  .to(airplane.position, { 
                      x: 0,        // Vai para o centro
                      y: 0.8,      // Sobe "por cima" dos botões
                      z: 1.2,      // Se aproxima da tela
                      duration: 0.5, 
                      ease: "power1.out" 
                  })
                  .to(airplane.rotation, { x: 0.2, y: Math.PI / 4, z: -0.5, duration: 0.2 }) // Inclina mergulhando
                  .to(airplane.position, { 
                      x: 1.5,      // Faz a curva saindo pelo canto superior direito
                      z: 6,        // Rasga a tela em direção ao usuário
                      duration: 0.5, 
                      ease: "power3.in" 
                  });
            } else {
                window.location.href = `views/login-cadastro.html?action=${destination}`;
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', init3D);