// Clients.js — Carga dinámica desde /api/clientes

const renderClientCards = (clientes) => clientes.map(client => `
  <div class="w-52 sm:w-60 mx-3 sm:mx-4 h-28 sm:h-32 relative group shrink-0 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-white/20 p-4 flex items-center justify-center overflow-hidden" style="background-color: #ffffff !important; color-scheme: light;">
    <img 
      src="${client.logo_url}" 
      alt="${client.nombre}" 
      class="max-h-[85%] max-w-[85%] object-contain group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
      loading="lazy"
    />
    <div class="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-white via-white/90 to-transparent text-slate-800 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.1em] text-center opacity-0 group-hover:opacity-100 transition-all duration-300 truncate px-2">
      ${client.nombre}
    </div>
  </div>
`).join('');

export const Clients = `
  <section class="py-16 md:py-20 bg-transparent relative z-20" id="clients">

    <!-- Section Header (Unified Design) -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 border-b border-white/10 pb-8" data-aos="fade-up">
      <div class="flex items-center gap-2 mb-3">
        <span class="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
        <span class="text-xs font-extrabold tracking-[0.25em] text-sky-400 uppercase" data-i18n="clients.tagline">Confianza &amp; Respaldo Empresarial</span>
      </div>
      <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3" data-i18n="clients.title">Nuestros Clientes</h2>
      <p class="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed font-medium" data-i18n="clients.subtitle">
        Empresas líderes de diversos sectores confían en BOLOG para transportar su carga con máxima seguridad, agilidad y trazabilidad continua.
      </p>
    </div>

    <div class="overflow-hidden w-full relative" id="clients-marquee" data-aos="fade-up" data-aos-delay="150">
      <!-- Left fade -->
      <div class="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-[#0f0f0f]/60 via-[#0f0f0f]/20 to-transparent"></div>

      <!-- Marquee track — se llena dinámicamente -->
      <div class="flex w-max" id="marquee-track" style="animation: marqueeScroll 28s linear infinite;">
        <div class="flex shrink-0" id="clients-group-1">
          <!-- Cargando... -->
          <div class="w-52 h-28 mx-3 rounded-2xl bg-white/5 animate-pulse"></div>
          <div class="w-52 h-28 mx-3 rounded-2xl bg-white/5 animate-pulse"></div>
          <div class="w-52 h-28 mx-3 rounded-2xl bg-white/5 animate-pulse"></div>
        </div>
        <div class="flex shrink-0" id="clients-group-2" aria-hidden="true"></div>
      </div>

      <!-- Right fade -->
      <div class="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l from-[#0f0f0f]/60 via-[#0f0f0f]/20 to-transparent"></div>
    </div>
  </section>
`;

export async function initClientsMarquee() {
  const marquee = document.getElementById('clients-marquee');
  const track = document.getElementById('marquee-track');
  const group1 = document.getElementById('clients-group-1');
  const group2 = document.getElementById('clients-group-2');

  if (!marquee || !track || !group1 || !group2) return;

  // Pausar en hover
  marquee.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
  marquee.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });

  // Cargar desde la API
  try {
    const res = await fetch('/api/clientes');
    if (!res.ok) throw new Error('Error al cargar clientes');
    const clientes = await res.json();

    if (!clientes.length) return;

    const cardsHtml = renderClientCards(clientes);
    group1.innerHTML = cardsHtml;
    group2.innerHTML = cardsHtml;
  } catch (err) {
    console.warn('[Clients] No se pudieron cargar los clientes desde la API:', err);
    // Mantener el skeleton visible como fallback
  }
}
