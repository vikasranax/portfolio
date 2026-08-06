/* ============================================
   LOADER
   ============================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 800);
});

/* ============================================
   CUSTOM CURSOR
   ============================================ */
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;
  cursorOutline.style.left = outlineX + 'px';
  cursorOutline.style.top = outlineY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover states
const clickables = document.querySelectorAll('a, button, .project-card, .stack-item, .pill');
clickables.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

/* ============================================
   NAVIGATION
   ============================================ */
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

/* ============================================
   THREE.JS WAVE MESH BACKGROUND
   ============================================ */
const canvas = document.getElementById('bg');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 18;

// Wave mesh
const geometry = new THREE.PlaneGeometry(60, 40, 80, 60);
const material = new THREE.MeshStandardMaterial({
  color: 0x1a1a2e,
  emissive: 0x0f0f1a,
  emissiveIntensity: 0.3,
  roughness: 0.6,
  metalness: 0.2,
  wireframe: true,
  transparent: true,
  opacity: 0.4,
  side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -Math.PI / 2.8;
mesh.position.y = -2;
scene.add(mesh);

// Lights
const ambientLight = new THREE.AmbientLight(0x7f77dd, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xa78bfa, 1, 50);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x5b8def, 0.6, 50);
pointLight2.position.set(-10, -5, 10);
scene.add(pointLight2);

// Mouse interaction
let targetMouseX = 0;
let targetMouseY = 0;

document.addEventListener('mousemove', (e) => {
  targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
  targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Animation
const clock = new THREE.Clock();
const positionAttribute = geometry.attributes.position;

function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  // Wave displacement
  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    
    const wave1 = Math.sin(x * 0.3 + elapsed * 0.8) * 0.8;
    const wave2 = Math.sin(y * 0.2 + elapsed * 0.6) * 0.5;
    const wave3 = Math.sin((x + y) * 0.15 + elapsed * 0.4) * 0.3;
    
    positionAttribute.setZ(i, wave1 + wave2 + wave3);
  }
  
  positionAttribute.needsUpdate = true;
  geometry.computeVertexNormals();

  // Mouse parallax
  mesh.rotation.z += (targetMouseX * 0.05 - mesh.rotation.z) * 0.02;
  mesh.rotation.x = -Math.PI / 2.8 + targetMouseY * 0.03;

  // Light movement
  pointLight.position.x = 10 + Math.sin(elapsed * 0.5) * 5;
  pointLight.position.z = 10 + Math.cos(elapsed * 0.5) * 5;

  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ============================================
   SCROLL REVEAL
   ============================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ============================================
   3D CARD TILT
   ============================================ */
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

/* ============================================
   BACK TO TOP
   ============================================ */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});