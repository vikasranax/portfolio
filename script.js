//Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

//Creating Shape
const geometry = new THREE.TorusGeometry(1.2, 0.4, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x7f77dd });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

//Light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

//Track Cursor
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (event) => {
  // convert pixel position into a -1 to 1 range
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = (event.clientY / window.innerHeight) * 2 - 1;
});

//Track Scrolling
let scrollY = 0;

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

//Animation
function animate() {
  requestAnimationFrame(animate);

  //slow spin
  torus.rotation.x += 0.003;
  torus.rotation.y += 0.005;

  //foloow cursor
  torus.rotation.y += mouseX * 0.01;
  torus.rotation.x += mouseY * 0.01;

  //torus speeds
  torus.rotation.z = scrollY * 0.002;

  // torus shrinks
  const scale = Math.max(1 - scrollY * 0.0008, 0.4);
  torus.scale.set(scale, scale, scale);

  renderer.render(scene, camera);
}

animate();

//Response
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});