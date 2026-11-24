/* ============================================================
   VIKAS RANA — portfolio  ·  script.js
   Theme toggle · reveal animations · terminal typing · project
   filters · LIVE GitHub stats (cache + offline snapshot).
   ============================================================ */
(() => {
  'use strict';

  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = n => Number(n || 0).toLocaleString('en-IN');

  /* ---------------- theme ---------------- */
  const root = document.documentElement;
  const themeBtn = $('#themeToggle');
  const metaTheme = $('meta[name="theme-color"]');

  function applyTheme(t) {
    root.dataset.theme = t;
    if (metaTheme) metaTheme.setAttribute('content', t === 'dark' ? '#0a0f0d' : '#f5f7f3');
    if (themeBtn) themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    try { localStorage.setItem('vr-theme', t); } catch (e) {}
  }
  if (themeBtn) themeBtn.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  /* ---------------- topbar scroll state ---------------- */
  const bar = $('#topbar');
  const onScroll = () => { if (bar) bar.classList.toggle('scrolled', scrollY > 10); };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- reveal on scroll ---------------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('v'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  $$('.rv').forEach(el => io.observe(el));

  /* ---------------- footer year ---------------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- toast ---------------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
  }

  /* ---------------- copy email ---------------- */
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e2) { ok = false; }
      ta.remove();
      return ok;
    }
  }
  const copyBtn = $('#copyEmail');
  if (copyBtn) copyBtn.addEventListener('click', async () => {
    const ok = await copyText('vikasranax@yahoo.com');
    toast(ok ? 'Email copied to clipboard' : 'vikasranax@yahoo.com');
  });

  /* ---------------- role rotator ---------------- */
  const ROLES = ['AI-powered tools', '.NET backends', 'Angular frontends', 'browser games', 'learning platforms'];
  const roleEl = $('#role');
  if (roleEl && !RM) {
    let ri = 0;
    setInterval(() => {
      ri = (ri + 1) % ROLES.length;
      roleEl.classList.add('out');
      setTimeout(() => {
        roleEl.textContent = ROLES[ri];
        roleEl.classList.remove('out');
      }, 180);
    }, 2700);
  }



  /* ---------------- project filters ---------------- */
  const fBtns = $$('.wf');
  const cards = $$('.pcard');
  fBtns.forEach(b => b.addEventListener('click', () => {
    fBtns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    const f = b.dataset.f;
    cards.forEach(c => c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f));
  }));

  /* ============================================================
     LIVE GITHUB STATS
     - fetches profile + repos from the public GitHub API
     - caches in localStorage for 15 min (rate-limit friendly)
     - falls back to a snapshot if the API is unreachable
     ============================================================ */
  const GH_USER = 'vikasranax';
  const CACHE_KEY = 'vr-gh-cache-v1';
  const TTL = 15 * 60 * 1000;
  const LANG_COLORS = {
    'TypeScript': '#3178c6', 'JavaScript': '#f1e05a', 'Python': '#3572A5',
    'C#': '#178600', 'C++': '#f34b7d', 'C': '#555555', 'HTML': '#e34c26',
    'CSS': '#563d7c', 'SCSS': '#c6538c', 'Shell': '#89e051', 'Dockerfile': '#384d54',
    'Java': '#b07219', 'Go': '#00ADD8', 'Kotlin': '#A97BFF', 'Ruby': '#701516',
    'PHP': '#4F5D95', 'Lua': '#000080', 'Swift': '#F05138', 'Vue': '#41b883',
    'Jupyter Notebook': '#DA5B0B', 'PowerShell': '#012456', 'EJS': '#a91e50', 'Astro': '#ff5a03'
  };
  const langColor = l => LANG_COLORS[l] || '#8a9a8f';

  /* offline snapshot (shape mirrors the GitHub API so buildModel can be reused) */
  const FALLBACK_RAW = {
    user: {
      login: 'vikasranax', name: 'Vikas Rana',
      avatar_url: 'https://github.com/' + GH_USER + '.png',
      bio: 'Building AI tools, games and learning platforms — in public.',
      location: 'India', followers: 7, following: 12, public_repos: 12,
      created_at: '2023-04-01T00:00:00Z',
      html_url: 'https://github.com/vikasranax'
    },
    repos: [
      { name: 'earth-monitor', description: 'Open-source global intelligence dashboard with an AI copilot over live data.', stargazers_count: 6, forks_count: 1, language: 'TypeScript', size: 4800, pushed_at: '2025-11-28T09:30:00Z', html_url: 'https://github.com/vikasranax/earth-monitor' },
      { name: 'paathsala', description: 'Multilingual exam-prep learning platform for SSC, NEET, JEE and UPSC.', stargazers_count: 4, forks_count: 1, language: 'TypeScript', size: 5200, pushed_at: '2025-11-24T17:05:00Z', html_url: 'https://github.com/vikasranax/paathsala' },
      { name: 'docmind', description: 'Ask your documents anything — LLM answers with exact-source citations.', stargazers_count: 3, forks_count: 0, language: 'TypeScript', size: 2100, pushed_at: '2025-11-19T12:40:00Z', html_url: 'https://github.com/vikasranax/docmind' },
      { name: 'color-switch', description: 'One-tap neon arcade game for the web and YouTube Playables.', stargazers_count: 2, forks_count: 0, language: 'JavaScript', size: 900, pushed_at: '2025-11-10T08:00:00Z', html_url: 'https://github.com/vikasranax/color-switch' },
      { name: 'bounce-ball', description: 'Rolling-bouncing Canvas physics game with pickups and high scores.', stargazers_count: 2, forks_count: 0, language: 'JavaScript', size: 700, pushed_at: '2025-10-30T10:00:00Z', html_url: 'https://github.com/vikasranax/bounce-ball' },
      { name: 'indrisma', description: 'Music and visual player — your tracks, your backgrounds.', stargazers_count: 2, forks_count: 0, language: 'JavaScript', size: 1100, pushed_at: '2025-10-21T15:20:00Z', html_url: 'https://github.com/vikasranax/indrisma' },
      { name: '3d-product-configurator', description: 'Real-time 3D product customization with Three.js and WebGL.', stargazers_count: 2, forks_count: 0, language: 'TypeScript', size: 1500, pushed_at: '2025-10-14T11:00:00Z', html_url: 'https://github.com/vikasranax/3d-product-configurator' },
      { name: 'taskflow-api', description: 'Production-ready FastAPI REST service with Docker and CI/CD.', stargazers_count: 1, forks_count: 0, language: 'Python', size: 600, pushed_at: '2025-09-30T09:00:00Z', html_url: 'https://github.com/vikasranax/taskflow-api' },
      { name: 'saas-landing', description: 'Conversion-focused animated SaaS landing page template.', stargazers_count: 1, forks_count: 0, language: 'CSS', size: 500, pushed_at: '2025-09-12T14:30:00Z', html_url: 'https://github.com/vikasranax/saas-landing' }
    ]
  };

  function readCache(anyAge) {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const p = JSON.parse(raw);
      if (!p || !p.model || !p.fetchedAt) return null;
      if (!anyAge && Date.now() - p.fetchedAt > TTL) return null;
      return p;
    } catch (e) { return null; }
  }
  function writeCache(model) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), model })); } catch (e) {}
  }

  async function fetchGH() {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 12000);
    try {
      const opts = { headers: { 'Accept': 'application/vnd.github+json' }, signal: ctl.signal };
      const uURL = 'https://api.github.com/users/' + GH_USER;
      const rURL = 'https://api.github.com/users/' + GH_USER + '/repos?per_page=100&sort=pushed';
      const results = await Promise.all([fetch(uURL, opts), fetch(rURL, opts)]);
      const uRes = results[0], rRes = results[1];
      if (!uRes.ok || !rRes.ok) throw new Error('github api ' + uRes.status + '/' + rRes.status);
      const user = await uRes.json();
      const repos = await rRes.json();
      if (!user || user.message || !Array.isArray(repos)) throw new Error('bad github payload');
      return { user, repos };
    } finally { clearTimeout(timer); }
  }

  function buildModel(user, repos) {
    const arr = repos.filter(r => r && !r.fork);
    const stars = arr.reduce((s, r) => s + (r.stargazers_count || 0), 0);
    const forks = arr.reduce((s, r) => s + (r.forks_count || 0), 0);

    const langMap = {};
    arr.forEach(r => { if (r.language && r.size > 0) langMap[r.language] = (langMap[r.language] || 0) + r.size; });
    const langTotal = Object.keys(langMap).reduce((s, k) => s + langMap[k], 0) || 1;
    const langs = Object.keys(langMap)
      .sort((a, b) => langMap[b] - langMap[a])
      .slice(0, 6)
      .map(n => ({ n, pct: Math.max(2, Math.round(langMap[n] / langTotal * 100)) }));

    const byStars = arr.slice().sort((a, b) =>
      (b.stargazers_count || 0) - (a.stargazers_count || 0) ||
      new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0));
    const top = byStars.slice(0, 6).map(r => ({
      name: r.name || 'repository',
      desc: r.description || '',
      stars: r.stargazers_count || 0,
      lang: r.language || '',
      url: r.html_url || ('https://github.com/' + GH_USER),
      pushed: r.pushed_at || ''
    }));

    const lastArr = arr.slice().sort((a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0));
    const last = lastArr[0];
    const lastPush = last ? { name: last.name, url: last.html_url || ('https://github.com/' + GH_USER), at: last.pushed_at } : null;

    return {
      user: {
        login: user.login || GH_USER,
        name: user.name || 'Vikas Rana',
        avatar: user.avatar_url || ('https://github.com/' + GH_USER + '.png'),
        bio: user.bio || '',
        location: user.location || 'India',
        followers: user.followers || 0,
        following: user.following || 0,
        created: user.created_at || null,
        html: user.html_url || ('https://github.com/' + GH_USER)
      },
      repoCount: (user.public_repos != null) ? user.public_repos : arr.length,
      stars, forks, langs, top, lastPush
    };
  }

  /* ---------------- stat counters ---------------- */
  function countTo(el, val) {
    if (!el) return;
    if (RM) { el.textContent = fmt(val); return; }
    const dur = 900, t0 = performance.now();
    const step = t => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(val * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function timeAgo(ts) {
    const d = Date.now() - ts;
    if (d < 60000) return 'just now';
    if (d < 3600000) return Math.floor(d / 60000) + 'm ago';
    if (d < 86400000) return Math.floor(d / 3600000) + 'h ago';
    return Math.floor(d / 86400000) + 'd ago';
  }
  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) { return '—'; }
  }

  /* ---------------- render ---------------- */
  let rendered = false;
  function render(m, state, at) {
    rendered = true;

    const pill = $('#ghStatus');
    if (pill) {
      if (state === 'live') {
        pill.classList.remove('is-warn'); pill.classList.add('is-live');
        pill.innerHTML = '<span class="pulse"></span>LIVE · GITHUB API';
      } else {
        pill.classList.add('is-warn'); pill.classList.remove('is-live');
        pill.innerHTML = '<span class="pulse"></span>' + (state === 'cache' ? 'CACHED SNAPSHOT' : 'OFFLINE SNAPSHOT');
      }
    }
    const up = $('#ghUpdated');
    if (up) {
      if (state === 'live' && at) up.textContent = 'fetched just now · cached for 15 min';
      else if (state === 'cache' && at) up.textContent = 'snapshot cached ' + timeAgo(at) + ' · hit refresh for live data';
      else up.textContent = 'offline snapshot · GitHub API rate-limited or unreachable';
    }

    const years = m.user.created ? (Date.now() - new Date(m.user.created).getTime()) / 31557600000 : null;
    $$('[data-gh]').forEach(el => {
      const k = el.getAttribute('data-gh');
      if (k === 'years') el.textContent = years == null ? '—' : (years < 1 ? '<1' : years.toFixed(1));
      else if (k === 'following') el.textContent = fmt(m.user.following);
      else if (k === 'repos') countTo(el, m.repoCount);
      else if (k === 'stars') countTo(el, m.stars);
      else if (k === 'followers') countTo(el, m.user.followers);
    });

    const av = $('#ghAvatar'), avSk = $('#ghAvatarSk');
    if (av) { av.src = m.user.avatar; av.hidden = false; }
    if (avSk && avSk.parentNode) avSk.parentNode.removeChild(avSk);
    const nm = $('#ghName'), nmSk = $('#ghNameSk');
    if (nm) { nm.textContent = m.user.name; nm.hidden = false; }
    if (nmSk && nmSk.parentNode) nmSk.parentNode.removeChild(nmSk);
    const login = $('#ghLogin');
    if (login) login.setAttribute('href', m.user.html);
    const bio = $('#ghBio');
    if (bio) bio.textContent = m.user.bio || 'Building AI tools, games and learning platforms — in public.';
    const meta = $('#ghMeta');
    if (meta) {
      meta.innerHTML =
        '<span>◉ ' + esc(m.user.location) + '</span>' +
        '<span>joined ' + (m.user.created ? new Date(m.user.created).getFullYear() : '—') + '</span>' +
        '<span><b>' + fmt(m.user.followers) + '</b> followers</span>' +
        '<span><b>' + fmt(m.user.following) + '</b> following</span>';
    }

    const barEl = $('#langBar'), legEl = $('#langLegend');
    if (barEl && legEl) {
      if (!m.langs.length) {
        barEl.innerHTML = '<span class="lg">no language data yet</span>';
        legEl.innerHTML = '';
      } else {
        barEl.innerHTML = m.langs.map(l =>
          '<span class="lang-seg" style="width:' + l.pct + '%;background:' + langColor(l.n) + '" title="' + esc(l.n) + ' · ' + l.pct + '%"></span>'
        ).join('');
        legEl.innerHTML = m.langs.map(l =>
          '<span class="lg"><i style="background:' + langColor(l.n) + '"></i>' + esc(l.n) + ' <small>' + l.pct + '%</small></span>'
        ).join('');
      }
    }

    const list = $('#repoList');
    if (list) {
      list.innerHTML = m.top.map((r, i) =>
        '<li class="repo-item">' +
          '<span class="repo-rank">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<a class="repo-name" href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.name) + '</a>' +
          '<span class="repo-meta">' +
            (r.lang ? '<span class="repo-lang"><i style="background:' + langColor(r.lang) + '"></i>' + esc(r.lang) + '</span>' : '') +
            '<span>★ ' + fmt(r.stars) + '</span>' +
          '</span>' +
          (r.desc ? '<span class="repo-desc">' + esc(r.desc) + '</span>' : '') +
        '</li>'
      ).join('');
    }

    const actDate = $('#lastPushDate'), actRepo = $('#lastPushRepo');
    if (actDate) actDate.textContent = m.lastPush ? fmtDate(m.lastPush.at) : '—';
    if (actRepo) {
      actRepo.textContent = m.lastPush ? m.lastPush.name + ' ↗' : 'view profile ↗';
      actRepo.setAttribute('href', m.lastPush ? m.lastPush.url : ('https://github.com/' + GH_USER));
    }
  }

  /* ---------------- orchestration ---------------- */
  let ghBusy = false;
  async function tryLive(force) {
    if (ghBusy) return;
    ghBusy = true;
    const btn = $('#ghRefresh');
    if (btn) btn.style.opacity = '0.45';
    try {
      const data = await fetchGH();
      const model = buildModel(data.user, data.repos);
      writeCache(model);
      render(model, 'live', Date.now());
    } catch (err) {
      if (force) toast('GitHub API unavailable — snapshot shown');
      if (!rendered) {
        const c = readCache(true);
        if (c) render(c.model, 'cache', c.fetchedAt);
        else render(buildModel(FALLBACK_RAW.user, FALLBACK_RAW.repos), 'snapshot', null);
      }
    } finally {
      ghBusy = false;
      if (btn) btn.style.opacity = '';
    }
  }

  const refreshBtn = $('#ghRefresh');
  if (refreshBtn) refreshBtn.addEventListener('click', () => {
    try { localStorage.removeItem(CACHE_KEY); } catch (e) {}
    tryLive(true);
  });

  (function initGH() {
    const c = readCache();
    if (c) { render(c.model, 'cache', c.fetchedAt); }
    tryLive();
  })();
})();