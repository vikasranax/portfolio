'use strict';
/* ================================================================
   VRX PORTFOLIO — script.js
   1) UI wiring (nav, menu, reveal, side scenes, anchors)
   2) Ink-wash footer scene (painted SVG layers)
   3) Background Three.js world — birds and falling petals drift
      throughout the whole page; the painted mountains, water,
      pine/red trees, rocks, pandas, and distant pagoda only
      reveal themselves once you scroll down to the footer
   4) Real project data → procedurally-painted canvas thumbnails,
      each silhouetting one real piece of Asian architecture
      (no text glyphs) + card grid + detail modal
   ================================================================ */
(function () {

  /* ---------------- helpers ---------------- */
  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const lerp  = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const damp  = (a, b, l, dt) => lerp(a, b, 1 - Math.exp(-l * dt));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hexA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  /* ---------------- real project data ----------------
     Each project carries a real, recognizable piece of architecture
     instead of any text glyph — no Chinese (or other) characters
     anywhere in the generated art. */
  const PROJECTS = [
    {
      id: 'earth-monitor', featured: true,
      title: 'Earth Monitor', sub: 'जगत्-मन्थन', country: 'india', code: 'IN',
      tag: 'AI / GEOPOLITICS', year: '2026', accent: '#f59e0b',
      desc: 'Real-time global intelligence terminal ingesting multiple live sources — geopolitics, markets, shipping, airspace, disasters, health, space, energy, cyber, and supply chains. AI-analysed. Target operating cost: $0/month.',
      tech: ['Next.js', 'TypeScript', 'AI', 'Multiple APIs'],
      live: 'https://jagatmanthan.vercel.app', source: 'https://github.com/vikasranax/earth-monitor'
    },
    {
      id: 'color-switch',
      title: 'Color Switch Blast', country: 'japan', code: 'JP',
      tag: 'GAME / ARCADE', year: '2026', accent: '#b83232',
      desc: "Tap-tap arcade game. Switch your ball's color to match incoming neon beams. Built for web and YouTube Playables. Also has symbols for colorblind players.",
      tech: ['Vanilla JS', 'Canvas', 'Game Dev'],
      live: 'https://vikasranax.github.io/color-switch/', source: 'https://github.com/vikasranax/color-switch'
    },
    {
      id: 'bounce-ball',
      title: 'Bounce Ball', country: 'cambodia', code: 'KH',
      tag: 'GAME / PHYSICS', year: '2026', accent: '#6fae7c',
      desc: 'Rolling and bouncing physics game. Navigate obstacles, collect eggs and fruits, and beat your high score.',
      tech: ['JavaScript', 'Canvas', 'Physics'],
      live: 'https://vikasranax.github.io/bounce-ball/', source: 'https://github.com/vikasranax/bounce-ball'
    },
    {
      id: 'saas-landing',
      title: 'SaaS Landing Page', country: 'korea', code: 'KR',
      tag: 'FULL-STACK / WEB', year: '2026', accent: '#22d3ee',
      desc: 'Conversion-optimized landing page with smooth animations and fully responsive design.',
      tech: ['TypeScript', 'React', 'Tailwind'],
      source: 'https://github.com/vikasranax/saas-landing'
    },
    {
      id: 'indrisma',
      title: 'INDRISMA', country: 'thailand', code: 'TH',
      tag: 'AUDIO / UI', year: '2026', accent: '#ffb7c5',
      desc: 'Music player with custom backgrounds. Add your own tracks and movies with a dedicated visual experience.',
      tech: ['JavaScript', 'Audio API', 'UI/UX'],
      live: 'https://vrxmusic.vercel.app/', source: 'https://github.com/vikasranax/vrxmusic'
    },
    {
      id: 'docmind',
      title: 'DocMind', country: 'china', code: 'CN',
      tag: 'AI / DOCUMENTS', year: '2026', accent: '#8fa3b5',
      desc: 'AI-powered document intelligence platform. Extract insights from unstructured documents.',
      tech: ['TypeScript', 'AI', 'Full Stack'],
      live: 'https://docmind-fxw0.onrender.com/', source: 'https://github.com/vikasranax/docmind'
    },
    {
      id: '3d-configurator',
      title: '3D Product Configurator', country: 'vietnam', code: 'VN',
      tag: '3D / WEBGL', year: '2026', accent: '#c9a66b',
      desc: 'Interactive 3D product customization tool built with Three.js and WebGL.',
      tech: ['JavaScript', 'Three.js', 'WebGL'],
      live: 'https://3d-product-configurator-inky.vercel.app/', source: 'https://github.com/vikasranax/3d-product-configurator'
    },
    {
      id: 'taskflow',
      title: 'TaskFlow API', country: 'india', code: 'IN',
      tag: 'BACKEND / API', year: '2026', accent: '#5f7789',
      desc: 'Production-ready REST API with FastAPI, Docker, and CI/CD pipeline.',
      tech: ['Python', 'FastAPI', 'Docker'],
      source: 'https://github.com/vikasranax/taskflow-api'
    }
  ];

  /* ---------------- real architecture silhouettes, one per country ----------------
     No text or characters — just the shape of a real landmark, drawn as a
     tinted line-art silhouette in the project's own accent color. */
  function drawIndia(x, cx, cy, r, color) {
    /* Konark Sun Temple's carved stone wheel */
    x.strokeStyle = color; x.lineWidth = r * 0.05;
    x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke();
    x.beginPath(); x.arc(cx, cy, r * 0.16, 0, Math.PI * 2); x.fillStyle = color; x.fill();
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      x.beginPath();
      x.moveTo(cx + Math.cos(a) * r * 0.16, cy + Math.sin(a) * r * 0.16);
      x.lineTo(cx + Math.cos(a) * r * 0.94, cy + Math.sin(a) * r * 0.94);
      x.stroke();
    }
  }
  function drawJapan(x, cx, baseY, s, color) {
    /* torii gate */
    x.strokeStyle = color; x.fillStyle = color; x.lineWidth = 9 * s;
    x.beginPath();
    x.moveTo(cx - 46 * s, baseY); x.lineTo(cx - 46 * s, baseY - 130 * s);
    x.moveTo(cx + 46 * s, baseY); x.lineTo(cx + 46 * s, baseY - 130 * s);
    x.stroke();
    x.fillRect(cx - 52 * s, baseY - 108 * s, 104 * s, 8 * s);
    x.beginPath();
    x.moveTo(cx - 66 * s, baseY - 138 * s);
    x.quadraticCurveTo(cx, baseY - 152 * s, cx + 66 * s, baseY - 138 * s);
    x.lineTo(cx + 66 * s, baseY - 128 * s);
    x.quadraticCurveTo(cx, baseY - 142 * s, cx - 66 * s, baseY - 128 * s);
    x.closePath(); x.fill();
  }
  function drawCambodia(x, cx, baseY, s, color) {
    /* Angkor Wat's five lotus-bud towers */
    x.fillStyle = color;
    [[-72, 58], [-34, 82], [0, 112], [34, 82], [72, 58]].forEach(function (t) {
      const tx = cx + t[0] * s, th = t[1] * s, tw = 22 * s;
      x.beginPath();
      x.moveTo(tx - tw / 2, baseY);
      x.lineTo(tx - tw / 3, baseY - th * 0.6);
      x.quadraticCurveTo(tx, baseY - th * 1.15, tx + tw / 3, baseY - th * 0.6);
      x.lineTo(tx + tw / 2, baseY);
      x.closePath(); x.fill();
    });
    x.fillRect(cx - 100 * s, baseY, 200 * s, 8 * s);
  }
  function drawKorea(x, cx, baseY, s, color) {
    /* hanok curved roofline */
    x.fillStyle = color;
    x.beginPath();
    x.moveTo(cx - 90 * s, baseY - 30 * s);
    x.quadraticCurveTo(cx - 100 * s, baseY - 55 * s, cx - 50 * s, baseY - 60 * s);
    x.quadraticCurveTo(cx, baseY - 78 * s, cx + 50 * s, baseY - 60 * s);
    x.quadraticCurveTo(cx + 100 * s, baseY - 55 * s, cx + 90 * s, baseY - 30 * s);
    x.quadraticCurveTo(cx, baseY - 46 * s, cx - 90 * s, baseY - 30 * s);
    x.closePath(); x.fill();
    x.fillRect(cx - 55 * s, baseY - 30 * s, 110 * s, 30 * s);
  }
  function drawThailand(x, cx, baseY, s, color) {
    /* wat chedi — tiered, spired stupa */
    x.fillStyle = color;
    x.beginPath();
    x.moveTo(cx - 40 * s, baseY); x.lineTo(cx + 40 * s, baseY);
    x.lineTo(cx + 22 * s, baseY - 40 * s); x.lineTo(cx - 22 * s, baseY - 40 * s);
    x.closePath(); x.fill();
    let y = baseY - 40 * s, wd = 22 * s;
    for (let i = 0; i < 4; i++) { x.fillRect(cx - wd / 2, y - 10 * s, wd, 6 * s); y -= 14 * s; wd *= 0.7; }
    x.beginPath();
    x.moveTo(cx - 4 * s, y); x.lineTo(cx + 4 * s, y); x.lineTo(cx, y - 26 * s);
    x.closePath(); x.fill();
  }
  function drawChina(x, cx, baseY, s, color) {
    /* multi-tier pagoda */
    x.fillStyle = color;
    let y = baseY, wd = 72 * s;
    for (let i = 0; i < 4; i++) {
      const h = 20 * s;
      x.beginPath();
      x.moveTo(cx - wd / 2 - 10 * s, y); x.lineTo(cx, y - h); x.lineTo(cx + wd / 2 + 10 * s, y);
      x.closePath(); x.fill();
      x.fillRect(cx - wd / 2 + 8 * s, y - h + 4 * s, wd - 16 * s, h * 0.6);
      y -= h * 1.15; wd *= 0.8;
    }
    x.fillRect(cx - 6 * s, y - 14 * s, 12 * s, 14 * s);
  }
  function drawVietnam(x, cx, baseY, s, color) {
    /* upturned, swooping temple eave */
    x.fillStyle = color;
    x.beginPath();
    x.moveTo(cx - 100 * s, baseY - 10 * s);
    x.quadraticCurveTo(cx - 60 * s, baseY - 50 * s, cx - 20 * s, baseY - 34 * s);
    x.quadraticCurveTo(cx, baseY - 60 * s, cx + 20 * s, baseY - 34 * s);
    x.quadraticCurveTo(cx + 60 * s, baseY - 50 * s, cx + 100 * s, baseY - 10 * s);
    x.lineTo(cx + 90 * s, baseY); x.lineTo(cx - 90 * s, baseY);
    x.closePath(); x.fill();
    x.fillRect(cx - 40 * s, baseY, 80 * s, 26 * s);
  }
  function drawLandmark(x, country, w, h, color) {
    const s = h / 560;
    if (country === 'india') drawIndia(x, w * 0.66, h * 0.4, h * 0.22, color);
    else if (country === 'japan') drawJapan(x, w * 0.5, h * 0.86, s, color);
    else if (country === 'cambodia') drawCambodia(x, w * 0.5, h * 0.86, s, color);
    else if (country === 'korea') drawKorea(x, w * 0.5, h * 0.86, s, color);
    else if (country === 'thailand') drawThailand(x, w * 0.5, h * 0.86, s, color);
    else if (country === 'china') drawChina(x, w * 0.5, h * 0.86, s, color);
    else if (country === 'vietnam') drawVietnam(x, w * 0.5, h * 0.86, s, color);
  }

  /* ---------------- procedural, per-project canvas art ---------------- */
  function paintArt(canvas, p, seed) {
    const w = canvas.width, h = canvas.height, x = canvas.getContext('2d');
    const rnd = mulberry32(seed * 7919 + 13);

    const g = x.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#0a0a10'); g.addColorStop(1, '#0e0e14');
    x.fillStyle = g; x.fillRect(0, 0, w, h);

    const r = x.createRadialGradient(w * .75, h * .22, 10, w * .75, h * .22, w * .6);
    r.addColorStop(0, hexA(p.accent, .22)); r.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = r; x.fillRect(0, 0, w, h);

    /* faint HUD grid */
    x.strokeStyle = 'rgba(255,255,255,0.04)'; x.lineWidth = 1;
    for (let i = 1; i < 7; i++) { x.beginPath(); x.moveTo(w * i / 7, 0); x.lineTo(w * i / 7, h); x.stroke(); }
    x.strokeStyle = 'rgba(255,255,255,0.05)';
    for (let i = 1; i < 5; i++) { x.beginPath(); x.moveTo(0, h * i / 5); x.lineTo(w, h * i / 5); x.stroke(); }

    /* ink-wash ridge silhouettes, tinted by the project's accent */
    function ridge(yBase, amp, alpha) {
      x.fillStyle = hexA(p.accent, alpha);
      x.beginPath(); x.moveTo(0, h); x.lineTo(0, yBase);
      let px = 0;
      while (px < w) {
        const step = 60 + rnd() * 110;
        x.lineTo(px + step / 2, yBase - rnd() * amp);
        x.lineTo(px + step, yBase - rnd() * amp * .3);
        px += step;
      }
      x.lineTo(w, h); x.closePath(); x.fill();
    }
    ridge(h * .58, h * .16, .10);
    ridge(h * .70, h * .14, .16);
    ridge(h * .82, h * .10, .28);

    /* the project's real landmark, silhouetted in its accent color */
    drawLandmark(x, p.country, w, h, hexA(p.accent, .55));

    /* corner border + HUD tick marks */
    x.strokeStyle = hexA(p.accent, .3); x.lineWidth = 2;
    x.strokeRect(10, 10, w - 20, h - 20);

    /* fine grain */
    for (let i = 0; i < 160; i++) {
      x.fillStyle = 'rgba(255,255,255,' + (rnd() * .04).toFixed(3) + ')';
      x.fillRect(rnd() * w, rnd() * h, 1.2, 1.2);
    }
  }

  /* ---------------- build a card / featured block ---------------- */
  function makeMedia(p, seed, size) {
    const media = document.createElement('div');
    media.className = 'showcase-media';
    const canvas = document.createElement('canvas');
    canvas.width = size[0]; canvas.height = size[1];
    paintArt(canvas, p, seed);
    media.appendChild(canvas);

    const seal = document.createElement('span');
    seal.className = 'showcase-seal';
    seal.textContent = p.code;
    media.appendChild(seal);

    ['tl', 'tr', 'bl', 'br'].forEach(function (pos) {
      const c = document.createElement('span');
      c.className = 'hud-corner ' + pos;
      media.appendChild(c);
    });
    return media;
  }

  function makeLinks(p) {
    const links = document.createElement('div');
    links.className = 'showcase-links';
    if (p.live) {
      const a = document.createElement('a');
      a.href = p.live; a.target = '_blank'; a.className = 'link-live';
      a.textContent = p.id === 'earth-monitor' ? 'Track Global Events'
        : (p.id === 'color-switch' || p.id === 'bounce-ball') ? 'Play Game'
        : p.id === 'indrisma' ? 'Play Music'
        : p.id === 'docmind' ? 'Summarize Docs'
        : p.id === '3d-configurator' ? 'Demo' : 'Live';
      links.appendChild(a);
    }
    if (p.source) {
      const a = document.createElement('a');
      a.href = p.source; a.target = '_blank'; a.className = 'link-source';
      a.textContent = 'Source';
      links.appendChild(a);
    }
    return links;
  }

  function buildFeatured(p, seed) {
    const el = document.createElement('article');
    el.className = 'showcase-feature reveal';
    el.style.setProperty('--accent', p.accent);
    el.appendChild(makeMedia(p, seed, [1200, 900]));

    const body = document.createElement('div');
    body.className = 'showcase-body';

    const tags = document.createElement('div');
    tags.className = 'showcase-tags';
    tags.innerHTML = '<span class="project-tag tag-gold">Flagship</span><span class="showcase-year">' + p.year + '</span>';
    body.appendChild(tags);

    const h3 = document.createElement('h3');
    h3.className = 'showcase-feature-title';
    h3.innerHTML = p.title + (p.sub ? ' <span class="project-sanskrit">(' + p.sub + ')</span>' : '');
    body.appendChild(h3);

    const desc = document.createElement('p');
    desc.textContent = p.desc;
    body.appendChild(desc);

    const tech = document.createElement('div');
    tech.className = 'showcase-tech';
    tech.innerHTML = p.tech.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    body.appendChild(tech);

    body.appendChild(makeLinks(p));
    el.appendChild(body);

    el.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      openModal(p, seed);
    });
    return el;
  }

  function buildCard(p, seed) {
    const el = document.createElement('article');
    el.className = 'showcase-card reveal';
    el.style.setProperty('--accent', p.accent);
    el.tabIndex = 0;
    el.appendChild(makeMedia(p, seed, [800, 500]));

    const body = document.createElement('div');
    body.className = 'showcase-body';

    const heading = document.createElement('div');
    heading.className = 'showcase-heading';
    heading.innerHTML = '<h3>' + p.title + '</h3><span class="showcase-year">' + p.year + '</span>';
    body.appendChild(heading);

    const desc = document.createElement('p');
    desc.className = 'showcase-desc';
    desc.textContent = p.desc;
    body.appendChild(desc);

    const tech = document.createElement('div');
    tech.className = 'showcase-tech';
    tech.innerHTML = p.tech.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    body.appendChild(tech);

    body.appendChild(makeLinks(p));
    el.appendChild(body);

    el.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      openModal(p, seed);
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(p, seed); }
    });
    return el;
  }

  const featuredWrap = $('#featuredProject');
  const gridWrap = $('#projectGrid');
  PROJECTS.forEach(function (p, i) {
    if (p.featured) featuredWrap.appendChild(buildFeatured(p, i));
    else gridWrap.appendChild(buildCard(p, i));
  });

  /* subtle cursor-following tilt on grid cards */
  if (!reduced) {
    $$('.showcase-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'translateY(-6px) rotateX(' + (-py * 4).toFixed(2) + 'deg) rotateY(' + (px * 6).toFixed(2) + 'deg)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }

  /* ---------------- modal ---------------- */
  const modal = $('#projectModal');
  function openModal(p, seed) {
    $('#modalGlyph').textContent = p.code;
    $('#modalGlyph').style.setProperty('--accent', p.accent);
    $('#modalTag').textContent = p.tag;
    $('#modalYear').textContent = p.year;
    $('#modalTitle').innerHTML = p.title + (p.sub ? ' <span class="project-sanskrit">(' + p.sub + ')</span>' : '');
    $('#modalDesc').textContent = p.desc;
    $('#modalTech').innerHTML = p.tech.map(function (t) { return '<span>' + t + '</span>'; }).join('');

    const links = [];
    if (p.live) links.push('<a class="link-live" href="' + p.live + '" target="_blank">Live ↗</a>');
    if (p.source) links.push('<a class="link-source" href="' + p.source + '" target="_blank">Source code</a>');
    $('#modalLinks').innerHTML = links.join('');

    const visual = $('#modalVisual');
    visual.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 900;
    paintArt(canvas, p, seed);
    visual.appendChild(canvas);

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  $('#modalClose').addEventListener('click', closeModal);
  $('#modalBackdrop').addEventListener('click', closeModal);
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ---------------- UI: navbar / menu / anchors / reveal ---------------- */
  const navbar = $('#navbar'), mobileMenu = $('#mobileMenu'), navToggle = $('.nav-toggle');
  function onScrollNav() { navbar.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScrollNav, { passive: true }); onScrollNav();

  function closeMenu() { mobileMenu.classList.remove('open'); }
  navToggle.addEventListener('click', function () { mobileMenu.classList.toggle('open'); });

  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id = a.getAttribute('href');
      const el = id.length > 1 ? $(id) : null;
      e.preventDefault();
      closeMenu();
      if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  const revealIO = new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visible'); revealIO.unobserve(en.target); } });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(function (el) { revealIO.observe(el); });

  /* ---------------- side scenes (scroll-linked pairs) ---------------- */
  const scenePairs = [
    [$('#sceneIndia'), $('#sceneChina')],
    [$('#sceneJapan'), $('#sceneKorea')],
    [$('#sceneVietnam'), $('#sceneThailand')]
  ];
  let activePair = -1;
  function scrollProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
  }
  function updateSideScenes() {
    const idx = clamp(Math.floor(scrollProgress() * scenePairs.length), 0, scenePairs.length - 1);
    if (idx === activePair) return;
    activePair = idx;
    scenePairs.forEach(function (pair, i) {
      pair.forEach(function (el) { if (el) el.classList.toggle('active', i === idx); });
    });
  }
  window.addEventListener('scroll', updateSideScenes, { passive: true });
  setTimeout(updateSideScenes, 400);

  /* ---------------- footer ink-wash scene (painted layers) ---------------- */
  (function buildFooter() {
    const footer = $('footer');
    if (!footer) return;
    footer.classList.add('footer-ink');
    const scene = document.createElement('div');
    scene.className = 'footer-scene';
    scene.innerHTML =
      '<svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="1160" cy="80" r="26" fill="#b83232" opacity="0.22"/>' +
      '<path d="M0 218 L120 158 L260 208 L420 138 L560 198 L760 118 L940 198 L1120 148 L1290 203 L1440 158 V320 H0 Z" fill="#7d90a0" opacity="0.30"/>' +
      '<path d="M0 250 L160 200 L320 246 L520 186 L700 240 L900 180 L1080 240 L1260 196 L1440 240 V320 H0 Z" fill="#5d7383" opacity="0.40"/>' +
      '<path d="M0 284 L200 240 L400 280 L640 232 L860 278 L1100 236 L1300 278 L1440 246 V320 H0 Z" fill="#37495a" opacity="0.50"/>' +
      '<g stroke="#9fb4c2" stroke-width="2" opacity="0.35">' +
      '<line x1="120" y1="300" x2="260" y2="300"/><line x1="420" y1="308" x2="600" y2="308"/>' +
      '<line x1="760" y1="300" x2="900" y2="300"/><line x1="1040" y1="308" x2="1220" y2="308"/></g>' +
      '</svg>' +
      '<div class="footer-mist"></div><div class="footer-mist m2"></div>';
    footer.insertBefore(scene, footer.firstChild);
    const seal = document.createElement('div');
    seal.className = 'footer-seal';
    seal.innerHTML = '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>' +
      '<line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>' +
      '<line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M10 90 L50 90 L50 50 Z" stroke="currentColor" stroke-width="7" stroke-linejoin="round" fill="none"/>' +
      '<path d="M50 10 L90 10 L50 50 Z" stroke="currentColor" stroke-width="7" stroke-linejoin="round" fill="none"/>' +
      '</svg>';
    footer.appendChild(seal);
  })();

  /* ================================================================
     BACKGROUND THREE.JS WORLD
     ================================================================ */
  let bgOK = false, bgRenderer, bgScene, bgCamera, footerWorld;
  let water, waterBase, birds = [], trees = [], mists = [], petals = [];
  const mouse = { x: 0, y: 0 };
  const fogDark = new THREE.Color(0x0a0f14), fogLight = new THREE.Color(0xdfe8ee);
  const waterDark = new THREE.Color(0x0d1c26), waterLight = new THREE.Color(0x9db8c6);
  const wMatColor = new THREE.Color();

  try {
    bgRenderer = new THREE.WebGLRenderer({ canvas: $('#bg'), antialias: true, alpha: false });
    bgRenderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgScene = new THREE.Scene();
    bgScene.background = fogDark.clone();
    bgScene.fog = new THREE.FogExp2(fogDark.getHex(), 0.02);
    bgCamera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 400);
    bgCamera.position.set(0, 2.4, 14);

    bgScene.add(new THREE.HemisphereLight(0xbfd4e0, 0x0a0d12, 0.9));
    const sun = new THREE.DirectionalLight(0xffe0b0, 0.5); sun.position.set(-6, 8, 4); bgScene.add(sun);

    /* everything painterly — mountains, water, rocks, trees, pandas, pagoda —
       lives in one group that only reveals itself near the footer. The rest
       of the page keeps a plain, quiet sky with just birds and petals drifting
       through it. */
    footerWorld = new THREE.Group();
    footerWorld.visible = false;
    bgScene.add(footerWorld);

    /* water */
    const wGeo = new THREE.PlaneGeometry(500, 300, 48, 48);
    waterBase = wGeo.attributes.position.array.slice();
    const wMat = new THREE.MeshPhongMaterial({ color: waterDark.getHex(), specular: 0x9fc7d8, shininess: 60, transparent: true, opacity: 0.95 });
    water = new THREE.Mesh(wGeo, wMat);
    water.rotation.x = -Math.PI / 2; water.position.set(0, 0, -80);
    footerWorld.add(water);

    /* mountain layers */
    function ridgeLayer(z, color, count, hMin, hMax, spread) {
      const grp = new THREE.Group();
      const rnd = mulberry32(Math.abs(z) * 31);
      const mat = new THREE.MeshStandardMaterial({ color: color, flatShading: true, roughness: 1 });
      for (let i = 0; i < count; i++) {
        const h = hMin + rnd() * (hMax - hMin);
        const m = new THREE.Mesh(new THREE.ConeGeometry(6 + rnd() * 9, h, 5, 1), mat);
        m.position.set((rnd() * 2 - 1) * spread, h / 2 - 0.6, z + (rnd() * 2 - 1) * 7);
        m.scale.x = 1 + rnd() * 0.8;
        m.rotation.y = rnd() * Math.PI;
        grp.add(m);
      }
      footerWorld.add(grp);
    }
    ridgeLayer(-45, 0x16222c, 7, 10, 18, 55);
    ridgeLayer(-75, 0x243441, 8, 14, 24, 70);
    ridgeLayer(-105, 0x3a4d5c, 8, 18, 30, 85);
    ridgeLayer(-140, 0x5d7383, 9, 24, 40, 100);

    /* rocks */
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x8fa0ac, flatShading: true, roughness: 1 });
    [[-7, 0.4, 6, 1.6], [7.5, 0.5, 7, 1.9], [-9.5, 0.3, 2, 1.2], [10, 0.3, 3, 1.3]].forEach(function (r) {
      const m = new THREE.Mesh(new THREE.DodecahedronGeometry(r[3], 0), rockMat);
      m.position.set(r[0], r[1], r[2]); m.scale.y = 0.7; m.rotation.y = r[0];
      footerWorld.add(m);
    });

    /* 3D trees: blue pines + one red-leaf tree */
    function pine(color, s) {
      const g = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.1, 1.1, 6),
        new THREE.MeshStandardMaterial({ color: 0x241610, roughness: 1 }));
      trunk.position.y = 0.55; g.add(trunk);
      const fm = new THREE.MeshStandardMaterial({ color: color, flatShading: true, roughness: 1 });
      [[0.62, 0.55, 0.85], [0.5, 0.5, 1.15], [0.36, 0.45, 1.42]].forEach(function (c) {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(c[0], c[1], 7), fm);
        cone.position.y = c[2]; g.add(cone);
      });
      g.scale.setScalar(s); return g;
    }
    function redTree(s) {
      const g = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.1, 1.3, 6),
        new THREE.MeshStandardMaterial({ color: 0x2c1810, roughness: 1 }));
      trunk.position.y = 0.65; g.add(trunk);
      const fm = new THREE.MeshStandardMaterial({ color: 0xb8452f, flatShading: true, roughness: 1 });
      [[0, 1.5, 0, 0.42], [-0.3, 1.35, 0.1, 0.3], [0.32, 1.4, -0.05, 0.3]].forEach(function (c) {
        const b = new THREE.Mesh(new THREE.SphereGeometry(c[3], 8, 8), fm);
        b.position.set(c[0], c[1], c[2]); b.scale.y = 0.75; g.add(b);
      });
      g.scale.setScalar(s); return g;
    }
    [[pine(0x5f7789, 1), -7.4, 1.0, 6], [pine(0x6d8496, 0.8), -6.5, 0.9, 5.5],
     [redTree(1), -8.3, 0.95, 6.4], [pine(0x5f7789, 1.05), 7.6, 1.05, 7],
     [pine(0x6d8496, 0.75), 8.6, 0.9, 6.5]].forEach(function (t) {
      t[0].position.set(t[1], t[2], t[3]);
      t[0].userData.phase = t[1] * 1.7;
      trees.push(t[0]); footerWorld.add(t[0]);
    });

    /* 3D pandas */
    function panda(s) {
      const g = new THREE.Group();
      const white = new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.9 });
      const black = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.9 });
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.34, 12, 12), white);
      body.scale.set(1, 0.9, 0.85); body.position.y = 0.3; g.add(body);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), white);
      head.position.set(0, 0.62, 0.12); g.add(head);
      [[-0.16, 0.8], [0.16, 0.8]].forEach(function (e) {
        const ear = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), black);
        ear.position.set(e[0], e[1], 0.1); g.add(ear);
      });
      [[-0.09], [0.09]].forEach(function (e) {
        const patch = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), black);
        patch.scale.set(1, 1.4, 0.5); patch.position.set(e[0], 0.64, 0.32); g.add(patch);
      });
      [[-0.28, 0.32], [0.28, 0.32]].forEach(function (a) {
        const arm = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), black);
        arm.position.set(a[0], a[1], 0.18); g.add(arm);
      });
      [[-0.16], [0.16]].forEach(function (l) {
        const leg = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), black);
        leg.position.set(l[0], 0.1, 0.28); g.add(leg);
      });
      g.scale.setScalar(s); return g;
    }
    const p1 = panda(0.8);  p1.position.set(-7.1, 1.0, 6.3);  p1.rotation.y = 0.5;  footerWorld.add(p1);
    const p2 = panda(0.55); p2.position.set(-6.4, 0.85, 6.9); p2.rotation.y = -0.4; footerWorld.add(p2);

    /* distant pagoda silhouette */
    (function pagoda() {
      const g = new THREE.Group();
      const m = new THREE.MeshStandardMaterial({ color: 0x2a3a46, flatShading: true, roughness: 1 });
      const hill = new THREE.Mesh(new THREE.ConeGeometry(10, 6, 6), m); hill.position.y = 2.4; g.add(hill);
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.1, 2.2), m); b1.position.y = 5.8; g.add(b1);
      const r1 = new THREE.Mesh(new THREE.ConeGeometry(2.4, 0.8, 4), m); r1.position.y = 6.7; r1.rotation.y = Math.PI / 4; g.add(r1);
      const b2 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.9, 1.5), m); b2.position.y = 7.5; g.add(b2);
      const r2 = new THREE.Mesh(new THREE.ConeGeometry(1.7, 0.7, 4), m); r2.position.y = 8.3; r2.rotation.y = Math.PI / 4; g.add(r2);
      g.position.set(17, 0, -70); footerWorld.add(g);
    })();

    /* 3D birds */
    function bird() {
      const g = new THREE.Group();
      const mat = new THREE.MeshBasicMaterial({ color: 0x1c2226, side: THREE.DoubleSide });
      const wg = new THREE.PlaneGeometry(0.6, 0.22); wg.rotateX(-Math.PI / 2); wg.translate(0.3, 0, 0);
      const wr = new THREE.Mesh(wg, mat); g.add(wr);
      const wl = new THREE.Mesh(wg.clone(), mat); wl.scale.x = -1; g.add(wl);
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 6), mat);
      body.scale.set(1, 0.7, 2.4); g.add(body);
      g.userData = { wr: wr, wl: wl };
      return g;
    }
    for (let i = 0; i < 5; i++) {
      const b = bird();
      b.userData.R = 16 + i * 4; b.userData.speed = 0.12 + Math.random() * 0.1;
      b.userData.phase = Math.random() * Math.PI * 2; b.userData.h = 6 + Math.random() * 4;
      birds.push(b); bgScene.add(b);
    }

    /* mist sprites */
    (function mistTex() {
      const c = document.createElement('canvas'); c.width = c.height = 128;
      const x = c.getContext('2d');
      const g = x.createRadialGradient(64, 64, 4, 64, 64, 62);
      g.addColorStop(0, 'rgba(255,255,255,0.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g; x.fillRect(0, 0, 128, 128);
      window._mistMap = new THREE.CanvasTexture(c);
    })();
    for (let i = 0; i < 26; i++) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: window._mistMap, transparent: true, opacity: 0.05 + Math.random() * 0.07, depthWrite: false }));
      sp.scale.set(14 + Math.random() * 18, 5 + Math.random() * 6, 1);
      sp.position.set((Math.random() * 2 - 1) * 60, 1 + Math.random() * 8, -10 - Math.random() * 110);
      sp.userData.v = 0.4 + Math.random() * 0.8;
      mists.push(sp); bgScene.add(sp);
    }

    /* falling petals — drift the whole page through, not just the footer */
    const petalGeo = new THREE.PlaneGeometry(0.4, 0.24);
    const petalColors = [0xffb7c5, 0xf5d0c5, 0xffe4e1, 0xf0c0a0];
    for (let i = 0; i < 42; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: petalColors[i % petalColors.length],
        transparent: true, opacity: 0.35 + Math.random() * 0.35, side: THREE.DoubleSide
      });
      const petal = new THREE.Mesh(petalGeo, mat);
      petal.position.set((Math.random() * 2 - 1) * 15, Math.random() * 20 - 4, Math.random() * 12 - 6);
      petal.userData = {
        fallSpeed: 0.35 + Math.random() * 0.5,
        driftAmp: 1 + Math.random() * 2,
        rotSpeed: (Math.random() - 0.5) * 1.4,
        baseX: petal.position.x,
        phase: Math.random() * Math.PI * 2
      };
      petals.push(petal); bgScene.add(petal);
    }

    window.addEventListener('mousemove', function (e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    bgOK = true;
  } catch (err) {
    bgOK = false;
    console.warn('WebGL background disabled:', err);
  }

  function smoothstep(a, b, v) { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }

  function updateBg(dt, t) {
    if (!bgOK) return;
    const bottom = smoothstep(0.72, 0.98, scrollProgress());

    /* the painted mountain/water/panda scene only reveals itself near the footer */
    footerWorld.visible = bottom > 0.03;

    bgScene.fog.color.copy(fogDark).lerp(fogLight, bottom);
    bgScene.background.copy(bgScene.fog.color);
    bgScene.fog.density = lerp(0.02, 0.011, bottom);
    wMatColor.copy(waterDark).lerp(waterLight, bottom);
    water.material.color.copy(wMatColor);

    /* water waves (still computed off-screen so it's ready the instant it appears) */
    const pos = water.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = waterBase[i * 3], y = waterBase[i * 3 + 1];
      pos.array[i * 3 + 2] = Math.sin(x * 0.12 + t * 0.9) * 0.18 + Math.cos(y * 0.1 + t * 0.7) * 0.15;
    }
    pos.needsUpdate = true;

    /* petals fall continuously, the whole page through */
    petals.forEach(function (pt) {
      const u = pt.userData;
      pt.position.y -= u.fallSpeed * dt;
      pt.position.x = u.baseX + Math.sin(t * 0.4 + u.phase) * u.driftAmp;
      pt.rotation.x += u.rotSpeed * dt;
      pt.rotation.y += u.rotSpeed * dt * 0.6;
      if (pt.position.y < -6) {
        pt.position.y = 16;
        pt.position.x = (Math.random() * 2 - 1) * 15;
        u.baseX = pt.position.x;
      }
    });

    /* birds */
    birds.forEach(function (b) {
      const u = b.userData;
      const a = t * u.speed + u.phase, a2 = a + 0.05;
      const x = Math.cos(a) * u.R, z = -40 + Math.sin(a) * u.R * 0.6;
      const y = u.h + Math.sin(t * 1.6 + u.phase) * 0.4;
      b.position.set(x, y, z);
      b.lookAt(Math.cos(a2) * u.R, y, -40 + Math.sin(a2) * u.R * 0.6);
      const flap = Math.sin(t * 7 + u.phase) * 0.65;
      u.wr.rotation.z = flap; u.wl.rotation.z = -flap;
    });

    /* tree sway + mist drift */
    trees.forEach(function (tr) { tr.rotation.z = Math.sin(t * 0.8 + tr.userData.phase) * 0.02; });
    mists.forEach(function (m) {
      m.position.x += dt * m.userData.v;
      if (m.position.x > 70) m.position.x = -70;
    });

    /* camera: parallax + descend toward water at footer */
    bgCamera.position.x = damp(bgCamera.position.x, mouse.x * 1.2, 3, dt);
    bgCamera.position.y = damp(bgCamera.position.y, 2.4 - bottom * 1.2 + mouse.y * -0.3, 3, dt);
    bgCamera.lookAt(0, 2.2 - bottom, -80);

    bgRenderer.render(bgScene, bgCamera);
  }

  /* ---------------- resize + main loop ---------------- */
  function onResize() {
    if (bgOK) {
      bgRenderer.setSize(window.innerWidth, window.innerHeight);
      bgCamera.aspect = window.innerWidth / window.innerHeight;
      bgCamera.updateProjectionMatrix();
    }
  }
  window.addEventListener('resize', onResize);
  onResize();

  const clock = new THREE.Clock();
  let simT = 0;
  function loop() {
    requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.05);
    simT += dt * (reduced ? 0 : 1);
    updateBg(dt, simT);
  }
  loop();

})();