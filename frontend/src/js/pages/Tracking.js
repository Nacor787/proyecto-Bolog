import { CLOUDINARY_LOGO_BOLOG as logoSrc } from '../utils/cloudinary.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Clave pública del sitio (Cloudflare Turnstile - site key)
const TURNSTILE_SITE_KEY = '0x4AAAAAAEus0lx4TY32QfMWUdyYpnBjq6s';

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
                <img src="${logoSrc}" alt="BOLOG Logo" class="w-64 sm:w-80 md:w-96 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" />
              </a>
            </div>
            
            <div class="flex-1 w-full max-w-md">
              <label for="tracking-input" class="block text-sm font-bold text-white mb-2 tracking-wide" data-i18n="trackingPage.inputLabel">Código o Nro. de Documento</label>
              <div class="flex flex-col sm:flex-row gap-3">
                <input type="text" id="tracking-input" placeholder="Ej. BLG-123456" data-i18n-placeholder="trackingPage.inputPlaceholder"
                  class="flex-1 bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder-white/50 font-mono text-lg" />
                <button id="tracking-btn" class="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <span id="tracking-btn-text" data-i18n="trackingPage.searchBtn">BUSCAR</span>
                </button>
              </div>

              <!-- Cloudflare Turnstile CAPTCHA -->
              <div class="mt-4">
                <div id="turnstile-container" class="cf-turnstile" data-sitekey="${TURNSTILE_SITE_KEY}" data-theme="dark" data-callback="onTurnstileSuccess" data-expired-callback="onTurnstileExpired"></div>
              </div>

              <!-- Rate-limit feedback -->
              <div id="rate-limit-msg" class="hidden mt-3 flex items-center gap-2 text-amber-400 text-sm font-semibold">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span id="rate-limit-text">Demasiados intentos. Espera <span id="rate-cooldown">60</span>s.</span>
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
         
         <!-- Resultado: datos JSON -->
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

         <!-- Resultado: modo iframe (sistema externo HTML) -->
         <div id="tracking-iframe-wrapper" class="hidden">
           <div class="flex items-center justify-between mb-4">
             <h3 class="text-xl font-bold text-white flex items-center gap-3">
               <span class="bg-sky-500 w-2 h-8 rounded-full"></span>
               <span data-i18n="trackingPage.resultsFor">Resultados para:</span>
               <span id="res-iframe-code" class="text-sky-400 font-mono"></span>
             </h3>
             <a id="res-open-link" href="#" target="_blank" rel="noopener noreferrer"
               class="flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors border border-sky-500/30 px-3 py-1.5 rounded-lg">
               <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
               Abrir en nueva pestaña
             </a>
           </div>
           <iframe id="tracking-iframe" src="" title="Resultado tracking BLG"
             class="w-full rounded-xl border border-white/10 bg-white"
             style="height: 600px; min-height: 400px;"
             sandbox="allow-scripts allow-same-origin allow-forms">
           </iframe>
         </div>
      </div>

    </div>
  </section>
`;

// ── Estado del rate-limiting en cliente ───────────────────────────────────────
const CLIENT_RATE_LIMIT = 5; // max intentos locales antes de bloqueo visual
const CLIENT_WINDOW_MS  = 60_000; // 60 segundos
let _attempts = [];
let _cooldownTimer = null;

function isRateLimited() {
  const now = Date.now();
  _attempts = _attempts.filter(t => now - t < CLIENT_WINDOW_MS);
  return _attempts.length >= CLIENT_RATE_LIMIT;
}

function registerAttempt() {
  _attempts.push(Date.now());
}

function startCooldownUI(btn, rateMsgEl, cooldownEl) {
  if (_cooldownTimer) return;
  const endTime = Date.now() + CLIENT_WINDOW_MS;
  btn.disabled = true;
  rateMsgEl.classList.remove('hidden');

  _cooldownTimer = setInterval(() => {
    const remaining = Math.ceil((endTime - Date.now()) / 1000);
    if (remaining <= 0) {
      clearInterval(_cooldownTimer);
      _cooldownTimer = null;
      _attempts = [];
      btn.disabled = false;
      rateMsgEl.classList.add('hidden');
    } else {
      cooldownEl.textContent = remaining;
    }
  }, 1000);
}

// ── Token Turnstile ────────────────────────────────────────────────────────────
let _turnstileToken = null;

window.onTurnstileSuccess = (token) => { _turnstileToken = token; };
window.onTurnstileExpired = ()      => { _turnstileToken = null; };

function resetTurnstile() {
  _turnstileToken = null;
  if (window.turnstile) window.turnstile.reset('#turnstile-container');
}

// ── Carga del script de Turnstile (una sola vez) ──────────────────────────────
function loadTurnstileScript() {
  if (document.getElementById('cf-turnstile-script')) return;
  const s = document.createElement('script');
  s.id  = 'cf-turnstile-script';
  s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
}

// ── Lógica de búsqueda ────────────────────────────────────────────────────────
async function doSearch(code, btn, input, area, loading, dataView, iframeWrapper, iframeEl, rateMsgEl, cooldownEl) {
  if (!code) {
    import('../components/UI.js').then(m => m.showAlert('Por favor, ingrese un código de seguimiento.', 'error'));
    return;
  }

  // Rate limit cliente
  if (isRateLimited()) {
    startCooldownUI(btn, rateMsgEl, cooldownEl);
    return;
  }

  // Verificar CAPTCHA
  if (!_turnstileToken) {
    import('../components/UI.js').then(m => m.showAlert('Completa la verificación de seguridad primero.', 'error'));
    return;
  }

  registerAttempt();
  if (isRateLimited()) startCooldownUI(btn, rateMsgEl, cooldownEl);

  // Mostrar loading
  area.classList.remove('hidden');
  loading.classList.remove('hidden');
  dataView.classList.add('hidden');
  iframeWrapper.classList.add('hidden');
  btn.disabled = true;
  document.getElementById('tracking-btn-text').textContent = 'Buscando...';

  const captchaToken = _turnstileToken;
  resetTurnstile(); // consumir token

  try {
    const response = await fetch('/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tracking_number: code, captcha_token: captchaToken }),
    });

    loading.classList.add('hidden');

    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: 'Error desconocido.' }));
      area.classList.add('hidden');
      import('../components/UI.js').then(m => m.showAlert(err.detail || 'Error al buscar el tracking.', 'error'));
      return;
    }

    const data = await response.json();

    if (data.html_mode) {
      // Mostrar en iframe
      const link = document.getElementById('res-open-link');
      const codeEl = document.getElementById('res-iframe-code');
      codeEl.textContent = data.tracking_number;
      link.href = data.source_url;
      iframeEl.src = data.source_url;
      iframeWrapper.classList.remove('hidden');

      gsap.fromTo('#tracking-iframe-wrapper', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
    } else {
      // Mostrar tarjetas de datos
      document.getElementById('res-tracking-number').innerText = data.tracking_number;
      document.getElementById('res-status').innerText   = data.status   || '—';
      document.getElementById('res-location').innerText = data.location  || '—';
      document.getElementById('res-date').innerText     = data.estimated_delivery || '—';

      dataView.classList.remove('hidden');
      gsap.fromTo('.result-card',
        { y: 30, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
      );
      gsap.from('#tracking-data h3', { y: 15, opacity: 0, duration: 0.4, ease: 'power2.out' });
    }

  } catch {
    loading.classList.add('hidden');
    area.classList.add('hidden');
    import('../components/UI.js').then(m => m.showAlert('Error de red. Comprueba tu conexión e intenta de nuevo.', 'error'));
  } finally {
    btn.disabled = isRateLimited() ? true : false;
    document.getElementById('tracking-btn-text').textContent = 'BUSCAR';
  }
}

// ── Init principal ─────────────────────────────────────────────────────────────
export function initTracking() {
  const btn           = document.getElementById('tracking-btn');
  const input         = document.getElementById('tracking-input');
  const area          = document.getElementById('tracking-result-area');
  const loading       = document.getElementById('tracking-loading');
  const dataView      = document.getElementById('tracking-data');
  const iframeWrapper = document.getElementById('tracking-iframe-wrapper');
  const iframeEl      = document.getElementById('tracking-iframe');
  const rateMsgEl     = document.getElementById('rate-limit-msg');
  const cooldownEl    = document.getElementById('rate-cooldown');

  // Cargar Turnstile
  loadTurnstileScript();

  // ── GSAP: entrada escalonada ───────────────────────────────────────────────
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

  // ── Decoración continua ────────────────────────────────────────────────────
  gsap.to('.tracking-deco-1', { y: 35, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.to('.tracking-deco-2', { y: -35, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1 });

  if (!btn || !input) return;

  const search = () => doSearch(
    input.value.trim(), btn, input, area, loading, dataView, iframeWrapper, iframeEl, rateMsgEl, cooldownEl
  );

  btn.addEventListener('click', search);

  // Enter sin repetición continua con tecla presionada
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.repeat) search();
  });

  // ── Leer parámetro GET ?codigo= de la URL hash ─────────────────────────────
  // La app usa hash routing: #tracking?codigo=BLG-123
  // También soportamos ?codigo= en la URL directa (si el backend redirige)
  function getCodigoFromUrl() {
    // Revisar query string directo: https://...?codigo=XXX
    const urlParams = new URLSearchParams(window.location.search);
    const fromQuery = urlParams.get('codigo');
    if (fromQuery) return fromQuery;

    // Revisar dentro del hash: #tracking?codigo=XXX
    const hash = window.location.hash; // ej: "#tracking?codigo=38E3UE"
    const hashQuery = hash.includes('?') ? hash.split('?')[1] : '';
    const hashParams = new URLSearchParams(hashQuery);
    return hashParams.get('codigo') || null;
  }

  const codigoAuto = getCodigoFromUrl();
  if (codigoAuto) {
    input.value = codigoAuto;
    // Esperar a que Turnstile cargue y resuelva (max ~3s) antes de auto-buscar
    const MAX_WAIT = 6000;
    const CHECK_INTERVAL = 300;
    let waited = 0;
    const waitForToken = setInterval(() => {
      waited += CHECK_INTERVAL;
      if (_turnstileToken) {
        clearInterval(waitForToken);
        // Pequeña pausa visual para que el usuario vea que hay código prellenado
        setTimeout(() => search(), 400);
      } else if (waited >= MAX_WAIT) {
        clearInterval(waitForToken);
        // Si no llega token automáticamente, al menos dejar el input prellenado
        // y notificar que el usuario debe completar el CAPTCHA
        import('../components/UI.js').then(m =>
          m.showAlert(`Código prellenado: ${codigoAuto}. Completa la verificación y presiona BUSCAR.`, 'info')
        );
      }
    }, CHECK_INTERVAL);
  }
}
