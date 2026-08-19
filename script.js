/* ============================================
   NAVIGATION
   ============================================ */
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ============================================
   THREE.JS — MINIMAL STARFIELD
   ============================================ */
const canvas = document.getElementById('bg');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 25;

// 80 tiny stars
const count = 80;
const geo = new THREE.BufferGeometry();
const pos = new Float32Array(count * 3);
const vels = [];

for (let i = 0; i < count; i++) {
  pos[i*3] = (Math.random() - 0.5) * 60;
  pos[i*3+1] = (Math.random() - 0.5) * 40;
  pos[i*3+2] = (Math.random() - 0.5) * 20;
  vels.push({
    x: (Math.random() - 0.5) * 0.004,
    y: (Math.random() - 0.5) * 0.004
  });
}

geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

const mat = new THREE.PointsMaterial({
  size: 0.15,
  color: 0xf5f5f5,
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending
});

const stars = new THREE.Points(geo, mat);
scene.add(stars);

// Mouse parallax
let mx = 0, my = 0;
document.addEventListener('mousemove', (e) => {
  mx = (e.clientX / window.innerWidth) * 2 - 1;
  my = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animateBg() {
  requestAnimationFrame(animateBg);
  const p = geo.attributes.position.array;
  for (let i = 0; i < count; i++) {
    p[i*3] += vels[i].x;
    p[i*3+1] += vels[i].y;
    if (Math.abs(p[i*3]) > 30) vels[i].x *= -1;
    if (Math.abs(p[i*3+1]) > 20) vels[i].y *= -1;
  }
  geo.attributes.position.needsUpdate = true;
  stars.rotation.y += 0.0002;
  camera.position.x += (mx * 0.8 - camera.position.x) * 0.02;
  camera.position.y += (my * 0.5 - camera.position.y) * 0.02;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
}
animateBg();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ============================================
   TERMINAL TICKER
   ============================================ */
const terminal = document.getElementById('terminal');
const cursor = document.getElementById('cursor');

const lines = [
  '> Initializing Earth Monitor...',
  '> Loading 31 geopolitical data sources...',
  '> Color Switch Blast ready for deployment...',
  '> 3D Product Configurator rendered...',
  '> Systems online. Welcome, visitor.'
];

let lineIdx = 0;
let charIdx = 0;
let isDeleting = false;
let wait = 0;

function typeTick() {
  const current = lines[lineIdx];
  const visible = current.slice(0, charIdx);

  // Remove old lines, keep cursor
  terminal.innerHTML = '';
  for (let i = 0; i < lineIdx; i++) {
    const span = document.createElement('span');
    span.className = 'terminal-line';
    span.style.opacity = '1';
    span.style.animation = 'none';
    span.textContent = lines[i];
    terminal.appendChild(span);
    terminal.appendChild(document.createElement('br'));
  }

  const active = document.createElement('span');
  active.textContent = visible;
  terminal.appendChild(active);
  terminal.appendChild(cursor);

  if (!isDeleting && charIdx < current.length) {
    charIdx++;
    wait = 40 + Math.random() * 40;
  } else if (isDeleting && charIdx > 0) {
    charIdx--;
    wait = 20;
  } else if (!isDeleting && charIdx === current.length) {
    if (lineIdx < lines.length - 1) {
      wait = 600;
      isDeleting = false;
      lineIdx++;
      charIdx = 0;
      wait = 400;
      return setTimeout(typeTick, wait);
    } else {
      // Last line — keep it, stop
      return;
    }
  }

  setTimeout(typeTick, wait);
}

// Start after a brief delay
setTimeout(typeTick, 600);

/* ============================================
   SCROLL REVEAL
   ============================================ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));