export const NewsSection = `
  <section id="news" class="py-16 md:py-20 bg-transparent relative">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header (Editorial Sobrio) -->
      <div class="mb-14 border-b border-slate-200 pb-8" data-aos="fade-up">
        <div class="flex items-center gap-2 mb-3">
          <span class="w-8 h-px bg-primary-600 inline-block"></span>
          <span class="text-xs font-bold tracking-[0.25em] text-slate-500 uppercase">Actualidad & Comercio Exterior</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3" data-i18n="news.sectionTitle">Noticias y Actualizaciones</h2>
        <p class="text-slate-600 max-w-2xl text-sm md:text-base leading-relaxed font-medium">
          Mantente al día con las últimas novedades de BOLOG, tendencias de la industria logística y normativas del comercio internacional.
        </p>
      </div>
      
      <!-- Contenedor Principal (Destacada + Grid) -->
      <div id="news-container" class="space-y-8">
        <!-- Skeleton Loading -->
        <div class="animate-pulse bg-slate-100 rounded-xl p-4 border border-slate-200 h-80 w-full"></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="animate-pulse bg-white rounded-xl border border-slate-200 h-80"></div>
          <div class="animate-pulse bg-white rounded-xl border border-slate-200 h-80"></div>
          <div class="animate-pulse bg-white rounded-xl border border-slate-200 h-80"></div>
        </div>
      </div>

    </div>
  </section>
`;

export function loadNews() {
  fetch('/api/noticias/')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(news => {
      const container = document.getElementById('news-container');
      if (!container) return;

      if (!Array.isArray(news) || news.length === 0) {
        container.innerHTML = '<p class="col-span-3 text-center text-slate-500">No hay noticias disponibles en este momento.</p>';
        return;
      }

      // Asegurarse de que las noticias vengan ordenadas de más reciente a más antigua
      news.sort((a, b) => new Date(b.fecha_publicacion || 0) - new Date(a.fecha_publicacion || 0));

      // 1. Identificar Noticia Destacada
      let featuredIndex = news.findIndex(n => n.es_destacado === true);
      if (featuredIndex === -1) featuredIndex = 0; // Si no hay destacada, tomar la más reciente

      const featuredNews = news[featuredIndex];

      // Separar el resto de noticias
      const otherNews = [...news.slice(0, featuredIndex), ...news.slice(featuredIndex + 1)];
      const recentGridNews = otherNews.slice(0, 6); // Tomar solo las 6 más recientes

      let html = '';

      // Función auxiliar para generar URL de imagen
      const getImgUrl = (item) => {
        const portadaImg = item.imagenes && item.imagenes.find(img => img.es_portada);
        const imgSrc = portadaImg ? portadaImg.image_path : (item.imagenes && item.imagenes[0] ? item.imagenes[0].image_path : 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?w=1200');
        return imgSrc.startsWith('http') ? imgSrc : '/' + imgSrc.replace(/\\/g, '/');
      };

      const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('es-BO', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
      const getExtract = (item, length = 120) => item.extracto || (item.contenido ? item.contenido.replace(/<[^>]*>?/gm, '').substring(0, length) + '...' : '');

      // Helper para calcular lectura
      const getReadTime = (content) => {
        if (!content) return 1;
        const words = content.replace(/<[^>]*>?/gm, '').split(/\\s+/).length;
        return Math.max(1, Math.ceil(words / 200));
      };

      // Generar HTML Noticia Destacada (layout editorial: imagen + contenido)
      if (featuredNews) {
        html += `
          <!-- Noticia Destacada Editorial -->
          <article data-aos="fade-up" class="group bg-white rounded-xl overflow-hidden cursor-pointer border border-slate-200 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-500 grid md:grid-cols-2" onclick="if(window.goToNews) window.goToNews('${featuredNews.slug || featuredNews.id}'); else { window.scrollToTop ? window.scrollToTop() : window.scrollTo(0,0); window.location.hash='#news/${featuredNews.slug || featuredNews.id}'; }">
            <div class="relative min-h-[280px] md:min-h-[420px] bg-slate-100 overflow-hidden">
              <img src="${getImgUrl(featuredNews)}" alt="${featuredNews.titulo}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1200ms]">
            </div>

            <div class="flex flex-col p-8 md:p-12">
              <div class="flex items-center gap-4 mb-6">
                <span class="text-primary-600 font-bold text-[11px] uppercase tracking-widest border border-primary-200 bg-primary-50 px-3 py-1" data-i18n="news.featured">${window.i18next ? window.i18next.t('news.featured') : 'Destacada'}</span>
                ${featuredNews.categoria ? '<span class="text-slate-500 font-semibold text-[11px] uppercase tracking-widest">' + featuredNews.categoria + '</span>' : ''}
              </div>

              <h3 class="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-5 leading-tight tracking-tight group-hover:text-primary-700 transition-colors">${featuredNews.titulo}</h3>
              <p class="text-slate-600 text-base md:text-lg leading-relaxed mb-8 line-clamp-4">${getExtract(featuredNews, 220)}</p>

              <div class="mt-auto">
                <div class="flex items-center gap-6 text-xs font-semibold text-slate-500 border-b border-slate-100 pb-6 mb-6">
                  <span class="flex items-center gap-2">${formatDate(featuredNews.fecha_publicacion)}</span>
                  <span class="flex items-center gap-2 border-l border-slate-200 pl-6">${getReadTime(featuredNews.contenido)} ${window.i18next ? window.i18next.t('news.minRead') : 'min de lectura'}</span>
                </div>
                <span class="inline-flex items-center gap-2 text-primary-600 text-xs font-black uppercase tracking-widest group-hover:text-primary-700 group-hover:gap-3 transition-all">
                  <span data-i18n="news.readFull">${window.i18next ? window.i18next.t('news.readFull') : 'Leer artículo completo'}</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
              </div>
            </div>
          </article>
        `;
      }

      // Tarjeta Tipo de Cambio (oficial BCB)
      html += `
        <div class="bg-gradient-to-br from-[#004d73] to-[#002f47] rounded-xl overflow-hidden border border-white/10 text-white grid md:grid-cols-2 relative" data-aos="fade-up">
          <div class="absolute top-0 right-0 w-32 h-32 bg-sky-400/20 rounded-full blur-[40px] -translate-y-10 translate-x-10 pointer-events-none"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-primary-500/30 rounded-full blur-[30px] translate-y-10 -translate-x-5 pointer-events-none"></div>

          <div class="p-8 md:p-10 flex flex-col justify-center relative z-10">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <svg class="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <div class="text-sm font-bold uppercase tracking-wider text-slate-200">Tipo de Cambio</div>
                <div class="text-[10px] font-black text-sky-300 uppercase tracking-widest mt-0.5">Oficial BCB</div>
              </div>
            </div>
            <p class="text-slate-300 text-sm leading-relaxed">Dólar estadounidense frente al boliviano, según la cotización oficial del Banco Central de Bolivia.</p>
          </div>

          <div class="border-t md:border-t-0 md:border-l border-white/10 p-8 md:p-10 flex flex-col justify-center relative z-10">
            <div class="text-xs text-slate-400 font-medium tracking-wide mb-1">Valor actual (Bs/USD)</div>
            <div class="flex items-baseline gap-2 mb-4">
              <span id="news-exchange-rate" class="text-4xl md:text-5xl font-black tabular-nums tracking-tight">—</span>
              <span class="text-lg font-bold text-sky-400">BOB</span>
            </div>
            <div class="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>
            <div class="flex justify-between items-center text-[11px] text-slate-300 font-medium">
              <span class="flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                En tiempo real
              </span>
              <span id="news-exchange-date" class="text-emerald-300 font-semibold tracking-wide">—</span>
            </div>
          </div>
        </div>
      `;

      // Generar HTML Grid de 6 noticias
      if (recentGridNews.length > 0) {
        html += `
          <div class="mt-16 mb-8 flex items-center justify-between" data-aos="fade-up">
            <h3 class="text-2xl font-black text-slate-900 flex items-center gap-3">
              <span class="w-8 h-px bg-primary-600 inline-block"></span>
              Últimas Publicaciones
            </h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        `;

        recentGridNews.forEach((item, index) => {
          html += `
            <article class="bg-white rounded-xl overflow-hidden cursor-pointer group border border-slate-200 hover:border-primary-200 hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)] transition-all duration-500 flex flex-col" data-aos="fade-up" data-aos-delay="${(index % 3) * 100}" onclick="if(window.goToNews) window.goToNews('${item.slug || item.id}'); else { window.scrollToTop ? window.scrollToTop() : window.scrollTo(0,0); window.location.hash='#news/${item.slug || item.id}'; }">
              <div class="h-48 bg-slate-100 relative overflow-hidden">
                <img src="${getImgUrl(item)}" alt="${item.titulo}" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700">
                ${item.categoria ? '<span class="absolute top-4 left-4 bg-white text-primary-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-slate-200 shadow-sm">' + item.categoria + '</span>' : ''}
              </div>

              <div class="p-6 flex-1 flex flex-col">
                <div class="text-xs font-semibold text-slate-500 mb-3">${formatDate(item.fecha_publicacion)}</div>

                <h3 class="text-lg font-black text-slate-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors leading-tight tracking-tight">${item.titulo}</h3>
                <p class="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">${getExtract(item, 110)}</p>

                <div class="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span class="text-primary-600 text-[11px] font-black uppercase tracking-widest group-hover:text-primary-700 transition-colors" data-i18n="news.readMore">${window.i18next ? window.i18next.t('news.readMore') : 'Leer más'}</span>
                  <svg class="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </div>
            </article>
          `;
        });

        html += `</div>`;
        
        // Botón Explorar todas (estilo sobrio)
        html += `
          <div class="mt-14 flex justify-center pb-8" data-aos="fade-up">
            <a href="#news/all" class="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest border border-slate-900 hover:bg-primary-700 hover:border-primary-700 transition-colors duration-300">
              <span>Explorar todas las noticias</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
        `;
      }
      container.innerHTML = html;
      if (window.updateContent) window.updateContent();
      if (window.AOS) window.AOS.refresh();

      // Llenar tarjeta de tipo de cambio
      fetch('/api/exchange-rate/current')
        .then(res => res.json())
        .then(data => {
          const valEl = document.getElementById('news-exchange-rate');
          const dateEl = document.getElementById('news-exchange-date');
          if (valEl && data.rate) {
            valEl.textContent = Number(data.rate).toFixed(2);
          } else if (valEl) {
            valEl.textContent = 'N/D';
          }
          if (dateEl && data.date) {
            const recordedDate = new Date(data.date);
            const today = new Date();
            const recDay = new Date(recordedDate.getFullYear(), recordedDate.getMonth(), recordedDate.getDate());
            const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const diffDays = Math.round((todayDay - recDay) / (1000 * 60 * 60 * 24));

            let validityText = '';
            if (diffDays === 0) {
              validityText = `Vigente hoy · ${today.toLocaleDateString('es-BO', { day: 'numeric', month: 'short' })}`;
            } else if (diffDays > 0 && diffDays <= 3) {
              const startDay = recDay.toLocaleDateString('es-BO', { day: 'numeric' });
              const endDay = today.toLocaleDateString('es-BO', { day: 'numeric', month: 'short' });
              validityText = `Vigente: ${startDay}–${endDay}`;
            } else {
              validityText = `Vigente: ${today.toLocaleDateString('es-BO', { day: 'numeric', month: 'short' })}`;
            }
            dateEl.textContent = validityText;
          } else if (dateEl) {
            dateEl.textContent = '';
          }
        })
        .catch(() => {
          const valEl = document.getElementById('news-exchange-rate');
          if (valEl) valEl.textContent = 'N/D';
        });
    })
    .catch(err => {
      console.error('Error cargando noticias:', err);
      const container = document.getElementById('news-container');
      if (container) container.innerHTML = '<p class="col-span-3 text-center text-slate-500">Error al cargar las noticias.</p>';
    });
}
