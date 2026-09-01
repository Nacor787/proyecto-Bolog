import Typewriter from 'typewriter-effect/dist/core';
const logoSrc = 'https://res.cloudinary.com/oyusqpnf/image/upload/v1787506176/logo-bolog.png';
import { DolarBCB } from '../components/DolarBCB.js';

export const Home = `
  <section id="home" class="relative min-h-[100svh] sm:min-h-screen flex flex-col justify-center bg-transparent overflow-hidden">
    
    <!-- Hero Background Image Slider (Opaque to hide the globe) -->
    <div id="hero-slider" class="absolute inset-0 z-0">
      <!-- Marítimo -->
      <div class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-100" style="background-image: url('https://res.cloudinary.com/oyusqpnf/image/upload/v1787871325/john-simmons-XFLk8qZ-6MA-unsplash.jpg')"></div>
      <!-- Aéreo -->
      <div class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0" style="background-image: url('https://res.cloudinary.com/oyusqpnf/image/upload/w_1200,q_auto,f_auto/v1787846813/rocker-sta-RSYBi_1fhfM-unsplash.jpg')"></div>
      <!-- Terrestre -->
      <div class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0" style="background-image: url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200')"></div>
    </div>

    <!-- Capa oscura global sobre las imágenes -->
    <div class="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>
    <!-- ── Hero Content ── -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-20 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 flex flex-col lg:flex-row lg:items-stretch lg:gap-6">

        <!-- ── Columna Izquierda: contenido corporativo ── -->
        <div class="flex-1 lg:max-w-[520px] flex flex-col items-start text-left gap-4 sm:gap-5 min-w-0">

          <!-- Logo con mayor presencia -->
          <div class="relative flex items-center group cursor-default" data-aos="fade-down" data-aos-delay="100">
            <div class="absolute -inset-3 bg-sky-500/8 rounded-full blur-2xl pointer-events-none group-hover:bg-sky-500/15 transition-all duration-700"></div>
            <img src="${logoSrc}" alt="BOLOG Logo" class="relative z-10 h-14 sm:h-18 md:h-20 w-auto object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.03]" />
          </div>

          <!-- Titular + Typewriter -->
          <h1 class="text-2xl sm:text-3xl lg:text-[2.4rem] tracking-tight font-extrabold text-white leading-tight flex flex-col" data-aos="fade-right" data-aos-delay="200">
            <span class="block text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]" data-i18n="hero.title1">Conectando Bolivia</span>
            <span id="typewriter-title" class="block text-sky-400 [text-shadow:_0_0_15px_#003b5c,_0_0_30px_#00243a,_0_0_45px_#001a2c] mt-1.5 pb-1 min-h-[1.3em]"></span>
          </h1>

          <!-- Párrafo descriptivo -->
          <p class="text-sm sm:text-[0.95rem] text-white/80 max-w-[420px] font-medium leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]" data-aos="fade-right" data-aos-delay="300" data-i18n="hero.subtitle">
            Integrando Continentes, Países y uniendo fronteras por aire, tierra y mar.
          </p>

          <!-- CTAs -->
          <div class="flex flex-row flex-wrap gap-2.5 sm:gap-3 w-full mt-2" data-aos="fade-up" data-aos-delay="400">
            <!-- Botón primario: ancho y protagonista -->
            <a href="#contact" class="group relative inline-flex items-center justify-center flex-auto sm:flex-initial w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 transition-all duration-300 rounded-lg shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 tracking-wide overflow-hidden whitespace-nowrap">
              <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
              <svg class="relative w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              <span class="relative" data-i18n="hero.quote">Solicitar Cotización</span>
            </a>
            <!-- Botón secundario: outline sutil -->
            <a href="#tracking" class="inline-flex items-center justify-center flex-auto sm:flex-initial w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white/90 bg-white/8 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/35 transition-all duration-300 rounded-lg tracking-wide hover:-translate-y-0.5 whitespace-nowrap" data-i18n="hero.tracking">
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 shrink-0 text-sky-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
              Seguimiento BLG
            </a>
          </div>

          <!-- Estadísticas -->
          <div class="flex items-stretch gap-4 sm:gap-6 mt-6 sm:mt-8 w-full max-w-lg border-t border-white/12 pt-4 sm:pt-5" data-aos="fade-up" data-aos-delay="500">
            <!-- Stat 1: Clientes -->
            <div class="flex items-center gap-2 sm:gap-3 group flex-1">
              <div class="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-white/8 border border-white/15 flex items-center justify-center text-sky-400 shrink-0 backdrop-blur-sm group-hover:bg-sky-500/20 group-hover:border-sky-400/40 transition-all duration-300">
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div class="flex flex-col">
                <div class="flex items-baseline gap-0.5">
                  <span class="countup-text text-base sm:text-xl md:text-2xl font-black text-white tracking-tight" data-target="150">0</span>
                  <span class="text-sky-400 font-black text-xs sm:text-sm">+</span>
                </div>
                <div class="text-[8px] sm:text-[9px] font-bold text-sky-300/80 uppercase tracking-widest" data-i18n="stats.clients">Clientes</div>
              </div>
            </div>
            <div class="w-px bg-white/10 self-stretch"></div>
            <!-- Stat 2: Agentes -->
            <div class="flex items-center gap-2 sm:gap-3 group flex-1">
              <div class="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-white/8 border border-white/15 flex items-center justify-center text-sky-400 shrink-0 backdrop-blur-sm group-hover:bg-sky-500/20 group-hover:border-sky-400/40 transition-all duration-300">
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div class="flex flex-col">
                <div class="flex items-baseline gap-0.5">
                  <span class="countup-text text-base sm:text-xl md:text-2xl font-black text-white tracking-tight" data-target="5000">0</span>
                  <span class="text-sky-400 font-black text-xs sm:text-sm">+</span>
                </div>
                <div class="text-[8px] sm:text-[9px] font-bold text-sky-300/80 uppercase tracking-widest" data-i18n="stats.partners">Agentes</div>
              </div>
            </div>
            <div class="w-px bg-white/10 self-stretch"></div>
            <!-- Stat 3: Operaciones -->
            <div class="flex items-center gap-2 sm:gap-3 group flex-1">
              <div class="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-white/8 border border-white/15 flex items-center justify-center text-sky-400 shrink-0 backdrop-blur-sm group-hover:bg-sky-500/20 group-hover:border-sky-400/40 transition-all duration-300">
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div class="flex flex-col">
                <div class="flex items-baseline gap-0.5">
                  <span class="countup-text text-base sm:text-xl md:text-2xl font-black text-white tracking-tight" data-target="1206">0</span>
                  <span class="text-sky-400 font-black text-xs sm:text-sm">+</span>
                </div>
                <div class="text-[8px] sm:text-[9px] font-bold text-sky-300/80 uppercase tracking-widest" data-i18n="stats.operations">Operaciones</div>
              </div>
            </div>
          </div>

        </div>

        <!-- ── Tipo de Cambio flotante (en flujo para móvil, absoluto para desktop) ── -->
        <div class="self-start sm:absolute mt-8 sm:mt-0 sm:bottom-14 sm:right-8 lg:bottom-[15%] lg:right-16 z-20 w-full flex justify-center sm:w-auto sm:block" data-aos="fade-up" data-aos-delay="600">
          ${DolarBCB}
        </div>

    </div>

  </section>
`;


export function initTypewriter() {
  const twElement = document.getElementById('typewriter-title');
  if (!twElement) return;

  const getTranslatedString = (key, defaultText) => {
    return window.i18next && window.i18next.t ? window.i18next.t(key) : defaultText;
  };

  const str1 = getTranslatedString('hero.type1', 'Transporte Terrestre');
  const str2 = getTranslatedString('hero.type2', 'Aduanas y Seguros');
  const str3 = getTranslatedString('hero.type3', 'Almacenamiento');
  const str4 = getTranslatedString('hero.type4', 'Carga Aérea y Marítima');

  if (window.currentTypewriter) {
    window.currentTypewriter.stop();
  }

  twElement.innerHTML = '';

  window.currentTypewriter = new Typewriter(twElement, {
    strings: [str1, str2, str3, str4],
    autoStart: true,
    loop: true,
    delay: 50,
    deleteSpeed: 30,
    pauseFor: 2000,
    cursor: '<span class="text-sky-400 [text-shadow:_0_0_15px_#003b5c]">|</span>'
  });
}

export function initHeroSlider() {
  const slides = document.querySelectorAll('#hero-slider > div');
  if (!slides.length) return;

  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('opacity-100');
    slides[current].classList.add('opacity-0');

    current = (current + 1) % slides.length;

    slides[current].classList.remove('opacity-0');
    slides[current].classList.add('opacity-100');
  }, 5000);
}

