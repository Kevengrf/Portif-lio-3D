import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// --- SETUP BÁSICO ---
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();
const sizes = { width: window.innerWidth, height: window.innerHeight };

// --- CÂMERA E CONTROLES ---
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(0, 10, 30);
scene.add(camera);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = false; // Desativado para a animação de órbita individual

// --- RENDERIZADORES ---
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(sizes.width, sizes.height);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

// --- LUZES E ESTRELAS ---
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xFFD700, 2.0, 100);
scene.add(pointLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);
const starGeometry = new THREE.BufferGeometry();
const starCount = 5000;
const posArray = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 500;
}
starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ size: 0.15, color: 0xffffff }));
scene.add(stars);

// --- MODELO 3D CENTRAL ---
let centralModel = null;
const gltfLoader = new GLTFLoader();
gltfLoader.load(
    'img/hitem3d.glb',
    (gltf) => {
        centralModel = gltf.scene;
        centralModel.scale.set(4.5, 4.5, 4.5);
        scene.add(centralModel);
    }
);

// --- DADOS DO PORTFÓLIO ---
const portfolioData = [
    { title: 'Sobre Mim', radius: 12, speed: 0.005 },
    { title: 'Experiências', radius: 16, speed: 0.004 },
    { title: 'Projetos', radius: 20, speed: 0.003 },
    { title: 'Contato', radius: 24, speed: 0.002 },
    { title: 'Formação', radius: 28, speed: 0.0015 }
];
const sphereMeshes = [];
const orbitalPivots = [];
const cardElements = document.querySelectorAll('.card');

// --- CRIAÇÃO DOS PONTOS E ÓRBITAS ---
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFD700,
    emissive: 0xB8860B,
    metalness: 0.8,
    roughness: 0.3,
    emissiveIntensity: 0.5,
});

portfolioData.forEach((data, index) => {
    const pivot = new THREE.Object3D();
    pivot.rotation.x = (Math.random() - 0.5) * 0.1;
    pivot.rotation.z = (Math.random() - 0.5) * 0.1;
    orbitalPivots.push({ pivot: pivot, speed: data.speed });
    scene.add(pivot);

    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    mesh.position.x = data.radius;
    mesh.userData.index = index;
    sphereMeshes.push(mesh);
    pivot.add(mesh);

    const labelDiv = document.createElement('div');
    labelDiv.className = 'label';
    labelDiv.textContent = data.title;
    const label = new CSS2DObject(labelDiv);
    label.position.set(0, 1.8, 0);
    mesh.add(label);
});

// --- INTERAÇÃO DE CLIQUE ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' || event.target.classList.contains('close-button')) return;

    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(sphereMeshes);

    if (intersects.length > 0) {
        const intersectedIndex = intersects[0].object.userData.index;
        cardElements[intersectedIndex].classList.add('open');
    }
});

// Lógica para fechar os cards
cardElements.forEach(card => {
    card.querySelector('.close-button').addEventListener('click', () => {
        card.classList.remove('open');
    });
});

// --- LOOP DE ANIMAÇÃO ---
const tick = () => {
    if (centralModel) {
        centralModel.rotation.y += 0.002;
    }

    orbitalPivots.forEach(item => {
        item.pivot.rotation.y += item.speed;
    });

    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

// --- RESPONSIVIDADE ---
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    labelRenderer.setSize(sizes.width, sizes.height);
});

tick();
