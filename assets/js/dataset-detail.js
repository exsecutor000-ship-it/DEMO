/* ============================================================
   dataset-detail.js — Página de detalle de dataset (estilo data.gov.sg)
   Genera un explorador de datos de muestra a partir del dataset
   seleccionado en DATASETS (assets/js/data.js)
   ============================================================ */

function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function parseYearRange(ds) {
  const match = ds.title.match(/(\d{4})\s*[-–]\s*(\d{4})/);
  if (match) return { start: parseInt(match[1]), end: parseInt(match[2]) };
  const end = ds.date ? parseInt(ds.date.split('-')[0]) : 2024;
  return { start: end - 9, end };
}

function buildSampleTable(ds) {
  const { start, end } = parseYearRange(ds);
  const years = [];
  for (let y = end; y >= start && years.length < 6; y--) years.push(y);
  years.reverse();

  const rand = seededRandom(ds.id * 7919 + 13);
  const rows = [
    { label: 'Valor principal', base: 40 + rand() * 60, drift: 1 + rand() * 3, decimals: 1 },
    { label: 'Variación interanual (%)', base: -2 + rand() * 6, drift: 0.4, decimals: 1 },
    { label: 'Promedio regional', base: 30 + rand() * 40, drift: 0.8 + rand() * 1.5, decimals: 1 },
    { label: 'Cobertura de países (%)', base: 55 + rand() * 30, drift: 0.6, decimals: 0 }
  ];

  return years.map((year, yi) => {
    const values = rows.map(row => {
      const v = row.base + row.drift * yi + (rand() - 0.5) * row.drift;
      return v.toFixed(row.decimals);
    });
    return { year, values };
  }).concat([{ meta: rows.map(r => r.label) }]);
}

function renderDatasetDetail() {
  const container = document.getElementById('detail-root');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const ds = DATASETS.find(d => d.id === id) || DATASETS[0];
  const cat = CATEGORIES[ds.category];
  const agency = AGENCY_INFO[ds.category];
  const { start, end } = parseYearRange(ds);
  const dateDisplay = ds.date ? new Date(ds.date + '-01').toLocaleDateString('es', { month: 'long', year: 'numeric' }) : '';

  document.title = `${ds.title} · DataCAF`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', ds.desc);

  document.getElementById('breadcrumb-cat').textContent = cat ? cat.name : ds.category;
  document.getElementById('breadcrumb-cat').href = `datasets.html?cat=${ds.category}`;
  document.getElementById('detail-badge').textContent = cat ? cat.name : ds.category;
  document.getElementById('detail-badge').style.background = cat ? cat.color.replace(')', ',0.14)').replace('hsl', 'hsla') : '';
  document.getElementById('detail-badge').style.color = cat ? cat.color : '';
  document.getElementById('detail-title').textContent = ds.title;
  document.getElementById('detail-source').innerHTML = `Fuente: <strong>${agency ? agency.name : ds.org}</strong> · ${ds.org}`;

  document.getElementById('meta-updated').textContent = dateDisplay || '—';
  document.getElementById('meta-freq').textContent = agency ? agency.freq : 'Anual';
  document.getElementById('meta-range').textContent = `${start} a ${end}`;
  document.getElementById('meta-formats').innerHTML = ds.formats.map(f => `<span class="badge badge-${f}">${f.toUpperCase()}</span>`).join(' ');
  document.getElementById('meta-agency').textContent = agency ? agency.full : 'CAF – Banco de Desarrollo de América Latina y el Caribe';

  document.getElementById('detail-footnote').textContent = ds.desc + ` Los datos son recopilados y validados por ${agency ? agency.name : ds.org} siguiendo la metodología estándar de CAF para series históricas comparables entre países.`;

  document.getElementById('download-btn').setAttribute('href', `datasets/data.json`);
  document.getElementById('download-btn').setAttribute('download', '');
  document.getElementById('download-label').textContent = `Descargar ${ds.formats[0].toUpperCase()}`;

  // Tabla de datos de muestra
  const table = buildSampleTable(ds);
  const rowLabels = table.pop().meta;
  const theadRow = ['Año', ...rowLabels].map(h => `<th>${h}</th>`).join('');
  const tbodyRows = table.map(r => `<tr><td>${r.year}</td>${r.values.map(v => `<td>${v}</td>`).join('')}</tr>`).join('');
  document.getElementById('data-table-head').innerHTML = theadRow;
  document.getElementById('data-table-body').innerHTML = tbodyRows;
  document.getElementById('explorer-sub').textContent = `${ds.title.replace(/\s+/g, '')}.${ds.formats[0]} · mostrando ${rowLabels.length} de ${rowLabels.length} columnas de muestra`;

  // Datasets relacionados (misma categoría)
  const related = DATASETS.filter(d => d.category === ds.category && d.id !== ds.id).slice(0, 4);
  const relatedEl = document.getElementById('related-list');
  if (related.length) {
    relatedEl.innerHTML = related.map(r => `
      <a href="dataset-detail.html?id=${r.id}" class="dataset-row" style="padding:var(--space-4);">
        <h3 class="dataset-row-title" style="font-size:var(--text-base);">${r.title}</h3>
        <div class="dataset-row-meta"><span>${r.org}</span></div>
      </a>`).join('');
  } else {
    relatedEl.innerHTML = '<p class="content-prose">No hay otros datasets en esta categoría todavía.</p>';
  }

  container.classList.add('page-enter');
}

document.addEventListener('DOMContentLoaded', renderDatasetDetail);
