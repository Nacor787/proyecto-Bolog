import { CLOUDINARY_CLIENTS } from '../utils/cloudinary.js';

const renderClientCards = () => CLOUDINARY_CLIENTS.map(client => `
  <div class="w-52 sm:w-60 mx-3 sm:mx-4 h-28 sm:h-32 relative group shrink-0 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-white/20 bg-white/90 backdrop-blur-md p-4 flex items-center justify-center overflow-hidden">
    <img 
      src="${client.logo}" 
      alt="${client.name}" 
      class="max-h-[85%] max-w-[85%] object-contain group-hover:-translate-y-2 transition-transform duration-300"
      loading="lazy"
    />
    <div class="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-white via-white/90 to-transparent text-slate-800 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.1em] text-center opacity-0 group-hover:opacity-100 transition-all duration-300 truncate px-2">
      ${client.name}
    </div>
  </div>
`).join('');

export const Clients = `
  <section class="py-16 md:py-20 bg-transparent relative z-20" id="clients">

    <!-- Section Header (Unified Design) -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 border-b border-white/10 pb-8" data-aos="fade-up">
      <div class="flex items-center gap-2 mb-3">
        <span class="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
        <span class="text-xs font-extrabold tracking-[0.25em] text-sky-400 uppercase" data-i18n="clients.tagline">Confianza & Respaldo Empresarial</span>
      </div>
      <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3" data-i18n="clients.title">Nuestros Clientes</h2>
      <p class="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed font-medium" data-i18n="clients.subtitle">
        Empresas líderes de diversos sectores confían en BOLOG para transportar su carga con máxima seguridad, agilidad y trazabilidad continua.
      </p>
    </div>

    <div class="overflow-hidden w-full relative" id="clients-marquee" data-aos="fade-up" data-aos-delay="150">
      <!-- Left fade (soft dark) -->
      <div class="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-[#0f0f0f]/60 via-[#0f0f0f]/20 to-transparent"></div>

      <!-- Track: two sibling groups side by side for seamless -50% loop -->
      <div class="flex w-max" id="marquee-track" style="animation: marqueeScroll 28s linear infinite;">
        <!-- Group 1 -->
        <div class="flex shrink-0">
          ${renderClientCards()}
        </div>
        <!-- Group 2 (seamless clone) -->
        <div class="flex shrink-0" aria-hidden="true">
          ${renderClientCards()}
        </div>
      </div>

      <!-- Right fade (soft dark) -->
      <div class="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l from-[#0f0f0f]/60 via-[#0f0f0f]/20 to-transparent"></div>
    </div>
  </section>
`;

export function initClientsMarquee() {
  const marquee = document.getElementById('clients-marquee');
  const track = document.getElementById('marquee-track');
  if (!marquee || !track) return;

  marquee.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  marquee.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}
