// Remove cloudinary import

export const servicesData = [
  {
    id: 'air',
    num: '01',
    category: 'Alta Prioridad · Express',
    title: 'Carga Aérea',
    titleI18n: 'services.air',
    shortDesc: 'Velocidad, prioridad y precisión para cargas críticas. Carga General, Consolidada y Especial.',
    descI18n: 'services.airDesc',
    img: 'https://res.cloudinary.com/oyusqpnf/image/upload/w_800,q_auto,f_auto/v1787846813/rocker-sta-RSYBi_1fhfM-unsplash.jpg',
    fullDesc: 'Servicio de flete aéreo internacional express y consolidado con conexiones prioritarias en los hubs aeroportuarios más importantes de América, Asia y Europa. Tiempos de tránsito mínimos, despacho en rampa y trazabilidad satelital en tiempo real.',
    features: [
      'Carga General, Perecedera, Peligrosa (DGR) y Valiosa',
      'Consolidados aéreos semanales directos',
      'Charters dedicados y servicio On-Board Courier',
      'Despacho aduanero express en aeropuerto'
    ],
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>`
  },
  {
    id: 'sea',
    num: '02',
    category: 'Alto Volumen · Multimodal',
    title: 'Carga Marítima',
    titleI18n: 'services.sea',
    shortDesc: 'Capacidad masiva y alcance global a los mejores costos. Contenedores completos (FCL) y carga consolidada (LCL).',
    descI18n: 'services.seaDesc',
    img: 'https://res.cloudinary.com/oyusqpnf/image/upload/v1787871325/john-simmons-XFLk8qZ-6MA-unsplash.jpg',
    fullDesc: 'Soluciones navieras integrales para grandes volúmenes y cargas pesadas. Conectamos los puertos marítimos del Pacífico y Atlántico (Arica, Iquique, Callao, Santos) directamente con las principales aduanas de Bolivia mediante convenios directos con navieras líderes.',
    features: [
      'Contenedores completos (FCL 20\', 40\' Dry, High Cube, Reefer, Open Top)',
      'Carga consolidada fraccionada (LCL) semanal',
      'Carga proyecto, sobredimensionada y extra pesada (Breakbulk)',
      'Tarifas competitivas con días libres de sobrestadía extendidos'
    ],
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>`
  },
  {
    id: 'land',
    num: '03',
    category: 'Conexión Continental Directa',
    title: 'Transporte Terrestre',
    titleI18n: 'services.land',
    shortDesc: 'Conexión continental directa. Flotas dedicadas y compartidas para tránsito nacional e internacional.',
    descI18n: 'services.landDesc',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=75&w=800',
    fullDesc: 'Transporte carretero nacional e internacional con monitoreo GPS 24/7 y precintos de seguridad. Rutas consolidadas y dedicadas entre Bolivia, Chile, Perú, Brasil, Argentina y Paraguay con seguro integral de tránsito.',
    features: [
      'Flota moderna: Furgones, plataformas, sider y camiones refrigerados',
      'Monitoreo satelital GPS en tiempo real con alertas de parada',
      'Permisos binacionales y convenios fronterizos vigentes',
      'Carga completa (FTL) y consolidado terrestre (LTL)'
    ],
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>`
  },
  {
    id: 'multimodal',
    num: '04',
    category: 'Integración Logística',
    title: 'Transporte Multimodal',
    titleI18n: 'services.multimodal',
    shortDesc: 'Soluciones puerta a puerta combinando eficientemente transporte marítimo, aéreo y terrestre.',
    descI18n: 'services.multimodalDesc',
    img: 'https://res.cloudinary.com/oyusqpnf/image/upload/v1788222465/multimodal.png',
    fullDesc: 'Optimizamos tiempo y costos combinando diferentes medios de transporte bajo un único contrato. Nuestro servicio multimodal asegura fluidez en los transbordos, minimizando los riesgos y simplificando la gestión documental para entregas puerta a puerta.',
    features: [
      'Combinación de rutas marítimas, aéreas y terrestres',
      'Emisión de un único documento de transporte (FBL)',
      'Reducción de tiempos muertos en transbordos',
      'Trazabilidad continua en toda la cadena logística'
    ],
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>`
  },
  {
    id: 'customs',
    num: '05',
    category: 'Seguridad Normativa & Agilidad',
    title: 'Agenciamiento Aduanero',
    titleI18n: 'services.customs',
    shortDesc: 'Despachos rápidos y seguros. Asesoría integral en normativas y trámites de importación/exportación.',
    descI18n: 'services.customsDesc',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=75&w=800',
    fullDesc: 'Gestión y desaduanamiento ágil en todas las aduanas interiores, de frontera y aeropuertos de Bolivia. Clasificación arancelaria experta, tramitación previa y cumplimiento normativo estricto para evitar sobrecostos y demoras.',
    features: [
      'Despachos generales, anticipados e inmediatos',
      'Clasificación arancelaria y liquidación de tributos',
      'Gestión de autorizaciones previas (SENASAG, AGEMED, IBMETRO)',
      'Asesoría técnica y legal aduanera continua'
    ],
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`
  },
  {
    id: 'insurance',
    num: '06',
    category: 'Protección Integral Door-to-Door',
    title: 'Seguro Internacional',
    titleI18n: 'services.insurance',
    shortDesc: 'Protección integral para tu inversión en cada milla. Cobertura Door-to-Door contra todo riesgo.',
    descI18n: 'services.insuranceDesc',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=75&w=800',
    fullDesc: 'Pólizas internacionales de transporte con cobertura total puerta a puerta (All Risks bajo Institute Cargo Clauses A). Respaldamos financieramente tus mercancías ante contingencias, avería gruesa, robos o siniestros marítimos, terrestres y aéreos.',
    features: [
      'Cobertura Door-to-Door desde bodega de origen hasta destino final',
      'Pólizas Todo Riesgo (Institute Cargo Clauses A)',
      'Emisión inmediata y digital de certificados de cobertura',
      'Atención rápida y resolución expedita de liquidaciones'
    ],
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`
  }
];

export const Services = `
  <section id="services" class="relative bg-transparent py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <!-- Ambient lighting remolida para optimizar el rendimiento del scroll -->

    <div class="max-w-5xl mx-auto relative z-10">
      
      <!-- Section Header -->
      <div class="services-header mb-14 border-b border-white/10 pb-8" data-aos="fade-up">
        <div class="flex items-center gap-2 mb-3">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
          <span class="text-xs font-extrabold tracking-[0.25em] text-sky-400 uppercase">Soluciones Logísticas Integrales</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3" data-i18n="services.title">Nuestros Servicios</h2>
        <p class="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed font-medium">
          Conoce nuestras capacidades operativas.
        </p>
      </div>

      <!-- Services List -->
      <div class="flex flex-col gap-6 lg:gap-8 max-w-6xl mx-auto">
        ${servicesData.map((s, index) => {
  return `
          <div 
            class="service-card group relative bg-white/5 backdrop-blur-md border border-white/10 hover:border-sky-400 rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)] transition-all duration-500 flex flex-col md:flex-row-reverse items-stretch will-change-transform"
            data-service-index="${index}"
            data-aos="fade-up"
            data-aos-delay="${index * 50}"
          >
            <!-- Card Image Slot (FLIP Target) -->
            <div class="service-media-slot relative h-60 md:h-auto md:w-5/12 overflow-hidden bg-slate-950 flex-shrink-0">
              <img 
                src="${s.img}" 
                alt="${s.title}" 
                class="service-card-img absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
                decoding="async"
                loading="${index < 2 ? 'eager' : 'lazy'}"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-slate-950/20 to-transparent"></div>
              
              <!-- Badge Number & Category -->
              <div class="absolute top-4 left-4 flex items-center gap-2">
                <span class="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-[11px] font-black tracking-widest text-sky-400 rounded-full shadow-sm">
                  ${s.num}
                </span>
                <span class="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white rounded-full shadow-sm">
                  ${s.category}
                </span>
              </div>

              <!-- Click expand cue badge -->
              <div class="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500 text-white text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span>Ampliar</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-6 md:p-8 flex flex-col flex-grow justify-between bg-transparent md:w-7/12">
              <div>
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 flex-shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                    ${s.icon}
                  </div>
                  <h3 class="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors duration-300" data-i18n="${s.titleI18n}">${s.title}</h3>
                </div>
                <p class="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3 font-normal" data-i18n="${s.descI18n}">
                  ${s.shortDesc}
                </p>
              </div>

              <!-- Bottom Link CTA -->
              <div class="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-sky-300">
                <span>Ver ficha técnica</span>
                <span class="w-7 h-7 rounded-full bg-white/10 group-hover:bg-sky-500 group-hover:text-white flex items-center justify-center transition-all duration-300 text-sky-400">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </span>
              </div>
            </div>
          </div>
        `;
}).join('')}
      </div>

    </div>

    <!-- ── LIGHTBOX MODAL CONTAINER ── -->
    <div id="services-lightbox-overlay" class="fixed inset-0 z-[99999] hidden items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 pointer-events-none opacity-0 transition-opacity duration-200 ease-out overflow-y-auto" aria-modal="true" role="dialog">
      <!-- Backdrop -->
      <div id="services-lightbox-backdrop" class="absolute inset-0 bg-slate-900/50 backdrop-blur-md transition-opacity"></div>
      
      <!-- Modal Box (Glassmorphism) -->
      <div id="services-lightbox-modal" class="relative z-10 w-full max-w-4xl max-h-[88vh] lg:h-[490px] bg-slate-900/40 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row pointer-events-auto m-auto transform transition-transform duration-200 ease-out scale-95">
        
        <!-- Close Button (Top right) -->
        <button id="services-lightbox-close" class="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-xl shadow-xl group focus:outline-none" aria-label="Cerrar modal">
          <svg class="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <!-- Left / Media Slot (Dedicated image with smooth hardware acceleration) -->
        <div id="services-modal-media-slot" class="relative w-full lg:w-5/12 h-48 sm:h-52 lg:h-full min-h-[180px] overflow-hidden bg-slate-950/50 flex-shrink-0">
          <img id="modal-service-img" src="" alt="" class="w-full h-full object-cover object-center transition-transform duration-300" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        </div>

        <!-- Right / Content Details -->
        <div id="services-modal-details" class="w-full lg:w-7/12 flex-1 min-h-0 h-full p-5 sm:p-6 lg:p-7 flex flex-col justify-between overflow-y-auto bg-transparent custom-scrollbar">
          <div>
            <!-- Header Badges -->
            <div class="flex flex-wrap items-center gap-2 mb-2.5">
              <span id="modal-service-num" class="px-3 py-1 bg-white/10 border border-white/20 text-sky-400 font-extrabold text-xs tracking-widest rounded-full shadow-sm">01</span>
              <span id="modal-service-category" class="px-3 py-1 bg-white/5 border border-white/10 text-slate-200 font-bold text-xs rounded-full shadow-sm">Categoría</span>
            </div>

            <!-- Title -->
            <h3 id="modal-service-title" class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2.5 drop-shadow-sm">Carga Aérea</h3>
            <div class="w-12 h-1 bg-sky-400 rounded-full mb-3 sm:mb-4 shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>

            <!-- Full Description -->
            <p id="modal-service-desc" class="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed mb-4 font-medium text-justify drop-shadow-sm">
              Descripción completa del servicio.
            </p>

            <!-- Key Features List -->
            <div class="mb-4">
              <h4 class="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-sky-400 mb-2 drop-shadow-sm">Ventajas y Capacidades</h4>
              <ul id="modal-service-features" class="space-y-1.5">
                <!-- Injected features -->
              </ul>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-auto">
            <a id="modal-quote-btn" href="#contact" class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 bg-gradient-to-r from-sky-400 to-sky-300 hover:from-sky-300 hover:to-white rounded-xl shadow-[0_4px_20px_rgba(56,189,248,0.4)] transition-all duration-300 hover:-translate-y-0.5">
              <span>Solicitar Cotización</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
            <button id="modal-dismiss-btn" class="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors shadow-sm">
              Cerrar
            </button>
          </div>

        </div>

      </div>
    </div>
  </section>
`;

export function initServices() {
  const cards = document.querySelectorAll('.service-card');
  const overlay = document.getElementById('services-lightbox-overlay');
  const modal = document.getElementById('services-lightbox-modal');
  const closeBtn = document.getElementById('services-lightbox-close');
  const dismissBtn = document.getElementById('modal-dismiss-btn');
  const quoteBtn = document.getElementById('modal-quote-btn');
  const modalImg = document.getElementById('modal-service-img');

  const modalNum = document.getElementById('modal-service-num');
  const modalCategory = document.getElementById('modal-service-category');
  const modalTitle = document.getElementById('modal-service-title');
  const modalDesc = document.getElementById('modal-service-desc');
  const modalFeatures = document.getElementById('modal-service-features');

  if (!cards.length || !overlay || !modal) return;

  // Ensure modal overlay is attached directly to body so no parent stacking context can place navbar over it
  if (overlay.parentElement !== document.body) {
    document.body.appendChild(overlay);
  }

  let isOpen = false;

  const openServiceModal = (cardIndex) => {
    if (isOpen) return;
    const data = servicesData[cardIndex];
    if (!data) return;

    isOpen = true;

    // 1. Populate text details and image
    modalNum.textContent = data.num;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.fullDesc;
    if (modalImg) {
      modalImg.src = data.img;
      modalImg.alt = data.title;
    }
    modalFeatures.innerHTML = data.features.map(f => `
      <li class="flex items-start gap-2 text-slate-300 text-xs sm:text-[13px] text-justify">
        <span class="w-3.5 h-3.5 rounded-full bg-sky-400/20 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg class="w-2 h-2" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        </span>
        <span>${f}</span>
      </li>
    `).join('');

    // 2. Show overlay with fast GPU accelerated scale/fade
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Bloquear scroll

    requestAnimationFrame(() => {
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-100', 'pointer-events-auto');
      modal.classList.remove('scale-95');
      modal.classList.add('scale-100');
    });
  };

  const closeServiceModal = () => {
    if (!isOpen) return;
    isOpen = false;

    overlay.classList.remove('opacity-100', 'pointer-events-auto');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('scale-100');
    modal.classList.add('scale-95');

    setTimeout(() => {
      overlay.classList.add('hidden');
      overlay.classList.remove('flex');
      document.body.style.overflow = ''; // Desbloquear scroll
    }, 200);
  };

  // Attach card click handlers
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const index = parseInt(card.getAttribute('data-service-index'), 10);
      openServiceModal(index, card);
    });
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeServiceModal(); });
  if (dismissBtn) dismissBtn.addEventListener('click', (e) => { e.stopPropagation(); closeServiceModal(); });

  // Close on quote button click (navigate to quote section)
  if (quoteBtn) {
    quoteBtn.addEventListener('click', () => {
      closeServiceModal();
    });
  }

  // Click outside modal to close
  overlay.addEventListener('click', (e) => {
    if (!modal.contains(e.target)) {
      closeServiceModal();
    }
  });

  // Escape key handler
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeServiceModal();
    }
  });
}

// Backward compatibility alias for main.js
export const initServicesScroll = initServices;
