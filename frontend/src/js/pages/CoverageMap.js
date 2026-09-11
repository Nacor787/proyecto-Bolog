// CoverageMap.js — Filtros y panel de info dinámicos desde /api/cobertura
import { Stats } from './Stats.js';

// HTML del globo y layout principal
export const CoverageMap = `
  <section id="coverage" class="relative bg-transparent pb-0 overflow-hidden flex flex-col min-h-[100svh]">
    
    <!-- Standard Section Header with Glass Shadow -->
    <div class="w-full bg-[#0f0f0f]/35 backdrop-blur-sm relative z-10 flex-none border-b border-white/10 pt-16 md:pt-20 pb-8 mb-8">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <div class="flex items-center gap-2 mb-3">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
          <span class="text-xs font-extrabold tracking-[0.25em] text-sky-400 uppercase">Conectividad Global</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3" data-i18n="coverage.title">
          Rutas Internacionales
        </h2>
        <p class="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed font-medium" data-i18n="coverage.subtitle">
          Visualiza nuestras rutas aéreas y marítimas que conectan a Bolivia con el mundo. Navega por el mapa interactivo para descubrir tiempos de tránsito y hubs operativos.
        </p>
      </div>
    </div>

    <!-- Full-width Map Container -->
    <div class="relative w-full flex-grow bg-transparent min-h-[75vh] md:min-h-[550px] lg:min-h-[600px]">
      
      <!-- Interaction area for OrbitControls -->
      <div id="map-interaction-area" class="absolute inset-0 z-10 cursor-grab active:cursor-grabbing pointer-events-auto"></div>

      <!-- Vignette -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent z-[1] pointer-events-none"></div>

      <!-- Left Overlay: Filters + Zoom -->
      <div class="absolute top-0 left-0 bottom-0 z-20 px-2 py-4 pt-2 md:pt-12 sm:px-3 sm:pt-16 lg:px-4 lg:pt-20 flex flex-col justify-start pointer-events-none w-full md:max-w-[230px] lg:max-w-[260px]">
        
        <div class="pointer-events-auto w-full" data-aos="fade-right">
          
          <div class="flex items-center justify-between mb-2 ml-1">
            <h3 class="text-[10px] font-bold text-sky-400 uppercase tracking-widest" data-i18n="coverage.filters.title">Filtro de Rutas</h3>
            <!-- Zoom Controls -->
            <div class="flex items-center gap-1.5 pointer-events-auto">
              <button id="zoom-in-btn" class="w-7 h-7 rounded bg-[#001d2d]/85 backdrop-blur-xl text-sky-400 flex items-center justify-center hover:bg-sky-500 hover:text-white border border-white/10 shadow-sm transition-all" title="Acercar">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"/></svg>
              </button>
              <button id="zoom-out-btn" class="w-7 h-7 rounded bg-[#001d2d]/85 backdrop-blur-xl text-sky-400 flex items-center justify-center hover:bg-sky-500 hover:text-white border border-white/10 shadow-sm transition-all" title="Alejar">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"/></svg>
              </button>
            </div>
          </div>
          
          <!-- Los botones de filtro se generan dinámicamente en initCoverageMap() -->
          <div id="coverage-filters" class="flex flex-row md:flex-col gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
            <!-- skeleton -->
            <div class="h-10 w-36 rounded-md bg-white/5 animate-pulse"></div>
            <div class="h-10 w-36 rounded-md bg-white/5 animate-pulse"></div>
            <div class="h-10 w-36 rounded-md bg-white/5 animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Info Panel (Right) -->
      <div class="absolute bottom-0 md:bottom-auto md:top-0 right-0 left-0 md:left-auto z-10 px-2 py-4 pb-2 md:pb-8 md:pt-12 sm:px-3 sm:pt-16 lg:px-4 lg:pt-20 flex flex-col justify-end md:justify-start pointer-events-none w-full md:max-w-[280px] lg:max-w-[320px]">
        <div id="route-info-panel" class="bg-[#001d2d]/85 backdrop-blur-xl p-4 md:p-5 sm:p-6 border border-white/10 shadow-2xl rounded-xl pointer-events-auto transition-all duration-300 w-full" data-aos="fade-left" data-aos-delay="200">
          <div class="flex flex-col gap-3 md:gap-5">
            
            <!-- Top: Title & Badge -->
            <div class="border-b border-white/10 pb-3 md:pb-4">
              <div class="flex items-center gap-2 mb-2">
                <span id="route-badge" class="inline-block px-2 py-0.5 rounded bg-sky-500/10 text-[9px] font-black uppercase tracking-widest text-sky-400">
                  Red Logística Global
                </span>
              </div>
              <h4 id="route-title" class="text-sm md:text-base sm:text-lg font-bold text-white leading-snug">
                Todas las Rutas Activas
              </h4>
              <p id="route-type" class="text-[9px] md:text-[10px] text-slate-400 mt-1">Transporte Multimodal</p>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-3 md:gap-4">
              <div class="bg-white/5 rounded-lg p-2 md:p-3 border border-white/5">
                <p class="text-[9px] md:text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-1" data-i18n="coverage.labels.transit">Tiempo de Tránsito</p>
                <p id="route-transit" class="text-xs md:text-sm font-semibold text-white">5 a 35 Días</p>
              </div>
              <div class="bg-white/5 rounded-lg p-2 md:p-3 border border-white/5">
                <p class="text-[9px] md:text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-1" data-i18n="coverage.labels.freq">Frecuencia</p>
                <p id="route-freq" class="text-xs md:text-sm font-semibold text-white">Diaria / Semanal</p>
              </div>
            </div>

            <!-- Hubs/Ports -->
            <div class="bg-white/5 rounded-lg p-3 md:p-4 border border-white/5">
              <p class="text-[9px] md:text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-1" data-i18n="coverage.labels.port">Puerto de Ingreso</p>
              <p id="route-ports" class="text-xs md:text-sm font-bold text-slate-200">Arica, Callao, Santos</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
`;

const lang = () => {
  if (window.i18next && window.i18next.language) {
    return window.i18next.language.startsWith('en') ? 'en' : 'es';
  }
  return (localStorage.getItem('i18nextLng') || 'es').startsWith('en') ? 'en' : 'es';
};

let currentRuta = null;
let currentRegionId = 'all';
let allRutas = [];

// Filtro "Todas las Rutas" siempre presente
const ALL_ROUTE = {
  id: 'all',
  region: 'all',
  region_label_es: 'Todas las Rutas',
  region_label_en: 'All Routes',
  titulo_es: 'Todas las Rutas Activas',
  titulo_en: 'All Active Routes',
  tipo_transporte_es: 'Transporte Multimodal',
  tipo_transporte_en: 'Multimodal Transport',
  tiempo_transito: '5 a 35 Días',
  puerto_entrada: 'Arica, Callao, Santos',
  frecuencia_es: 'Diaria / Semanal',
  frecuencia_en: 'Daily / Weekly',
};

function renderFilterButtons(rutas, activeRegion = 'all') {
  const filtersEl = document.getElementById('coverage-filters');
  if (!filtersEl) return;

  // Obtener regiones únicas
  const regions = ['all', ...new Set(rutas.map(r => r.region))];
  // Mapear region -> datos de la primera ruta de esa región (para label)
  const regionMap = { all: ALL_ROUTE };
  rutas.forEach(r => { regionMap[r.region] = r; });

  const btnClass = (region) => region === activeRegion
    ? 'route-filter-btn active flex-shrink-0 md:w-full flex items-center justify-between px-4 py-2.5 md:py-3 bg-sky-600 text-white font-bold text-xs shadow-md md:border-l-4 border-sky-400 transition-all rounded-md group'
    : 'route-filter-btn flex-shrink-0 md:w-full flex items-center justify-between px-4 py-2.5 md:py-3 bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/5 md:border-0 md:border-l-4 md:border-transparent text-slate-300 hover:text-white font-semibold text-xs transition-all rounded-md group';

  const globeSvg = `<svg class="w-4 h-4 opacity-80 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  const chevronSvg = `<svg class="w-3.5 h-3.5 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`;

  filtersEl.innerHTML = regions.map(region => {
    const r = regionMap[region];
    const label = lang() === 'en' ? r.region_label_en : r.region_label_es;
    return `
      <button class="${btnClass(region)}" data-route-id="${region}">
        <div class="flex items-center gap-2 md:gap-3">
          ${globeSvg}
          <span>${label || region}</span>
        </div>
        ${chevronSvg}
      </button>
    `;
  }).join('');
}

function updateInfoPanel(ruta) {
  currentRuta = ruta;
  const l = lang();
  const setEl = (id, val) => { const el = document.getElementById(id); if (el && val != null) el.textContent = val; };
  const titulo = l === 'en' ? ruta.titulo_en : ruta.titulo_es;
  const tipo = l === 'en' ? ruta.tipo_transporte_en : ruta.tipo_transporte_es;
  const freq = l === 'en' ? ruta.frecuencia_en : ruta.frecuencia_es;
  const badge = l === 'en' ? ruta.region_label_en : ruta.region_label_es;

  setEl('route-badge', badge || (ruta.region === 'all' ? 'Red Logística Global' : ruta.region));
  setEl('route-title', titulo);
  setEl('route-type', tipo);
  setEl('route-transit', ruta.tiempo_transito);
  setEl('route-ports', ruta.puerto_entrada);
  setEl('route-freq', freq);
}

export async function initCoverageMap() {
  if (window.setGlobeInteractionArea) window.setGlobeInteractionArea('map-interaction-area');
  if (window.setupGlobeZoomButtons) window.setupGlobeZoomButtons();

  let rutas = [];

  try {
    const res = await fetch('/api/cobertura');
    if (!res.ok) throw new Error('Error cargando rutas');
    rutas = await res.json();
  } catch (err) {
    console.warn('[CoverageMap] No se pudieron cargar rutas desde la API:', err);
  }

  allRutas = rutas;
  currentRegionId = 'all';

  // Siempre tiene al menos el "all" virtual
  renderFilterButtons(allRutas, currentRegionId);
  updateInfoPanel(ALL_ROUTE);

  if (window.i18next && !window.coverageLangListenerAdded) {
    window.i18next.on('languageChanged', () => {
      renderFilterButtons(allRutas, currentRegionId);
      if (currentRuta) updateInfoPanel(currentRuta);
    });
    window.coverageLangListenerAdded = true;
  }

  // Delegación de eventos en el contenedor
  const filtersEl = document.getElementById('coverage-filters');
  if (!filtersEl) return;

  filtersEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.route-filter-btn');
    if (!btn) return;
    const regionId = btn.getAttribute('data-route-id');
    currentRegionId = regionId;

    // Re-render botones con activo actualizado
    renderFilterButtons(allRutas, currentRegionId);

    // Determinar qué datos mostrar en el panel
    if (regionId === 'all') {
      updateInfoPanel(ALL_ROUTE);
      if (window.filterGlobeRoutes) window.filterGlobeRoutes('all');
    } else {
      const rutasDeRegion = allRutas.filter(r => r.region === regionId);
      if (rutasDeRegion.length) {
        updateInfoPanel(rutasDeRegion[0]);
        if (window.filterGlobeRoutes) window.filterGlobeRoutes(regionId, rutasDeRegion);
      }
    }
  });
}

export const initMapWithVisibilityControl = initCoverageMap;
export const cleanupMapObserver = () => {};
export const destroyMap = () => {};
