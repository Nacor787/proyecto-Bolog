// About.js — Carga dinámica desde /api/nosotros
import { Stats } from './Stats.js';

export const About = `
  <section id="about" class="relative bg-transparent py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <!-- Ambient lighting -->
    <div class="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none"></div>

    <div class="max-w-5xl mx-auto relative z-10">
      
      <!-- Section Header -->
      <div id="about-header" class="mb-14 border-b border-white/10 pb-8" data-aos="fade-up">
        <div class="flex items-center gap-2 mb-3">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
          <span class="text-xs font-extrabold tracking-[0.25em] text-sky-400 uppercase">Trayectoria &amp; Solidez</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3" data-i18n="about.title">Nosotros</h2>
        <p id="about-tagline" class="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed font-medium" data-i18n="about.tagline">
          Más de 20 años de experiencia brindando soluciones logísticas en transporte aéreo, marítimo y terrestre a nivel mundial.
        </p>
      </div>

      <!-- History Text and Corporate Video Grid -->
      <div class="mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-8">
          
          <!-- Left Text: Historia -->
          <div class="about-history space-y-4 text-slate-300 text-sm md:text-base leading-relaxed text-justify flex flex-col justify-center" data-aos="fade-right" data-aos-delay="50">
            <p class="text-sky-400 font-bold text-lg mb-4 italic" data-i18n="about.histQuote">"Más de dos décadas conectando a Bolivia y el mundo con cada carga, cada ruta y cada solución."</p>
            <div id="about-historia" class="space-y-4">
              <!-- Se inyecta dinámicamente -->
              <p data-i18n="about.hist1">Hace más de 20 años, BOLOG LOGISTICS GROUP SRL nació con una convicción clara: la logística no se trata solo de mover contenedores o paquetes, sino de mover economías, proteger proyectos de vida y construir puentes entre fronteras.</p>
              <p data-i18n="about.hist2">Con los años, adaptamos nuestro paso al ritmo acelerado del comercio mundial. Nos expandimos en todas las modalidades —aérea, marítima y terrestre— para garantizar que ninguna distancia fuera infranqueable.</p>
            </div>
          </div>

          <!-- Corporate Video -->
          <div id="about-video-container" class="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] group h-full min-h-[300px]" data-aos="fade-left" data-aos-delay="100">
            <div class="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-sky-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative w-full h-[300px] md:h-[400px] lg:h-full min-h-[300px] bg-slate-900 rounded-3xl overflow-hidden">
              <video 
                id="about-video"
                class="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" 
                autoplay muted loop playsinline
                src="https://res.cloudinary.com/oyusqpnf/video/upload/VIDEO.mp4"
              >
                Tu navegador no soporta videos HTML5.
              </video>
              <div class="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/10 to-transparent pointer-events-none opacity-90"></div>
              <div class="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-400/30 flex items-center justify-center animate-pulse">
                    <svg class="w-5 h-5 text-sky-400 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <div>
                    <p class="text-white font-bold text-sm md:text-base tracking-wide" data-i18n="about.videoTitle">Conoce BOLOG</p>
                    <p class="text-sky-400 text-xs font-semibold tracking-widest uppercase">Video Institucional</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Full Width Text: Historia bottom -->
        <div class="about-history-bottom space-y-4 text-slate-300 text-sm md:text-base leading-relaxed text-justify" data-aos="fade-up" data-aos-delay="150">
          <div id="about-historia-bottom">
            <p data-i18n="about.hist3">Lo que verdaderamente nos diferencia no es solo la capacidad técnica, sino la pasión por resolver. En la logística, los imprevistos existen; pero en BOLOG, las excusas no.</p>
          </div>
          
          <div class="mt-12 text-center">
            <p class="font-extrabold text-xl md:text-2xl text-white mb-8 whitespace-pre-line">Hoy, con más de 20 años de trayectoria, no somos simplemente tu agente de carga:<br/><strong id="about-hist4" class="text-sky-400" data-i18n="about.hist4">Somos el motor que impulsa tu logística global.</strong></p>
            ${Stats}
          </div>
        </div>
      </div>

      <!-- Card Políticas -->
      <div id="about-policies" class="mb-8" data-aos="fade-up">
        <div class="about-card group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 hover:border-sky-400 shadow-[0_10px_35px_rgba(0,0,0,0.05)] transition-all duration-500 overflow-hidden cursor-pointer">
          <div class="absolute -top-12 -left-12 w-40 h-40 bg-sky-400/5 rounded-full blur-3xl group-hover:bg-sky-400/15 transition-colors duration-700"></div>
          <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <div class="flex-shrink-0 md:w-1/3">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 2v20"/></svg>
                </div>
                <div>
                  <span class="text-xs font-bold text-sky-400 tracking-wider uppercase block mb-1">Estructura</span>
                  <h3 class="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-sky-400 transition-colors" data-i18n="about.policiesTitle">Políticas</h3>
                </div>
              </div>
            </div>
            <div class="md:w-2/3 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
              <p id="about-politicas" class="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6 text-justify" data-i18n="about.policiesDesc">
                Nuestras políticas se fundamentan en el cumplimiento estricto de las normativas internacionales de comercio exterior, priorizando la seguridad, la confidencialidad y la mejora continua en cada etapa de la cadena de suministro.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Misión, Visión y Valores -->
      <div id="about-cards-container" class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        <!-- Card 1: Misión -->
        <div class="about-card group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-9 border border-white/10 hover:border-sky-400 shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(6,182,212,0.15)] transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer" data-aos="fade-up" data-aos-delay="100">
          <div class="absolute -top-12 -right-12 w-28 h-28 bg-sky-400/10 rounded-full blur-2xl group-hover:bg-sky-400/25 transition-colors duration-500"></div>
          <div>
            <div class="flex items-center justify-between mb-6">
              <span class="px-3.5 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-black tracking-widest uppercase">01 / Propósito</span>
              <span class="text-xs font-bold text-sky-400 tracking-wider">Excelencia</span>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm mb-6">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-sky-400 transition-colors" data-i18n="about.mission">Misión</h3>
            <p id="about-mision" class="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6 text-justify" data-i18n="about.missionDesc">
              Conectar a Bolivia y el mundo mediante servicios de transporte multimodal de excelencia, brindando respaldo absoluto, agilidad operativa y soluciones logísticas reales.
            </p>
          </div>
          <div id="about-mision-bullets" class="pt-5 border-t border-white/10 space-y-2 text-xs font-semibold text-slate-300">
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span><span>Cobertura puerta a puerta personalizada</span></div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span><span>Trazabilidad y respaldo normativo</span></div>
          </div>
        </div>

        <!-- Card 2: Visión -->
        <div class="about-card group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-9 border border-white/10 hover:border-sky-400 shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(6,182,212,0.15)] transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer" data-aos="fade-up" data-aos-delay="200">
          <div class="absolute -top-12 -right-12 w-28 h-28 bg-sky-400/10 rounded-full blur-2xl group-hover:bg-sky-400/25 transition-colors duration-500"></div>
          <div>
            <div class="flex items-center justify-between mb-6">
              <span class="px-3.5 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-black tracking-widest uppercase">02 / Horizonte</span>
              <span class="text-xs font-bold text-sky-400 tracking-wider">Liderazgo</span>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm mb-6">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </div>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-sky-400 transition-colors" data-i18n="about.vision">Visión</h3>
            <p id="about-vision" class="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6 text-justify" data-i18n="about.visionDesc">
              Ser el referente líder e innovador en la cadena de suministros de la región, integrando tecnología de vanguardia y alianzas internacionales.
            </p>
          </div>
          <div id="about-vision-bullets" class="pt-5 border-t border-white/10 space-y-2 text-xs font-semibold text-slate-300">
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span><span>Innovación tecnológica continua</span></div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span><span>Expansión de alianzas estratégicas</span></div>
          </div>
        </div>

        <!-- Card 3: Valores -->
        <div class="about-card group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-9 border border-white/10 hover:border-sky-400 shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(6,182,212,0.15)] transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer" data-aos="fade-up" data-aos-delay="300">
          <div class="absolute -top-12 -right-12 w-28 h-28 bg-sky-400/10 rounded-full blur-2xl group-hover:bg-sky-400/25 transition-colors duration-500"></div>
          <div>
            <div class="flex items-center justify-between mb-6">
              <span class="px-3.5 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-black tracking-widest uppercase">03 / Pilares</span>
              <span class="text-xs font-bold text-sky-400 tracking-wider">Integridad</span>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm mb-6">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-sky-400 transition-colors" data-i18n="about.values">Valores</h3>
            <p id="about-valores" class="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6 text-justify" data-i18n="about.valuesDesc">
              Puntualidad, transparencia absoluta y compromiso en cada milla. Respondemos con velocidad, flexibilidad y enfoque práctico.
            </p>
          </div>
          <div id="about-valores-bullets" class="pt-5 border-t border-white/10 space-y-2 text-xs font-semibold text-slate-300">
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span><span>Transparencia y honestidad comercial</span></div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span><span>Seguridad y compromiso sin excepciones</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

const lang = () => (localStorage.getItem('i18nextLng') || 'es').startsWith('en') ? 'en' : 'es';

export async function initAbout() {
  try {
    const res = await fetch('/api/nosotros');
    if (!res.ok) throw new Error('Error cargando nosotros');
    const data = await res.json();
    const l = lang();

    const setEl = (id, val) => { const el = document.getElementById(id); if (el && val) el.innerHTML = val; };

    // Historia (dividimos en dos partes: primeras 2 líneas en el grid, resto abajo)
    const historia = l === 'en' ? data.historia_en : data.historia_es;
    if (historia) {
      // Separar párrafos por salto de línea o \n\n
      const parrafos = historia.split(/\n\n+/).filter(p => p.trim());
      const mitad = Math.ceil(parrafos.length / 2);
      const top = parrafos.slice(0, mitad).map(p => `<p>${p.trim()}</p>`).join('');
      const bottom = parrafos.slice(mitad).map(p => `<p>${p.trim()}</p>`).join('');
      setEl('about-historia', top || historia);
      if (bottom) setEl('about-historia-bottom', bottom);
    }

    // Video
    if (data.video_url) {
      const videoEl = document.getElementById('about-video');
      if (videoEl) videoEl.src = data.video_url;
    }

    // Misión, Visión, Valores, Políticas, Tagline, Trayectoria
    setEl('about-mision', l === 'en' ? data.mision_en : data.mision_es);
    setEl('about-vision', l === 'en' ? data.vision_en : data.vision_es);
    setEl('about-valores', l === 'en' ? data.valores_en : data.valores_es);
    
    const renderBullets = (id, text) => {
      const el = document.getElementById(id);
      if (el && text) {
        const bullets = text.split('\n').filter(p => p.trim());
        el.innerHTML = bullets.map(b => `<div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span><span>${b.trim()}</span></div>`).join('');
      } else if (el) {
        el.innerHTML = '';
      }
    };
    renderBullets('about-mision-bullets', l === 'en' ? data.mision_bullets_en : data.mision_bullets_es);
    renderBullets('about-vision-bullets', l === 'en' ? data.vision_bullets_en : data.vision_bullets_es);
    renderBullets('about-valores-bullets', l === 'en' ? data.valores_bullets_en : data.valores_bullets_es);

    setEl('about-politicas', l === 'en' ? data.politicas_en : data.politicas_es);
    setEl('about-tagline', l === 'en' ? data.tagline_en : data.tagline_es);
    setEl('about-hist4', l === 'en' ? data.trayectoria_en : data.trayectoria_es);

  } catch (err) {
    console.warn('[About] Usando contenido estático por defecto:', err);
  }
}

export const initAboutCards = initAbout;
export const initAboutScroll = initAbout;
