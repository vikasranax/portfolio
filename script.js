const canvas = document.getElementById('bg');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 30;

// === PARTICLES ===
const particleCount = 180;
const particlesGeometry = new THREE.BufferGeometry();
const posArray = new Float32Array(particleCount * 3);
const velocityArray = [];

for (let i = 0; i < particleCount * 3; i += 3) {
  posArray[i] = (Math.random() - 0.5) * 80;     // x
  posArray[i + 1] = (Math.random() - 0.5) * 60; // y
  posArray[i + 2] = (Math.random() - 0.5) * 40; // z
  
  velocityArray.push({
    x: (Math.random() - 0.5) * 0.015,
    y: (Math.random() - 0.5) * 0.015,
    z: (Math.random() - 0.5) * 0.01
  });
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.25,
  color: 0xa78bf,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// === LARGER GLOWING ORBS ===
const orbCount = 8;
const orbs = [];
for (let i = 0; i < orbCount; i++) {
  const orbGeo = new THREE.SphereGeometry(Math.random() * 0.8 + 0.3, 16, 16);
  const orbMat = new THREE.MeshBasicMaterial({
    color: i % 2 === 0 ? 0x7f77dd : 0x5b8def,
    transparent: true,
    opacity: 0.15
  });
  const orb = new THREE.Mesh(orbGeo, orbMat);
  orb.position.set(
    (Math.random() - 0.5) * 60,
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 20
  );
  scene.add(orb);
  orbs.push({
    mesh: orb,
    speedX: (Math.random() - 0.5) * 0.008,
    speedY: (Math.random() - 0.5) * 0.008
  });
}

// === MOUSE TRACKING ===
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

window.addEventListener('mousemove', (event) => {
  targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
  targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// === SCROLL TRACKING ===
let scrollY = 0;
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

// === LINE MATERIAL FOR CONNECTIONS ===
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0x7f77dd,
  transparent: true,
  opacity: 0.12
});

// === ANIMATION ===
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  // Smooth mouse follow
  mouseX += (targetMouseX - mouseX) * 0.05;
  mouseY += (targetMouseY - mouseY) * 0.05;

  // Update particles
  const positions = particlesGeometry.attributes.position.array;
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    
    positions[i3] += velocityArray[i].x;
    positions[i3 + 1] += velocityArray[i].y;
    positions[i3 + 2] += velocityArray[i].z;

    // Mouse repulsion
    const dx = positions[i3] - mouseX * 30;
    const dy = positions[i3 + 1] - mouseY * 20;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 8) {
      positions[i3] += dx * 0.02;
      positions[i3 + 1] += dy * 0.02;
    }

    // Boundary wrap
    if (Math.abs(positions[i3]) > 40) velocityArray[i].x *= -1;
    if (Math.abs(positions[i3 + 1]) > 30) velocityArray[i].y *= -1;
    if (Math.abs(positions[i3 + 2]) > 20) velocityArray[i].z *= -1;
  }
  
  particlesGeometry.attributes.position.needsUpdate = true;

  // Rotate entire particle system slowly
  particlesMesh.rotation.y = elapsed * 0.02;
  particlesMesh.rotation.x = mouseY * 0.1;

  // Update orbs
  orbs.forEach(orb => {
    orb.mesh.position.x += orb.speedX;
    orb.mesh.position.y += orb.speedY;
    orb.mesh.rotation.x += 0.002;
    orb.mesh.rotation.y += 0.003;
    
    if (Math.abs(orb.mesh.position.x) > 30) orb.speedX *= -1;
    if (Math.abs(orb.mesh.position.y) > 20) orb.speedY *= -1;
  });

  // Camera parallax based on scroll + mouse
  camera.position.x += (mouseX * 2 - camera.position.x) * 0.03;
  camera.position.y += (mouseY * 2 + scrollY * 0.005 - camera.position.y) * 0.03;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

animate();

// === RESIZE ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});