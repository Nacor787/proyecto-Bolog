import { initScrollAnimations, refreshScrollAnimations } from './js/utils/animations.js';
import i18next from 'i18next';
import es from './locales/es.json';
import en from './locales/en.json';

import { Navbar, initNavbar } from './js/components/Navbar.js';
import { Footer } from './js/components/Footer.js';
import { Home, initTypewriter, initHeroSlider } from './js/pages/Home.js';
import { initMundo3D } from './js/components/Mundo3D.js';
import { initDolarBCB } from './js/components/DolarBCB.js';
import { About, initAbout } from './js/pages/About.js';
import { QuoteSection, initQuoteForm } from './js/pages/QuoteSection.js';
import { Services, initServices } from './js/pages/Services.js';
import { Stats, initStats } from './js/pages/Stats.js';
import { Clients, initClientsMarquee } from './js/pages/Clients.js';
import { CoverageMap, initCoverageMap } from './js/pages/CoverageMap.js';
import { NewsSection, loadNews } from './js/pages/News.js';
import { renderNewsArchive } from './js/pages/NewsArchive.js';
import { LocationMap } from './js/pages/LocationMap.js';
import { Login, initLogin } from './js/pages/admin/Login.js';
import { Dashboard, initDashboard } from './js/pages/admin/Dashboard.js';
import { TrackingPage, initTracking } from './js/pages/Tracking.js';
import { renderNewsDetail } from './js/pages/NewsDetail.js';
import './js/components/TablasCrud.js';

// Initialize scroll reveal animations
initScrollAnimations();

// Prevent browser from restoring scroll position on hash navigation
history.scrollRestoration = 'manual';

// Reset de scroll compatible con Lenis (si no, Lenis restaura la posición anterior)
function scrollToTop() {
  if (window.lenis) {
    window.lenis.scrollTo(0, { immediate: true, force: true });
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
}
window.scrollToTop = scrollToTop;

// Inicializa Lenis para un desplazamiento inercial fluido.
if (window.Lenis) {
  const lenis = new window.Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });
  window.lenis = lenis;


  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

const savedLng = localStorage.getItem('bolog_lang') || 'es';
i18next.init({
  lng: savedLng,
  resources: { es: { translation: es }, en: { translation: en } }
}).then(function () {
  updateContent();
  document.querySelectorAll('.current-lang').forEach(span => {
    span.innerText = savedLng.toUpperCase();
  });
});

window.i18next = i18next;
window.updateContent = updateContent;

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = i18next.t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', i18next.t(key));
  });
  
  if (typeof initTypewriter === 'function') {
    initTypewriter();
  }
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.lang-toggle-btn');
  if (btn) {
    const currentLng = i18next.language;
    const newLng = currentLng.startsWith('es') ? 'en' : 'es';
    i18next.changeLanguage(newLng).then(() => {
      localStorage.setItem('bolog_lang', newLng);
      document.querySelectorAll('.current-lang').forEach(span => {
        span.innerText = newLng.toUpperCase();
      });
      updateContent();
    });
  }
});


function renderPublicLayout() {
  const appHTML = `
    ${Navbar}
    <main class="relative z-0 overflow-clip w-full max-w-[100vw]">
      ${Home}
      ${CoverageMap}
      
      <!-- Sombra tipo vidrio negro para las secciones inferiores -->
      <div class="bg-[#0f0f0f]/35 backdrop-blur-sm relative z-10">
        ${Clients}
        ${QuoteSection}
        ${LocationMap}
      </div>
    </main>
    ${Footer}
  `;
  document.querySelector('#app').innerHTML = appHTML;
  initNavbar();
  initCoverageMap();
  updateContent();
  updateNavState();
  initTypewriter();
  initHeroSlider();
  initCountUp();

  initClientsMarquee();
  initQuoteForm();
  initDolarBCB();

  refreshScrollAnimations();
  if (window.lenis) {
    window.lenis.resize();
  }
}

function renderAboutPage() {
  const appHTML = `
    ${Navbar}
    <main class="relative z-0 overflow-clip w-full max-w-[100vw]">
      <div class="bg-[#0f0f0f]/45 backdrop-blur-sm relative z-10 min-h-screen pt-24">
        ${About}
      </div>
    </main>
    ${Footer}
  `;
  document.querySelector('#app').innerHTML = appHTML;
  initNavbar();
  initAbout();
  initStats();
  initCountUp();
  updateContent();
  updateNavState();
  refreshScrollAnimations();
  if (window.lenis) {
    window.lenis.resize();
  }
}

function initCountUp() {
  const elements = document.querySelectorAll('.countup-text');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetObj = entry.target;
        const targetValue = parseInt(targetObj.getAttribute('data-target'), 10);
        let count = 0;
        const duration = 2000;
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        const increment = targetValue / totalFrames;

        const updateCount = () => {
          count += increment;
          if (count < targetValue) {
            targetObj.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
          } else {
            targetObj.innerText = targetValue;
          }
        };

        requestAnimationFrame(updateCount);
        observer.unobserve(targetObj);
      }
    });
  }, { threshold: 0.5 });

  elements.forEach(el => observer.observe(el));
}


function renderLogin() {
  document.querySelector('#app').innerHTML = Login;
  initLogin();
  updateContent();
}

function renderDashboard() {
  document.querySelector('#app').innerHTML = Dashboard;
  initDashboard();
  updateContent();
}

function renderServicesPage() {
  const appHTML = `
    ${Navbar}
    <main class="relative z-0 overflow-clip w-full max-w-[100vw]">
      <div class="bg-[#0f0f0f]/45 backdrop-blur-sm relative z-10 min-h-screen pt-24">
        ${Services}
      </div>
    </main>
    ${Footer}
  `;
  document.querySelector('#app').innerHTML = appHTML;
  initNavbar();
  initServices();
  updateContent();
  updateNavState();
}

function renderTracking() {
  const appHTML = `
    ${Navbar}
    <main class="relative z-0 overflow-clip w-full max-w-[100vw]">
      <div class="bg-[#0f0f0f]/45 backdrop-blur-sm relative z-10 min-h-screen">
        ${TrackingPage}
      </div>
    </main>
    ${Footer}
  `;
  document.querySelector('#app').innerHTML = appHTML;
  initNavbar();
  initTracking();
  updateNavState();
  updateContent();
}

function updateNavState() {
  const token = localStorage.getItem('bolog_access_token');
  const desktopLogin = document.getElementById('nav-login');
  const desktopDashboard = document.getElementById('nav-dashboard');
  const mobileLogin = document.getElementById('mobile-login');
  const mobileDashboard = document.getElementById('mobile-dashboard');

  if (token) {
    if (desktopLogin) desktopLogin.classList.add('hidden');
    if (mobileLogin) mobileLogin.classList.add('hidden');
    if (desktopDashboard) desktopDashboard.classList.remove('hidden');
    if (mobileDashboard) mobileDashboard.classList.remove('hidden');
  } else {
    if (desktopLogin) desktopLogin.classList.remove('hidden');
    if (mobileLogin) mobileLogin.classList.remove('hidden');
    if (desktopDashboard) desktopDashboard.classList.add('hidden');
    if (mobileDashboard) mobileDashboard.classList.add('hidden');
  }
}

// Router Simple
function handleRoute() {
  const hash = window.location.hash || '#';

  // Mostrar u ocultar WhatsApp
  renderWhatsApp();
  const waBtn = document.getElementById('wa-btn-container');
  if (waBtn) {
    if (hash === '#login' || hash.startsWith('#dashboard')) {
      waBtn.style.display = 'none';
    } else {
      waBtn.style.display = 'flex';
    }
  }

  if (hash === '#news/all') {
    scrollToTop();
    renderNewsArchive();
    if (window.updateContent) window.updateContent();
  } else if (hash.startsWith('#news/')) {
    const slug = hash.replace('#news/', '').trim();
    if (slug) {
      scrollToTop();
      renderNewsDetail(slug);
      setTimeout(() => { if (window.updateContent) window.updateContent(); }, 100);
    } else {
      window.location.hash = '#news';
    }

  } else if (hash === '#login') {
    renderLogin();
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 10);
  } else if (hash === '#tracking') {
    renderTracking();
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 10);
  } else if (hash === '#services') {
    scrollToTop();
    renderServicesPage();
  } else if (hash === '#about') {
    scrollToTop();
    renderAboutPage();
  } else if (hash.startsWith('#dashboard')) {
    if (!document.querySelector('#dashboard-sidebar')) {
      renderDashboard();
    } else {
      initDashboard();
    }
  } else {
    // Si el elemento con ese ID ya existe en la página (ej. estamos en la landing),
    // no re-renderizamos el layout, solo aseguramos el scroll suave.
    const targetId = hash.slice(1);
    if (targetId && document.getElementById(targetId)) {
      const target = document.getElementById(targetId);
      const header = document.getElementById('header');
      if (target) {
        const headerHeight = header ? header.offsetHeight : 0;
        if (window.lenis) {
          window.lenis.scrollTo(target, {
            offset: -headerHeight,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      }
    } else {
      renderPublicLayout();

      // Después de renderizar el layout público, hacemos scroll al target deseado
      if (targetId) {
        // RAF para permitir que el DOM renderice antes de hacer scroll
        requestAnimationFrame(() => {
          setTimeout(() => {
            const target = document.getElementById(targetId);
            const header = document.getElementById('header');
            if (target) {
              const headerHeight = header ? header.offsetHeight : 0;
              if (window.lenis) {
                window.lenis.scrollTo(target, {
                  offset: -headerHeight,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
              } else {
                const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top: targetTop, behavior: 'smooth' });
              }
            }
          }, 60);
        });
      } else {
        if (window.lenis) {
          window.lenis.scrollTo(0, { duration: 0.8 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  }
}

function renderWhatsApp() {
  if (document.getElementById('wa-btn-container')) return;
  const waHtml = `
    <a id="wa-btn-container" href="https://wa.me/59173847305" target="_blank" rel="noopener noreferrer" class="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 z-[100] group flex items-center justify-center">
      <!-- Glow pulsante -->
      <div class="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-30 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
      
      <!-- Botón principal -->
      <div class="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#128C7E] to-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] group-hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] group-hover:-translate-y-1 transition-all duration-300 transform">
        <svg class="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </div>
      
      <!-- Tooltip -->
      <div class="absolute right-full mr-4 px-4 py-2 bg-white text-slate-800 text-sm font-bold rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap transform -translate-x-2 group-hover:translate-x-0 border border-slate-100 pointer-events-none">
        <span data-i18n="whatsapp.tooltip">¡Chatea con nosotros!</span>
        <div class="absolute top-1/2 -right-2 -translate-y-1/2 border-y-8 border-y-transparent border-l-8 border-l-white"></div>
      </div>
    </a>
  `;
  document.body.insertAdjacentHTML('beforeend', waHtml);
}

window.addEventListener('hashchange', handleRoute);

// Initial load
handleRoute();

// Initialize the global 3D background once
const initGlobo = () => initMundo3D();
if ('requestIdleCallback' in window) {
  requestIdleCallback(initGlobo, { timeout: 2000 });
} else {
  setTimeout(initGlobo, 1500);
}
