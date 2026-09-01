import { Stats } from './Stats.js';

export const About = `
  <section id="about" class="relative bg-transparent py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <!-- Subtle ambient lighting -->
    <div class="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none"></div>

    <div class="max-w-5xl mx-auto relative z-10">
      
      <!-- Section Header -->
      <div id="about-header" class="mb-14 border-b border-white/10 pb-8" data-aos="fade-up">
        <div class="flex items-center gap-2 mb-3">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
          <span class="text-xs font-extrabold tracking-[0.25em] text-sky-400 uppercase">Trayectoria & Solidez</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3" data-i18n="about.title">Nosotros</h2>
        <p class="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed font-medium" data-i18n="about.tagline">
          Más de 20 años de experiencia brindando soluciones logísticas en transporte aéreo, marítimo y terrestre a nivel mundial.
        </p>
      </div>
      <!-- History Text and Corporate Video Grid -->
      <div class="mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-8">
          
          <!-- Left Text: History (First Part) -->
          <div class="about-history space-y-4 text-slate-300 text-sm md:text-base leading-relaxed text-justify flex flex-col justify-center" data-aos="fade-right" data-aos-delay="50">
            <p class="text-sky-400 font-bold text-lg mb-4 italic" data-i18n="about.histQuote">"Más de dos décadas conectando a Bolivia y el mundo con cada carga, cada ruta y cada solución."</p>
            <p data-i18n="about.hist1">Hace más de 20 años, BOLOG LOGISTICS GROUP SRL nació con una convicción clara: la logística no se trata solo de mover contenedores o paquetes, sino de mover economías, proteger proyectos de vida y construir puentes entre fronteras. En un entorno global cambiante y desafiante, entendimos desde el primer día que detrás de cada importación y exportación hay emprendedores, industrias y familias que confían en que sus insumos y productos llegarán a tiempo.</p>
            <p data-i18n="about.hist2">Con los años, adaptamos nuestro paso al ritmo acelerado del comercio mundial. Nos expandimos en todas las modalidades —aérea, marítima y terrestre— para garantizar que ninguna distancia fuera infranqueable. Desde la carga consolidada más minuciosa hasta los despachos más complejos a nivel global, hemos dominado las rutas internacionales para que nuestros clientes solo se preocupen por hacer crecer su negocio.</p>
          </div>

          <!-- Corporate Video (Right side) -->
          <div id="about-video-container" class="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] group h-full min-h-[300px]" data-aos="fade-left" data-aos-delay="100">
            <!-- El resplandor detrás del video -->
            <div class="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-sky-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div class="relative w-full h-[300px] md:h-[400px] lg:h-full min-h-[300px] bg-slate-900 rounded-3xl overflow-hidden">
              <!-- TODO: Reemplazar el atributo src="" por el enlace PÚBLICO de tu video de Cloudinary -->
              <video 
                class="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" 
                autoplay muted loop playsinline
                src="https://res.cloudinary.com/oyusqpnf/video/upload/VIDEO.mp4"
              >
                Tu navegador no soporta videos HTML5.
              </video>
              
              <!-- Gradiente de sombra superpuesto -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/10 to-transparent pointer-events-none opacity-90"></div>
              
              <!-- Elemento decorativo sobre el video -->
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

        <!-- Full Width Text: History (Second Part) -->
        <div class="about-history-bottom space-y-4 text-slate-300 text-sm md:text-base leading-relaxed text-justify" data-aos="fade-up" data-aos-delay="150">
          <p data-i18n="about.hist3">Lo que verdaderamente nos diferencia no es solo la capacidad técnica, sino la pasión por resolver. En la logística, los imprevistos existen; pero en BOLOG, las excusas no. Nos hemos consolidado como un aliado estratégico que no te abandona en la aduana ni te deja sin respuesta. Nos involucramos mano a mano en cada gestión, anticipando obstáculos y transformando dificultades operativas en respuestas prácticas, ágiles y eficientes.</p>
          
          <div class="mt-12 text-center">
            <!-- Texto Final Sin Contenedor -->
            <p class="font-extrabold text-xl md:text-2xl text-white mb-8" data-i18n="about.hist4">Hoy, con más de 20 años de trayectoria, no somos simplemente tu agente de carga:<br/><strong class="text-sky-400">Somos el motor que impulsa tu logística global.</strong></p>
            
            <!-- Estadísticas Completas de Stats.js -->
            ${Stats}
          </div>
        </div>
      </div>

      <!-- Card Políticas (Full Width, Encima del Grid) -->
      <div id="about-policies" class="mb-8" data-aos="fade-up">
        <div class="about-card group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 hover:border-sky-400 shadow-[0_10px_35px_rgba(0,0,0,0.05)] transition-all duration-500 overflow-hidden cursor-pointer">
          <div class="absolute -top-12 -left-12 w-40 h-40 bg-sky-400/5 rounded-full blur-3xl group-hover:bg-sky-400/15 transition-colors duration-700"></div>
          
          <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <!-- Icono y Título -->
            <div class="flex-shrink-0 md:w-1/3">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 2v20" /></svg>
                </div>
                <div>
                  <span class="text-xs font-bold text-sky-400 tracking-wider uppercase block mb-1">Estructura</span>
                  <h3 class="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-sky-400 transition-colors" data-i18n="about.policiesTitle">
                    Políticas
                  </h3>
                </div>
              </div>
            </div>

            <!-- Descripción y Lista -->
            <div class="md:w-2/3 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
              <p class="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6 text-justify" data-i18n="about.policiesDesc">
                Nuestras políticas se fundamentan en el cumplimiento estricto de las normativas internacionales de comercio exterior, priorizando la seguridad, la confidencialidad y la mejora continua en cada etapa de la cadena de suministro.
              </p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-300">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  <span>Cumplimiento normativo y aduanero</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  <span>Seguridad en la cadena de suministro</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  <span>Calidad y mejora continua</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  <span>Sostenibilidad operativa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Misión, Visión y Valores Cards Grid (Nuevo Estilo Editorial) -->
      <div id="about-cards-container" class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        <!-- Card 1: Misión -->
        <div class="about-card group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-9 border border-white/10 hover:border-sky-400 shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(6,182,212,0.15)] transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer" data-aos="fade-up" data-aos-delay="100">
          <div class="absolute -top-12 -right-12 w-28 h-28 bg-sky-400/10 rounded-full blur-2xl group-hover:bg-sky-400/25 transition-colors duration-500"></div>
          
          <div>
            <!-- Number & Tag -->
            <div class="flex items-center justify-between mb-6">
              <span class="px-3.5 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-black tracking-widest uppercase">
                01 / Propósito
              </span>
              <span class="text-xs font-bold text-sky-400 tracking-wider">Excelencia</span>
            </div>

            <!-- Icon -->
            <div class="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm mb-6">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>

            <!-- Title -->
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-sky-400 transition-colors" data-i18n="about.mission">
              Misión
            </h3>
            
            <!-- Description -->
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6 text-justify" data-i18n="about.missionDesc">
              Conectar a Bolivia y el mundo mediante servicios de transporte multimodal de excelencia, brindando respaldo absoluto, agilidad operativa y soluciones logísticas reales que potencien a nuestros clientes.
            </p>
          </div>

          <!-- Feature Highlights -->
          <div class="pt-5 border-t border-white/10 space-y-2 text-xs font-semibold text-slate-300">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              <span>Cobertura puerta a puerta personalizada</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              <span>Trazabilidad y respaldo normativo</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Visión -->
        <div class="about-card group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-9 border border-white/10 hover:border-sky-400 shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(6,182,212,0.15)] transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer" data-aos="fade-up" data-aos-delay="200">
          <div class="absolute -top-12 -right-12 w-28 h-28 bg-sky-400/10 rounded-full blur-2xl group-hover:bg-sky-400/25 transition-colors duration-500"></div>
          
          <div>
            <!-- Number & Tag -->
            <div class="flex items-center justify-between mb-6">
              <span class="px-3.5 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-black tracking-widest uppercase">
                02 / Horizonte
              </span>
              <span class="text-xs font-bold text-sky-400 tracking-wider">Liderazgo</span>
            </div>

            <!-- Icon -->
            <div class="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm mb-6">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </div>

            <!-- Title -->
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-sky-400 transition-colors" data-i18n="about.vision">
              Visión
            </h3>
            
            <!-- Description -->
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6 text-justify" data-i18n="about.visionDesc">
              Ser el referente líder e innovador en la cadena de suministros de la región, integrando tecnología de vanguardia, alianzas internacionales y un equipo de alta especialización para conectar mercados de forma ágil y sostenible.
            </p>
          </div>

          <!-- Feature Highlights -->
          <div class="pt-5 border-t border-white/10 space-y-2 text-xs font-semibold text-slate-300">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              <span>Innovación tecnológica continua</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              <span>Expansión de alianzas estratégicas</span>
            </div>
          </div>
        </div>

        <!-- Card 3: Valores -->
        <div class="about-card group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-9 border border-white/10 hover:border-sky-400 shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(6,182,212,0.15)] transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer" data-aos="fade-up" data-aos-delay="300">
          <div class="absolute -top-12 -right-12 w-28 h-28 bg-sky-400/10 rounded-full blur-2xl group-hover:bg-sky-400/25 transition-colors duration-500"></div>
          
          <div>
            <!-- Number & Tag -->
            <div class="flex items-center justify-between mb-6">
              <span class="px-3.5 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-black tracking-widest uppercase">
                03 / Pilares
              </span>
              <span class="text-xs font-bold text-sky-400 tracking-wider">Integridad</span>
            </div>

            <!-- Icon -->
            <div class="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm mb-6">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>

            <!-- Title -->
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-sky-400 transition-colors" data-i18n="about.values">
              Valores
            </h3>
            
            <!-- Description -->
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6 text-justify" data-i18n="about.valuesDesc">
              Puntualidad, transparencia absoluta y compromiso en cada milla. Respondemos con velocidad, flexibilidad y enfoque práctico para asegurar que cada operación llegue a buen puerto.
            </p>
          </div>

          <!-- Feature Highlights -->
          <div class="pt-5 border-t border-white/10 space-y-2 text-xs font-semibold text-slate-300">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              <span>Transparencia y honestidad comercial</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              <span>Seguridad y compromiso sin excepciones</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
`;

export function initAbout() { }
export const initAboutCards = initAbout;
export const initAboutScroll = initAbout;
