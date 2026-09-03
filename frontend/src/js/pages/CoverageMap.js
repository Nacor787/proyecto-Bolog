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
      
      <!-- Interaction area for OrbitControls (Sibling) -->
      <div id="map-interaction-area" class="absolute inset-0 z-10 cursor-grab active:cursor-grabbing pointer-events-auto"></div>

      <!-- Subtle internal vignette -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent z-[1] pointer-events-none"></div>

      <!-- Left Overlay: Filters with Zoom -->
      <div class="absolute top-0 left-0 bottom-0 z-20 px-2 py-4 pt-2 md:pt-12 sm:px-3 sm:pt-16 lg:px-4 lg:pt-20 flex flex-col justify-start pointer-events-none w-full md:max-w-[230px] lg:max-w-[260px]">
        
        <!-- Corporate Route Filters -->
        <div class="pointer-events-auto w-full" data-aos="fade-right">
          
          <div class="flex items-center justify-between mb-2 ml-1">
            <h3 class="text-[10px] font-bold text-sky-400 uppercase tracking-widest" data-i18n="coverage.filters.title">Filtro de Rutas</h3>
            <!-- Zoom Controls inside Filters -->
            <div class="flex items-center gap-1.5 pointer-events-auto">
              <button id="zoom-in-btn" class="w-7 h-7 rounded bg-[#001d2d]/85 backdrop-blur-xl text-sky-400 flex items-center justify-center hover:bg-sky-500 hover:text-white border border-white/10 shadow-sm transition-all" title="Acercar">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"/></svg>
              </button>
              <button id="zoom-out-btn" class="w-7 h-7 rounded bg-[#001d2d]/85 backdrop-blur-xl text-sky-400 flex items-center justify-center hover:bg-sky-500 hover:text-white border border-white/10 shadow-sm transition-all" title="Alejar">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"/></svg>
              </button>
            </div>
          </div>
          
          <div class="flex flex-row md:flex-col gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
            <button class="route-filter-btn active flex-shrink-0 md:w-full flex items-center justify-between px-4 py-2.5 md:py-3 bg-sky-600 text-white font-bold text-xs shadow-md md:border-l-4 border-sky-400 transition-all rounded-md group" data-route-id="all">
              <div class="flex items-center gap-2 md:gap-3">
                <svg class="w-4 h-4 opacity-80 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span data-i18n="coverage.filters.all">Todas las Rutas</span>
              </div>
              <svg class="w-3.5 h-3.5 opacity-100 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
            
            <button class="route-filter-btn flex-shrink-0 md:w-full flex items-center justify-between px-4 py-2.5 md:py-3 bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/5 md:border-0 md:border-l-4 md:border-transparent text-slate-300 hover:text-white font-semibold text-xs transition-all rounded-md group" data-route-id="asia">
              <div class="flex items-center gap-2 md:gap-3">
                <svg class="w-4 h-4 text-sky-400 group-hover:text-sky-300 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                <span data-i18n="coverage.filters.asia">Asia — Pacífico</span>
              </div>
              <svg class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
            
            <button class="route-filter-btn flex-shrink-0 md:w-full flex items-center justify-between px-4 py-2.5 md:py-3 bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/5 md:border-0 md:border-l-4 md:border-transparent text-slate-300 hover:text-white font-semibold text-xs transition-all rounded-md group" data-route-id="na">
              <div class="flex items-center gap-2 md:gap-3">
                <svg class="w-4 h-4 text-sky-400 group-hover:text-sky-300 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span data-i18n="coverage.filters.na">Norteamérica</span>
              </div>
              <svg class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>

            <button class="route-filter-btn flex-shrink-0 md:w-full flex items-center justify-between px-4 py-2.5 md:py-3 bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/5 md:border-0 md:border-l-4 md:border-transparent text-slate-300 hover:text-white font-semibold text-xs transition-all rounded-md group" data-route-id="eu">
              <div class="flex items-center gap-2 md:gap-3">
                <svg class="w-4 h-4 text-sky-400 group-hover:text-sky-300 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                <span data-i18n="coverage.filters.eu">Europa</span>
              </div>
            </button>
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
                <span id="route-badge" data-i18n="coverage.routes.all.badge" class="inline-block px-2 py-0.5 rounded bg-sky-500/10 text-[9px] font-black uppercase tracking-widest text-sky-400">
                  Red Logística Global
                </span>
              </div>
              <h4 id="route-title" data-i18n="coverage.routes.all.title" class="text-sm md:text-base sm:text-lg font-bold text-white leading-snug">
                Todas las Rutas Activas
              </h4>
              <p id="route-type" data-i18n="coverage.routes.all.type" class="text-[9px] md:text-[10px] text-slate-400 mt-1">Transporte Multimodal</p>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-3 md:gap-4">
              <div class="bg-white/5 rounded-lg p-2 md:p-3 border border-white/5">
                <p class="text-[9px] md:text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-1" data-i18n="coverage.labels.transit">Tiempo de Tránsito</p>
                <p id="route-transit" data-i18n="coverage.routes.all.transit" class="text-xs md:text-sm font-semibold text-white">5 a 35 Días</p>
              </div>
              
              <div class="bg-white/5 rounded-lg p-2 md:p-3 border border-white/5">
                <p class="text-[9px] md:text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-1" data-i18n="coverage.labels.freq">Frecuencia</p>
                <p id="route-freq" data-i18n="coverage.routes.all.freq" class="text-xs md:text-sm font-semibold text-white">Diaria / Semanal</p>
              </div>
            </div>

            <!-- Hubs/Ports -->
            <div class="bg-white/5 rounded-lg p-3 md:p-4 border border-white/5">
              <p class="text-[9px] md:text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-1" data-i18n="coverage.labels.port">Puerto de Ingreso</p>
              <p id="route-ports" data-i18n="coverage.routes.all.port" class="text-xs md:text-sm font-bold text-slate-200">Arica, Callao, Santos</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
`;

const ROUTES_DETAILS = {
  all: {
    badge: 'coverage.routes.all.badge',
    title: 'coverage.routes.all.title',
    type: 'coverage.routes.all.type',
    transit: 'coverage.routes.all.transit',
    port: 'coverage.routes.all.port',
    freq: 'coverage.routes.all.freq'
  },
  asia: {
    badge: 'coverage.routes.asia.badge',
    title: 'coverage.routes.asia.title',
    type: 'coverage.routes.asia.type',
    transit: 'coverage.routes.asia.transit',
    port: 'coverage.routes.asia.port',
    freq: 'coverage.routes.asia.freq'
  },
  na: {
    badge: 'coverage.routes.na.badge',
    title: 'coverage.routes.na.title',
    type: 'coverage.routes.na.type',
    transit: 'coverage.routes.na.transit',
    port: 'coverage.routes.na.port',
    freq: 'coverage.routes.na.freq'
  },
  eu: {
    badge: 'coverage.routes.eu.badge',
    title: 'coverage.routes.eu.title',
    type: 'coverage.routes.eu.type',
    transit: 'coverage.routes.eu.transit',
    port: 'coverage.routes.eu.port',
    freq: 'coverage.routes.eu.freq'
  }
};

export function initCoverageMap() {
  if (window.setGlobeInteractionArea) {
    window.setGlobeInteractionArea('map-interaction-area');
  }
  if (window.setupGlobeZoomButtons) {
    window.setupGlobeZoomButtons();
  }

  const filterBtns = document.querySelectorAll('.route-filter-btn');
  const routeBadge = document.getElementById('route-badge');
  const routeTitle = document.getElementById('route-title');
  const routeType = document.getElementById('route-type');
  const routeTransit = document.getElementById('route-transit');
  const routePort = document.getElementById('route-port');
  const routeFreq = document.getElementById('route-freq');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const routeId = btn.getAttribute('data-route-id');

      // Reset all buttons
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-sky-600', 'text-white', 'shadow-md', 'border-sky-400');
        b.classList.add('bg-white/5', 'backdrop-blur-sm', 'hover:bg-white/10', 'border-transparent', 'text-slate-300', 'hover:text-white');

        // Hide chevron and text color in inactive
        const icon = b.querySelector('svg:first-child');
        const chevron = b.querySelector('svg:last-child');
        if (icon) icon.classList.remove('opacity-80', 'text-white');
        if (icon) icon.classList.add('text-sky-400', 'group-hover:text-sky-300');
        if (chevron) chevron.classList.remove('opacity-100');
        if (chevron) chevron.classList.add('opacity-0', 'group-hover:opacity-100');
      });

      // Set active button
      btn.classList.add('active', 'bg-sky-600', 'text-white', 'shadow-md', 'border-sky-400');
      btn.classList.remove('bg-white/5', 'backdrop-blur-sm', 'hover:bg-white/10', 'border-transparent', 'text-slate-300', 'hover:text-white');

      const icon = btn.querySelector('svg:first-child');
      const chevron = btn.querySelector('svg:last-child');
      if (icon) icon.classList.add('opacity-80', 'text-white');
      if (icon) icon.classList.remove('text-sky-400', 'group-hover:text-sky-300');
      if (chevron) chevron.classList.add('opacity-100');
      if (chevron) chevron.classList.remove('opacity-0', 'group-hover:opacity-100');

      // Filter 3D Globe routes
      if (window.filterGlobeRoutes) {
        window.filterGlobeRoutes(routeId);
      }
      // But for now, we just update the info panel
      const data = ROUTES_DETAILS[routeId] || ROUTES_DETAILS.all;
      
      if (routeBadge) routeBadge.setAttribute('data-i18n', data.badge);
      if (routeTitle) routeTitle.setAttribute('data-i18n', data.title);
      if (routeType) routeType.setAttribute('data-i18n', data.type);
      if (routeTransit) routeTransit.setAttribute('data-i18n', data.transit);
      if (routePort) {
        // ID issue fix, it's route-ports in HTML but route-port here. Use route-ports
        const portsEl = document.getElementById('route-ports');
        if (portsEl) portsEl.setAttribute('data-i18n', data.port);
      }
      if (routeFreq) routeFreq.setAttribute('data-i18n', data.freq);

      if (window.updateContent) {
        window.updateContent();
      }
    });
  });
}

export const initMapWithVisibilityControl = initCoverageMap;
export const cleanupMapObserver = () => { };
export const destroyMap = () => { };


