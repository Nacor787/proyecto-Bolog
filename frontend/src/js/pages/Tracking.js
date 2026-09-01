const logoSrc = 'https://res.cloudinary.com/oyusqpnf/image/upload/v1787506176/logo-bolog.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const TrackingPage = `
  <section id="tracking-page" class="min-h-screen pt-40 pb-20 bg-transparent text-white font-sans relative overflow-hidden">

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Encabezado y Breadcrumbs Premium -->
      <div class="tracking-header flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 class="text-4xl font-extrabold text-white tracking-tight mb-2" data-i18n="trackingPage.title">Tracking Operaciones</h1>
          <p class="text-slate-300 text-sm font-medium" data-i18n="trackingPage.subtitle">Consulte el estado en tiempo real de su carga internacional</p>
        </div>
        
        <div class="breadcrumb-pill flex items-center gap-2 text-sm font-bold bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 mt-4 md:mt-0 shadow-sm">
          <a href="http://sis.blg.com.bo/" target="_blank" rel="noopener noreferrer" class="text-slate-300 hover:text-white transition-colors flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            <span data-i18n="trackingPage.iniciar">Iniciar</span>
          </a>
          <span class="text-slate-500">/</span> 
          <a href="#login" class="text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
            <span data-i18n="nav.login">Acceder</span>
          </a> 
          <span class="text-slate-500">/</span> 
          <span class="text-slate-200" data-i18n="trackingPage.breadcrumb">Tracking Operaciones</span>
        </div>
      </div>

      <!-- Tracking Card Principal -->
      <div class="tracking-card bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden mb-12">
        <div class="flex flex-col lg:flex-row">
          
          <!-- Izquierda: Logo y Buscador -->
          <div class="tracking-card-left flex-1 p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12 relative bg-[#0B192C]">
            <!-- Barra decorativa izquierda -->
            <div class="accent-bar absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-sky-400 to-sky-600"></div>

            <div class="shrink-0">
              <a href="#">
                <img src="${logoSrc}" alt="BOLOG Logo" class="w-48 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" />
              </a>
            </div>
            
            <div class="flex-1 w-full max-w-md">
              <label for="tracking-input" class="block text-sm font-bold text-white mb-2 tracking-wide" data-i18n="trackingPage.inputLabel">Código o Nro. de Documento</label>
              <div class="flex flex-col sm:flex-row gap-3">
                <input type="text" id="tracking-input" placeholder="Ej. BLG-123456" data-i18n-placeholder="trackingPage.inputPlaceholder"
                  class="flex-1 bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder-white/50 font-mono text-lg" />
                <button id="tracking-btn" class="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <span data-i18n="trackingPage.searchBtn">BUSCAR</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Derecha: Panel de Información -->
          <div class="tracking-card-right w-full lg:w-1/3 bg-gradient-to-br from-sky-600 to-primary-700 p-8 text-white relative overflow-hidden flex flex-col justify-center shadow-inner">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 -translate-y-10 blur-xl"></div>
            
            <div class="flex items-start gap-4 relative z-10">
              <svg class="w-8 h-8 shrink-0 text-sky-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <div class="info-badge">
                <p class="font-medium text-lg leading-relaxed mb-4 text-white shadow-sm" data-i18n="trackingPage.info1">
                  Puede buscar por código enviado.
                </p>
                <p class="font-medium text-lg leading-relaxed mb-4 text-white shadow-sm" data-i18n="trackingPage.info2">
                  También por su Nro. de documento.
                </p>
                <p class="font-bold tracking-widest text-sky-100 bg-black/20 inline-block px-3 py-1 rounded" data-i18n="trackingPage.info3">
                  HBL, NBL, HAWB, CRT.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Área de Resultados (Oculta por defecto) -->
      <div id="tracking-result-area" class="hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12 shadow-2xl relative overflow-hidden">
         <div id="tracking-loading" class="hidden text-center py-12">
            <svg class="animate-spin h-10 w-10 text-sky-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-slate-300 font-medium" data-i18n="trackingPage.loading">Buscando información...</p>
         </div>
         
         <div id="tracking-data" class="hidden">
            <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span class="bg-sky-500 w-2 h-8 rounded-full"></span>
              <span data-i18n="trackingPage.resultsFor">Resultados para:</span> <span id="res-tracking-number" class="text-sky-400 font-mono"></span>
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="result-card bg-black/30 p-6 rounded-xl border border-white/5">
                <p class="text-sm text-slate-400 mb-1" data-i18n="trackingPage.status">Estado Actual</p>
                <p id="res-status" class="text-xl font-bold text-white"></p>
              </div>
              <div class="result-card bg-black/30 p-6 rounded-xl border border-white/5">
                <p class="text-sm text-slate-400 mb-1" data-i18n="trackingPage.location">Ubicación</p>
                <p id="res-location" class="text-xl font-bold text-white"></p>
              </div>
              <div class="result-card bg-black/30 p-6 rounded-xl border border-white/5">
                <p class="text-sm text-slate-400 mb-1" data-i18n="trackingPage.estimated">Entrega Estimada</p>
                <p id="res-date" class="text-xl font-bold text-sky-400"></p>
              </div>
            </div>
         </div>
      </div>

    </div>
  </section>
`;

export function initTracking() {
  const btn = document.getElementById('tracking-btn');
  const input = document.getElementById('tracking-input');
  const area = document.getElementById('tracking-result-area');
  const loading = document.getElementById('tracking-loading');
  const dataView = document.getElementById('tracking-data');

  // ── GSAP: entrada escalonada al cargar la vista ─────────────
  ScrollTrigger.getAll().forEach(t => t.kill());

  const ease = 'power3.out';
  gsap.from('.tracking-header h1', {
    y: 40, opacity: 0, duration: 0.8, ease,
    scrollTrigger: { trigger: '.tracking-header', start: 'top 92%' }
  });
  gsap.from('.tracking-header p', {
    y: 24, opacity: 0, duration: 0.7, delay: 0.12, ease,
    scrollTrigger: { trigger: '.tracking-header', start: 'top 92%' }
  });
  gsap.from('.breadcrumb-pill', {
    scale: 0.85, opacity: 0, duration: 0.5, delay: 0.25, ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '.tracking-header', start: 'top 92%' }
  });
  gsap.from('.tracking-card', {
    y: 60, opacity: 0, duration: 0.9, ease,
    scrollTrigger: { trigger: '.tracking-card', start: 'top 88%' }
  });
  gsap.from('.tracking-card-left', {
    x: -45, opacity: 0, duration: 0.8, ease,
    scrollTrigger: { trigger: '.tracking-card', start: 'top 88%' }
  });
  gsap.from('.tracking-card-right', {
    x: 45, opacity: 0, duration: 0.8, delay: 0.1, ease,
    scrollTrigger: { trigger: '.tracking-card', start: 'top 88%' }
  });
  gsap.from('.accent-bar', {
    scaleY: 0, opacity: 0, duration: 0.6, delay: 0.2, ease,
    transformOrigin: 'top center',
    scrollTrigger: { trigger: '.tracking-card', start: 'top 88%' }
  });
  gsap.from('.tracking-card-right .info-badge', {
    y: 20, opacity: 0, duration: 0.6, delay: 0.3, ease,
    scrollTrigger: { trigger: '.tracking-card', start: 'top 88%' }
  });

  // ── GSAP: movimiento continuo sutil en la decoración de fondo ──
  gsap.to('.tracking-deco-1', { y: 35, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.to('.tracking-deco-2', { y: -35, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1 });

  if (btn && input) {
    btn.addEventListener('click', async () => {
      const val = input.value.trim();
      if (!val) {
        import('../components/UI.js').then(module => {
          module.showAlert('Por favor, ingrese un código de seguimiento.', 'error');
        });
        return;
      }

      area.classList.remove('hidden');
      loading.classList.remove('hidden');
      dataView.classList.add('hidden');

      try {
        const response = await fetch('/tracking?tracking_number=' + encodeURIComponent(val));
        const data = await response.json();

        document.getElementById('res-tracking-number').innerText = data.tracking_number;
        document.getElementById('res-status').innerText = data.status;
        document.getElementById('res-location').innerText = data.location;
        document.getElementById('res-date').innerText = data.estimated_delivery;

        loading.classList.add('hidden');
        dataView.classList.remove('hidden');

        // GSAP: animar la entrada de los resultados
        gsap.fromTo('.result-card',
          { y: 30, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
        );
        gsap.from('#tracking-data h3', { y: 15, opacity: 0, duration: 0.4, ease: 'power2.out' });

      } catch (error) {
        loading.classList.add('hidden');
        area.classList.add('hidden');
        import('../components/UI.js').then(module => {
          module.showAlert('Error al buscar el tracking. Intente de nuevo.', 'error');
        });
      }
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        btn.click();
      }
    });
  }
}
