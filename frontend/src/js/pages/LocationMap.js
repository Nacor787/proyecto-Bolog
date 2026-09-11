// LocationMap.js — Carga dinámica desde /api/ubicaciones

export const LocationMap = `
  <section id="location" class="py-20 bg-transparent relative overflow-hidden">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="mb-14 border-b border-white/10 pb-8" data-aos="fade-up">
        <div class="flex items-center gap-2 mb-3">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
          <span class="text-xs font-extrabold tracking-[0.25em] text-sky-400 uppercase" data-i18n="location.tagline">Presencia Física &amp; Oficinas</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3" data-i18n="location.title">Nuestra Ubicación</h2>
        <p class="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed font-medium" data-i18n="location.subtitle">
          Visítanos en nuestras oficinas centrales y sucursales estratégicas para recibir asesoría personalizada en comercio exterior.
        </p>
      </div>

      <!-- Tabs de sucursales (se generan dinámicamente) -->
      <div id="location-tabs" class="flex flex-wrap gap-2 mb-8" data-aos="fade-up"></div>

      <!-- Contenido de la ubicación seleccionada -->
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch" data-aos="fade-up" data-aos-delay="100">
        
        <!-- Panel Izquierdo: Info -->
        <div class="w-full lg:w-5/12 flex flex-col justify-center">
          <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl h-full flex flex-col justify-between relative overflow-hidden group">
            <div class="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl group-hover:bg-sky-500/30 transition-colors duration-700 pointer-events-none"></div>

            <div>
              <div class="flex items-center gap-4 mb-6 relative z-10">
                <div class="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/20">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h3 id="loc-nombre" class="font-extrabold text-xl text-white tracking-tight" data-i18n="location.hq">Sede Central</h3>
                  <p id="loc-ciudad" class="text-xs text-sky-400 font-bold uppercase tracking-widest mt-0.5" data-i18n="location.city">La Paz, Bolivia</p>
                </div>
              </div>
              
              <ul class="space-y-4 text-slate-300 relative z-10">
                <li class="flex items-start gap-3">
                  <div class="mt-0.5 bg-white/10 p-1.5 rounded-lg text-sky-400 shrink-0">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  </div>
                  <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5" data-i18n="location.addressLabel">Dirección</p>
                    <p id="loc-direccion" class="text-sm leading-snug" data-i18n="location.address">Calle Capitán Ravelo Nro 267,<br>Edificio Maria Cristina, Piso 3, Of. 3B</p>
                  </div>
                </li>
                
                <li class="flex items-start gap-3">
                  <div class="mt-0.5 bg-white/10 p-1.5 rounded-lg text-sky-400 shrink-0">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5" data-i18n="location.contactLabel">Contacto</p>
                    <p id="loc-telefonos" class="text-sm font-medium text-white">2 2147305 – 2 2147384</p>
                  </div>
                </li>
                
                <li class="flex items-start gap-3">
                  <div class="mt-0.5 bg-white/10 p-1.5 rounded-lg text-sky-400 shrink-0">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5" data-i18n="location.hoursLabel">Horario</p>
                    <p id="loc-horarios" class="text-sm font-medium text-white" data-i18n="location.hours">Lunes a Viernes, 8:30 - 17:00</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="mt-6 pt-6 border-t border-white/10 relative z-10">
              <a id="loc-mapa-link" href="#" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-center gap-2.5 py-3 px-5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs rounded-xl transition-all duration-300 shadow-[0_10px_25px_rgba(2,132,199,0.3)] hover:shadow-[0_15px_35px_rgba(2,132,199,0.5)] hover:-translate-y-0.5 group">
                <svg class="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>
                <span data-i18n="location.map">Abrir en Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Panel Derecho: Mapa iframe -->
        <div class="w-full lg:w-7/12 min-h-[300px] lg:min-h-[350px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative group">
          <iframe 
            id="loc-iframe"
            class="absolute inset-0 w-full h-full filter invert-[90%] hue-rotate-[180deg] brightness-[75%] contrast-[120%] saturate-[80%] hover:brightness-[90%] hover:saturate-[100%] transition-all duration-1000"
            src="https://maps.google.com/maps?width=100%25&amp;height=450&amp;hl=es&amp;q=-16.5050963,-68.1281229&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
            frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
            style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
          </iframe>
          <div class="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none shadow-inner"></div>
        </div>
      </div>
    </div>
  </section>
`;

const lang = () => (localStorage.getItem('i18nextLng') || 'es').startsWith('en') ? 'en' : 'es';

function renderTabs(ubicaciones, activeId) {
  const tabs = document.getElementById('location-tabs');
  if (!tabs) return;
  tabs.innerHTML = ubicaciones.map(u => {
    const nombre = lang() === 'en' ? u.nombre_en : u.nombre_es;
    const isActive = u.id === activeId;
    return `
      <button 
        data-loc-id="${u.id}"
        class="loc-tab-btn text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-all duration-300 ${isActive
          ? 'bg-sky-600 text-white shadow-md'
          : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'}"
      >${nombre}</button>
    `;
  }).join('');

  tabs.querySelectorAll('.loc-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-loc-id'));
      const ub = ubicaciones.find(u => u.id === id);
      if (ub) {
        renderUbicacion(ub);
        renderTabs(ubicaciones, ub.id);
      }
    });
  });
}

function renderUbicacion(u) {
  const l = lang();
  const nombre = l === 'en' ? u.nombre_en : u.nombre_es;
  const ciudad = l === 'en' ? u.ciudad_en : u.ciudad_es;
  const direccion = l === 'en' ? u.direccion_en : u.direccion_es;
  const horarios = l === 'en' ? u.horarios_en : u.horarios_es;

  const setEl = (id, val) => { const el = document.getElementById(id); if (el && val) el.innerHTML = val; };
  
  setEl('loc-nombre', nombre);
  setEl('loc-ciudad', ciudad);
  setEl('loc-direccion', direccion);
  setEl('loc-telefonos', u.telefonos);
  setEl('loc-horarios', horarios);

  const linkEl = document.getElementById('loc-mapa-link');
  if (linkEl && u.mapa_link) linkEl.href = u.mapa_link;

  const iframe = document.getElementById('loc-iframe');
  if (iframe && u.mapa_url) iframe.src = u.mapa_url;
}

export async function initLocation() {
  try {
    const res = await fetch('/api/ubicaciones');
    if (!res.ok) throw new Error('Error cargando ubicaciones');
    const ubicaciones = await res.json();
    if (!ubicaciones.length) return;

    // Mostrar tabs solo si hay más de una ubicación
    if (ubicaciones.length > 1) {
      const tabsContainer = document.getElementById('location-tabs');
      if (tabsContainer) {
        tabsContainer.style.display = 'flex';
        renderTabs(ubicaciones, ubicaciones[0].id);
      }
    }

    // Renderizar la primera (o sede central si existe)
    const sede = ubicaciones.find(u => u.es_sede_central) || ubicaciones[0];
    renderUbicacion(sede);

    if (ubicaciones.length > 1) {
      renderTabs(ubicaciones, sede.id);
    }
  } catch (err) {
    console.warn('[LocationMap] Usando datos estáticos:', err);
    // El HTML ya tiene valores estáticos por defecto como fallback
  }
}
