/* ============================================================
   main.js — Lógica principal: Dark Mode, Búsqueda, Menú
   ============================================================ */

// ─── DARK MODE ───────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('datacaf-theme') || 'light';
  document.documentElement.dataset.theme = saved;
  updateThemeIcons(saved);
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme;
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('datacaf-theme', next);
  updateThemeIcons(next);
}

function updateThemeIcons(theme) {
  const icon = document.getElementById('theme-icon');
  const mIcon = document.getElementById('mobile-theme-icon');
  const emoji = theme === 'dark' ? '☀️' : '🌙';
  if (icon) icon.textContent = emoji;
  if (mIcon) mIcon.textContent = emoji;
}

// ─── NOTIFICATION BANNER ─────────────────────────────────────
function initBanner() {
  const banner = document.getElementById('notification-banner');
  const dismiss = document.getElementById('dismiss-banner');
  if (!banner || !dismiss) return;

  if (sessionStorage.getItem('banner-dismissed')) {
    banner.style.display = 'none';
    return;
  }

  dismiss.addEventListener('click', () => {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-100%)';
    banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    setTimeout(() => { banner.style.display = 'none'; }, 300);
    sessionStorage.setItem('banner-dismissed', '1');
  });
}

// ─── MOBILE MENU ─────────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// ─── HERO SEARCH ─────────────────────────────────────────────
function initHeroSearch() {
  const input = document.getElementById('hero-search-input');
  const btn = document.getElementById('hero-search-btn');
  if (!input || !btn) return;

  function doSearch() {
    const q = input.value.trim();
    if (q) {
      window.location.href = `datasets.html?q=${encodeURIComponent(q)}`;
    }
  }

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });
}

// ─── MOBILE THEME TOGGLE ─────────────────────────────────────
function initMobileThemeToggle() {
  const btn = document.getElementById('mobile-theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', toggleTheme);
}

// ─── ACTIVE NAV LINK ─────────────────────────────────────────
function initActiveNav() {
  let current = window.location.pathname.split('/').pop() || 'index.html';
  if (current === 'dataset-detail.html') current = 'datasets.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(current)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ─── SEARCH PAGE (datasets.html) — estilo USA: sidebar de facetas + lista ──
function initDatasetPage() {
  if (!document.getElementById('datasets-container')) return;

  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q') || '';
  const initialCat = params.get('cat') || '';
  const initialFormat = params.get('format') || '';
  const initialOrg = params.get('org') || '';

  let currentQuery = initialQuery;
  let currentCat = initialCat;
  let currentFormat = initialFormat;
  let currentOrg = initialOrg;
  let currentPage = 1;
  const PER_PAGE = 10;

  const searchInput = document.getElementById('datasets-search');
  const resultsContainer = document.getElementById('datasets-container');
  const countEl = document.getElementById('results-count');
  const paginationEl = document.getElementById('pagination');
  const sortSelect = document.getElementById('sort-select');
  const facetCategoryEl = document.getElementById('facet-category');
  const facetFormatEl = document.getElementById('facet-format');
  const facetOrgEl = document.getElementById('facet-org');

  if (searchInput && initialQuery) searchInput.value = initialQuery;

  const checkIcon = '<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function buildFacet(container, items, activeValue, onSelect) {
    if (!container) return;
    container.innerHTML = items.map(item => `
      <div class="facet-item ${item.value === activeValue ? 'active' : ''}" data-value="${item.value}" role="button" tabindex="0">
        <span class="facet-checkbox">${checkIcon}</span>
        <span class="facet-label">${item.label}</span>
        <span class="facet-count">(${item.count})</span>
      </div>`).join('');
    container.querySelectorAll('.facet-item').forEach(el => {
      const select = () => {
        const val = el.dataset.value;
        onSelect(el.classList.contains('active') ? '' : val);
        currentPage = 1;
        renderAll();
      };
      el.addEventListener('click', select);
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); } });
    });
  }

  function renderFacets() {
    const catCounts = {};
    const fmtCounts = {};
    const orgCounts = {};
    DATASETS.forEach(ds => {
      catCounts[ds.category] = (catCounts[ds.category] || 0) + 1;
      ds.formats.forEach(f => { fmtCounts[f] = (fmtCounts[f] || 0) + 1; });
      orgCounts[ds.org] = (orgCounts[ds.org] || 0) + 1;
    });

    const catItems = Object.keys(CATEGORIES).map(key => ({
      value: key, count: catCounts[key] || 0,
      label: `${CATEGORIES[key].icon} ${CATEGORIES[key].name}`
    }));
    buildFacet(facetCategoryEl, catItems, currentCat, v => currentCat = v);

    const fmtItems = Object.keys(fmtCounts).sort().map(key => ({
      value: key, count: fmtCounts[key], label: key.toUpperCase()
    }));
    buildFacet(facetFormatEl, fmtItems, currentFormat, v => currentFormat = v);

    const orgItems = Object.keys(orgCounts).sort().map(key => ({
      value: key, count: orgCounts[key], label: key
    }));
    buildFacet(facetOrgEl, orgItems, currentOrg, v => currentOrg = v);
  }

  // Search input
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentQuery = searchInput.value.trim().toLowerCase();
        currentPage = 1;
        renderResults();
      }, 300);
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => { currentPage = 1; renderResults(); });
  }

  function filterDatasets() {
    return DATASETS.filter(ds => {
      const matchQ = !currentQuery ||
        ds.title.toLowerCase().includes(currentQuery) ||
        ds.desc.toLowerCase().includes(currentQuery) ||
        ds.org.toLowerCase().includes(currentQuery);
      const matchCat = !currentCat || ds.category === currentCat;
      const matchFmt = !currentFormat || ds.formats.includes(currentFormat);
      const matchOrg = !currentOrg || ds.org === currentOrg;
      return matchQ && matchCat && matchFmt && matchOrg;
    });
  }

  function sortDatasets(list) {
    const sort = sortSelect ? sortSelect.value : 'relevance';
    const sorted = list.slice();
    if (sort === 'recent') sorted.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    else if (sort === 'popular') sorted.sort((a, b) => b.views - a.views);
    return sorted;
  }

  function renderResults() {
    const filtered = sortDatasets(filterDatasets());
    const total = filtered.length;
    const pages = Math.ceil(total / PER_PAGE);
    const slice = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    if (countEl) {
      countEl.innerHTML = `Mostrando <strong>${slice.length}</strong> de <strong>${total}</strong> datasets`;
    }

    if (!resultsContainer) return;

    if (slice.length === 0) {
      resultsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3 class="empty-title">Sin resultados</h3>
          <p class="empty-text">No se encontraron datasets para tu búsqueda. Intenta con otros términos.</p>
          <button class="btn btn-outline" onclick="clearFilters()">Limpiar filtros</button>
        </div>`;
    } else {
      resultsContainer.innerHTML = slice.map(ds => renderRow(ds)).join('');
      setTimeout(() => {
        resultsContainer.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
      }, 50);
    }

    renderPagination(total, pages);
  }

  function renderRow(ds) {
    const cat = CATEGORIES[ds.category];
    const formats = ds.formats.map(f => `<span class="badge badge-${f}">${f.toUpperCase()}</span>`).join('');
    const date = ds.date ? new Date(ds.date + '-01').toLocaleDateString('es', {month:'short', year:'numeric'}) : '';
    return `
      <a href="dataset-detail.html?id=${ds.id}" class="dataset-row reveal" style="--cat-color:${cat ? cat.color : ''};--cat-bg:${cat ? cat.color.replace(')', ',0.14)').replace('hsl', 'hsla') : ''};" aria-label="${ds.title}">
        <span class="dataset-row-badge">${cat ? cat.name : ds.category}</span>
        <h3 class="dataset-row-title">${ds.title}</h3>
        <div class="dataset-row-meta">
          <span><strong>Organismo:</strong> ${ds.org}</span>
          <span><strong>Actualizado:</strong> ${date}</span>
        </div>
        <p class="dataset-row-desc">${ds.desc}</p>
        <div class="dataset-row-footer">
          <div class="dataset-row-formats">${formats}</div>
          <div class="dataset-row-stats">👁 ${ds.views.toLocaleString('es')} vistas · ⬇ ${ds.downloads.toLocaleString('es')} descargas</div>
        </div>
      </a>`;
  }

  function renderPagination(total, pages) {
    if (!paginationEl || pages <= 1) {
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }
    let html = `<button class="page-btn" onclick="changePage(${currentPage-1})" ${currentPage===1?'disabled':''} aria-label="Página anterior">‹</button>`;
    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || Math.abs(i - currentPage) <= 1) {
        html += `<button class="page-btn ${i===currentPage?'active':''}" onclick="changePage(${i})" aria-label="Página ${i}" aria-current="${i===currentPage?'page':'false'}">${i}</button>`;
      } else if (Math.abs(i - currentPage) === 2) {
        html += `<span style="color:var(--text-muted);padding:0 4px">…</span>`;
      }
    }
    html += `<button class="page-btn" onclick="changePage(${currentPage+1})" ${currentPage===pages?'disabled':''} aria-label="Página siguiente">›</button>`;
    paginationEl.innerHTML = html;
  }

  function renderAll() {
    renderFacets();
    renderResults();
  }

  window.changePage = (page) => {
    const filtered = filterDatasets();
    const pages = Math.ceil(filtered.length / PER_PAGE);
    if (page < 1 || page > pages) return;
    currentPage = page;
    renderResults();
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  window.clearFilters = () => {
    currentQuery = '';
    currentCat = '';
    currentFormat = '';
    currentOrg = '';
    currentPage = 1;
    if (searchInput) searchInput.value = '';
    renderAll();
  };

  renderAll();
}

// ─── FAQ ACCORDION (about.html) ──────────────────────────────
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// ─── ABOUT PAGE TOC (about.html) ─────────────────────────────
function initAboutToc() {
  const toc = document.getElementById('about-toc');
  if (!toc) return;

  const links = Array.from(toc.querySelectorAll('.toc-link'));
  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = toc.querySelector(`.toc-link[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initBanner();
  initMobileMenu();
  initHeroSearch();
  initMobileThemeToggle();
  initActiveNav();
  initDatasetPage();
  initFaqAccordion();
  initAboutToc();

  // Desktop theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
});
