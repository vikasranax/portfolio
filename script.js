// 1. Scene, camera, renderer — the 3 things every Three.js project needs
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// 2. Create a shape — a torus (donut) looks nicer than a plain cube
const geometry = new THREE.TorusGeometry(1.2, 0.4, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x7f77dd });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// 3. Lighting — without this, the shape looks flat and black
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// 4. Animation loop — this runs continuously, like a flipbook
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.007;

  renderer.render(scene, camera);
}

animate();

// 5. Keep it responsive if window resizes
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});