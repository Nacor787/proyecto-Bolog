import { Navbar, initNavbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import { refreshScrollAnimations } from '../utils/animations.js';

export const NewsArchiveSection = `
  <section id="news-archive" class="bg-transparent min-h-screen">

    <!-- Header Limpio -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
      <div class="flex flex-col" data-aos="fade-up">
        <div class="flex items-center gap-2 mb-3">
          <span class="w-8 h-px bg-primary-600 inline-block"></span>
          <span class="text-xs font-bold tracking-[0.25em] text-slate-400 uppercase" data-i18n="news.sectionTagline">Actualidad & Comercio Exterior</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3" data-i18n="news.sectionTitle">Noticias BOLOG</h2>
        <p class="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed font-medium" data-i18n="news.sectionSubtitle">Mantente al día con las últimas novedades de BOLOG, tendencias de la industria logística y normativas del comercio internacional.</p>
        <div class="mt-6 h-px w-full bg-white/10"></div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      
      <!-- Panel de Controles (Buscador y Categorías) -->
      <div class="bg-[#001d2d]/85 backdrop-blur-xl shadow-2xl border border-white/10 rounded-xl p-5 mb-10 flex flex-col md:flex-row gap-5 sticky top-28 z-40 transition-all">
        
        <!-- Buscador -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="text" id="archive-search" placeholder="Buscar noticias..." data-i18n="[placeholder]news.searchPlaceholder" class="block w-full pl-11 pr-4 py-3 bg-black/20 border border-white/20 rounded-lg text-sm placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition-all font-medium text-white">
        </div>

        <!-- Categorías (Pills) -->
        <div class="flex-1 overflow-x-auto pb-2 md:pb-0 flex items-center hide-scrollbar">
          <div id="archive-categories" class="flex gap-2 min-w-max">
            <!-- Categorías placeholder mientras carga -->
            <button class="cat-btn px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all bg-sky-500 text-white border-transparent" data-cat="Todos" data-i18n="news.allCategories">Todos</button>
            <button class="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide bg-white/5 text-slate-500 border border-white/5 animate-pulse" data-i18n="news.loadingCategories">Cargando categorías...</button>
          </div>
        </div>
      </div>

      <!-- Noticia Destacada del Archivo -->
      <div id="archive-featured" class="hidden mb-8" data-aos="fade-up"></div>

      <!-- WIDGETS DEBAJO DE DESTACADA -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- BANK CARD WIDGET -->
        <div class="bg-gradient-to-br from-[#004d73] to-[#002f47] rounded-xl p-6 relative overflow-hidden text-white border border-white/10 group hover:shadow-[0_20px_40px_rgba(0,77,115,0.3)] transition-all duration-500 hover:-translate-y-1">
          <div class="absolute top-0 right-0 w-32 h-32 bg-sky-400/20 rounded-full blur-[40px] -translate-y-10 translate-x-10 group-hover:bg-sky-400/30 transition-colors duration-500"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-primary-500/30 rounded-full blur-[30px] translate-y-10 -translate-x-5"></div>

          <div class="flex items-center justify-between mb-6 relative z-10">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <svg class="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <span class="text-sm font-bold uppercase tracking-wider text-slate-200" data-i18n="news.exchangeRate">Tipo de Cambio</span>
            </div>
            <span class="text-[10px] font-black px-2 py-1 bg-sky-400/20 text-sky-300 rounded-lg border border-sky-400/30 uppercase tracking-widest" data-i18n="news.officialBCB">Oficial BCB</span>
          </div>

          <div class="relative z-10 flex flex-col mb-2">
            <span class="text-xs text-slate-400 mb-1 font-medium tracking-wide" data-i18n="news.currentValue">Valor actual (Bs/USD)</span>
            <div class="flex items-baseline gap-2">
              <span id="archive-exchange-rate" class="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tight">—</span>
              <span class="text-lg font-bold text-sky-400">BOB</span>
            </div>
          </div>

          <div class="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-6 relative z-10"></div>

          <div class="flex justify-between items-center relative z-10 text-[11px] text-slate-300 font-medium">
            <span class="flex items-center gap-1.5">
              <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
              <span data-i18n="news.realTime">En tiempo real</span>
            </span>
            <span id="archive-exchange-date" class="text-emerald-300 font-semibold tracking-wide">—</span>
          </div>
        </div>

        <!-- TOP NEWS -->
        <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex flex-col">
          <h3 class="text-lg font-black text-white mb-5 flex items-center gap-3">
            <span class="w-8 h-px bg-primary-500 inline-block"></span>
            <span data-i18n="news.topNews">Noticias Más Leídas</span>
          </h3>
          <div id="archive-top-news" class="flex flex-col gap-4 overflow-y-auto pr-2 max-h-[220px]">
            <div class="animate-pulse flex gap-3">
              <div class="w-20 h-16 bg-white/10 rounded-lg"></div>
              <div class="flex-1 space-y-2 py-1"><div class="h-3 bg-white/10 rounded"></div><div class="h-3 bg-white/10 rounded w-5/6"></div></div>
            </div>
            <div class="animate-pulse flex gap-3">
              <div class="w-20 h-16 bg-white/10 rounded-lg"></div>
              <div class="flex-1 space-y-2 py-1"><div class="h-3 bg-white/10 rounded"></div><div class="h-3 bg-white/10 rounded w-5/6"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Separador "Todas las noticias" -->
      <div id="archive-grid-header" class="hidden mb-6 flex items-center gap-3" data-aos="fade-up">
        <span class="w-8 h-px bg-primary-500 inline-block"></span>
        <h3 class="text-xl font-black text-white">Todas las noticias</h3>
      </div>

      <!-- Resultados (Grid) -->
      <div id="archive-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Skeleton Loading -->
        <div class="animate-pulse bg-white/5 rounded-xl border border-white/10 h-[380px]"></div>
        <div class="animate-pulse bg-white/5 rounded-xl border border-white/10 h-[380px] hidden md:block"></div>
        <div class="animate-pulse bg-white/5 rounded-xl border border-white/10 h-[380px] hidden lg:block"></div>
      </div>

      <!-- Estado Vacío -->
      <div id="archive-empty" class="hidden py-20 text-center">
        <svg class="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 class="text-xl font-bold text-slate-700 mb-2" data-i18n="news.noResults">No se encontraron resultados</h3>
        <p class="text-slate-500" data-i18n="news.noResultsDesc">Prueba con otra búsqueda o selecciona una categoría diferente.</p>
      </div>

      <!-- Load More Button -->
      <div class="mt-12 flex justify-center">
        <button id="archive-load-more" class="hidden inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest border border-slate-900 hover:bg-primary-700 hover:border-primary-700 transition-colors duration-300">
          <svg class="w-4 h-4 text-primary-400 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          <span data-i18n="news.loadMore">Cargar Más Noticias</span>
        </button>
      </div>

    </div>
  </section>
  ${Footer}
`;
export function renderNewsArchive() {
  // Forzar scroll al top antes de cambiar el DOM
  if (window.scrollToTop) window.scrollToTop();

  document.querySelector('#app').innerHTML = `
    ${Navbar}
    <main class="relative z-0 overflow-clip w-full max-w-[100vw]">
      <div class="bg-[#0f0f0f]/35 backdrop-blur-sm relative z-10 min-h-screen">
        ${NewsArchiveSection}
      </div>
    </main>
    ${Footer}
  `;

  // Helper global para navegar a una noticia con scroll correcto
  window.goToNews = (slug) => {
    if (window.scrollToTop) window.scrollToTop();
    window.location.hash = '#news/' + slug;
  };

  initNavbar();
  loadNewsArchive();
  if (window.updateContent) window.updateContent();
  refreshScrollAnimations();
}

export function loadNewsArchive() {
  if (window.scrollToTop) window.scrollToTop();

  // Variables de estado local
  let allNews = [];
  let filteredNews = [];
  let displayedCount = 0;
  const ITEMS_PER_PAGE = 9;
  let activeCategory = 'Todos';
  let featuredId = null; // ID/slug de la noticia destacada para excluirla del grid

  // Referencias DOM
  const gridEl = document.getElementById('archive-grid');
  const searchInput = document.getElementById('archive-search');
  const catContainer = document.getElementById('archive-categories');
  const loadMoreBtn = document.getElementById('archive-load-more');
  const emptyState = document.getElementById('archive-empty');

  // Helpers
  const getImgUrl = (item) => {
    const portadaImg = item.imagenes && item.imagenes.find(img => img.es_portada);
    const imgSrc = portadaImg ? portadaImg.image_path : (item.imagenes && item.imagenes[0] ? item.imagenes[0].image_path : 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?w=1200');
    return imgSrc.startsWith('http') ? imgSrc : '/' + imgSrc.replace(/\\/g, '/');
  };
  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('es-BO', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const getExtract = (item, length = 120) => item.extracto || (item.contenido ? item.contenido.replace(/<[^>]*>?/gm, '').substring(0, length) + '...' : '');
  const getReadTime = (content) => {
    if (!content) return 1;
    const words = content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const renderCards = (newsItems, append = false) => {
    if (!append) gridEl.innerHTML = '';

    if (newsItems.length === 0 && !append) {
      emptyState.classList.remove('hidden');
      loadMoreBtn.classList.add('hidden');
      return;
    }

    emptyState.classList.add('hidden');

    let html = '';
    newsItems.forEach((item, index) => {
      html += `
        <article class="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer group border border-white/10 hover:border-sky-400 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col" data-aos="fade-up" onclick="window.goToNews('${item.slug || item.id}')">
          <div class="h-52 bg-slate-900 relative overflow-hidden">
            <img src="${getImgUrl(item)}" alt="${item.titulo}" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700">
            ${item.categoria ? '<span class="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/20 shadow-sm">' + item.categoria + '</span>' : ''}
          </div>
          
          <div class="p-6 flex-1 flex flex-col">
            <div class="text-xs font-semibold text-slate-400 mb-3">${formatDate(item.fecha_publicacion)}</div>
            
            <h3 class="text-lg font-black text-white mb-3 line-clamp-2 group-hover:text-sky-400 transition-colors leading-tight tracking-tight">${item.titulo}</h3>
            <p class="text-slate-300 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">${getExtract(item, 110)}</p>
            
            <div class="pt-4 border-t border-white/10 flex items-center justify-between w-full mt-auto">
              <span class="text-sky-400 text-[11px] font-black uppercase tracking-widest group-hover:text-sky-300 transition-colors" data-i18n="news.readMore">${window.i18next ? window.i18next.t('news.readMore') : 'Leer más'}</span>
              <svg class="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>
          </div>
        </article>
      `;
    });

    if (append) {
      gridEl.insertAdjacentHTML('beforeend', html);
    } else {
      gridEl.innerHTML = html;
    }
    refreshScrollAnimations();
  };

  const applyFilters = () => {
    const searchTerm = searchInput.value.toLowerCase();

    filteredNews = allNews.filter(n => {
      // Excluir la noticia destacada si ya se muestra arriba
      if (featuredId && (n.slug === featuredId || n.id === featuredId)) return false;
      const matchSearch = n.titulo.toLowerCase().includes(searchTerm) || (n.extracto && n.extracto.toLowerCase().includes(searchTerm));
      const matchCat = activeCategory === 'Todos' || n.categoria === activeCategory;
      return matchSearch && matchCat;
    });

    displayedCount = Math.min(filteredNews.length, ITEMS_PER_PAGE);
    renderCards(filteredNews.slice(0, displayedCount));
    updateLoadMoreBtn();
    refreshScrollAnimations();
  };

  const updateLoadMoreBtn = () => {
    if (displayedCount < filteredNews.length) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
    }
  };

  // Fetch News
  fetch('/api/noticias/')
    .then(res => res.json())
    .then(news => {
      if (!Array.isArray(news)) return;

      allNews = news.sort((a, b) => new Date(b.fecha_publicacion || 0) - new Date(a.fecha_publicacion || 0));

      const featuredEl = document.getElementById('archive-featured');
      const gridHeaderEl = document.getElementById('archive-grid-header');
      const featuredItem = allNews.find(n => n.es_destacado) || (allNews.length > 0 ? allNews[0] : null);
      if (featuredEl && featuredItem) {
        featuredId = featuredItem.slug || featuredItem.id;

        const img = featuredItem.imagenes && featuredItem.imagenes.find(i => i.es_portada);
        const imgUrl = img ? (img.image_path.startsWith('http') ? img.image_path : '/' + img.image_path.replace(/\\/g, '/')) : 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?w=1200';
        featuredEl.innerHTML = `
          <article class="group bg-white/5 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-sky-400 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-all duration-500 grid md:grid-cols-2" onclick="window.goToNews('${featuredItem.slug || featuredItem.id}')">
            <div class="relative min-h-[280px] md:min-h-[400px] bg-slate-900 overflow-hidden">
              <img src="${imgUrl}" alt="${featuredItem.titulo}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1200ms]">
            </div>
            <div class="flex flex-col p-8 md:p-10">
              <div class="flex items-center gap-4 mb-6">
                <span class="text-sky-400 font-bold text-[11px] uppercase tracking-widest border border-sky-500/20 bg-sky-500/10 px-3 py-1">★ Destacada</span>
                ${featuredItem.categoria ? '<span class="text-slate-300 font-semibold text-[11px] uppercase tracking-widest">' + featuredItem.categoria + '</span>' : ''}
              </div>
              <h3 class="text-2xl md:text-3xl font-black text-white mb-4 leading-tight tracking-tight group-hover:text-sky-400 transition-colors">${featuredItem.titulo}</h3>
              <p class="text-slate-300 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">${featuredItem.extracto || ''}</p>
              <div class="mt-auto">
                <div class="flex items-center gap-4 text-xs font-semibold text-slate-400 border-b border-white/10 pb-5 mb-5">
                  <span>${formatDate(featuredItem.fecha_publicacion)}</span>
                </div>
                <span class="inline-flex items-center gap-2 text-sky-400 text-xs font-black uppercase tracking-widest group-hover:text-sky-300 group-hover:gap-3 transition-all">
                  <span data-i18n="news.readFull">${window.i18next ? window.i18next.t('news.readFull') : 'Leer artículo completo'}</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
              </div>
            </div>
          </article>
        `;
        featuredEl.classList.remove('hidden');
        if (gridHeaderEl) gridHeaderEl.classList.remove('hidden');
      }

      const categories = ['Todos'];
      allNews.forEach(n => {
        if (n.categoria && !categories.includes(n.categoria)) categories.push(n.categoria);
      });
      catContainer.innerHTML = categories.map(cat => `
        <button class="cat-btn px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${cat === 'Todos' ? 'bg-sky-500 text-white border-transparent' : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'}" data-cat="${cat}" ${cat === 'Todos' ? 'data-i18n="news.allCategories"' : ''}>
          ${cat === 'Todos' ? (window.i18next ? window.i18next.t('news.allCategories') : 'Todos') : cat}
        </button>
      `).join('');

      catContainer.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          catContainer.querySelectorAll('.cat-btn').forEach(b => {
            b.classList.remove('bg-sky-500', 'text-white', 'border-transparent');
            b.classList.add('bg-white/5', 'text-slate-300', 'border', 'border-white/10');
          });
          e.currentTarget.classList.remove('bg-white/5', 'text-slate-300', 'border', 'border-white/10');
          e.currentTarget.classList.add('bg-sky-500', 'text-white', 'border-transparent');

          activeCategory = e.currentTarget.getAttribute('data-cat');
          applyFilters();

          const gridHeader = document.getElementById('archive-grid-header');
          if (gridHeader) {
            const y = gridHeader.getBoundingClientRect().top + window.scrollY - 200;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        });
      });

      applyFilters();
    })
    .catch(err => {
      console.error('Error al cargar noticias', err);
      gridEl.innerHTML = '<p class="col-span-3 text-center text-red-500">Error cargando el archivo de noticias.</p>';
    });

  searchInput.addEventListener('input', applyFilters);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredNews && filteredNews.length > 0) {
        const firstNews = filteredNews[0];
        if (window.goToNews) {
          window.goToNews(firstNews.slug || firstNews.id);
        } else {
          window.location.hash = '#news/' + (firstNews.slug || firstNews.id);
        }
      }
    }
  });

  loadMoreBtn.addEventListener('click', () => {
    const nextCount = Math.min(filteredNews.length, displayedCount + ITEMS_PER_PAGE);
    const newItems = filteredNews.slice(displayedCount, nextCount);
    renderCards(newItems, true);
    displayedCount = nextCount;
    updateLoadMoreBtn();
  });

  fetch('/api/exchange-rate/current')
    .then(res => res.json())
    .then(data => {
      const valEl = document.getElementById('archive-exchange-rate');
      const dateEl = document.getElementById('archive-exchange-date');
      if (valEl && data.rate) valEl.textContent = Number(data.rate).toFixed(2);
      else if (valEl) valEl.textContent = 'N/D';
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
    .catch(() => { const v = document.getElementById('archive-exchange-rate'); if (v) v.textContent = 'N/D'; });

  // Noticias mas leidas
  fetch('/api/noticias/')
    .then(res => res.json())
    .then(data => {
      const topEl = document.getElementById('archive-top-news');
      if (!topEl) return;
      const top = data.sort((a, b) => (b.vistas || 0) - (a.vistas || 0)).slice(0, 5);
      if (top.length === 0) { topEl.innerHTML = '<p class="text-sm text-slate-400 italic">No hay noticias.</p>'; return; }
      topEl.innerHTML = top.map(n => {
        const img = (n.imagenes && n.imagenes.length > 0)
          ? (n.imagenes[0].image_path.startsWith('http') ? n.imagenes[0].image_path : '/' + n.imagenes[0].image_path.replace(/\\/g, '/'))
          : 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?w=200';
        const date = new Date(n.fecha_publicacion).toLocaleDateString('es-BO', { day: '2-digit', month: 'short' });
        return `
          <a href="#news/${n.slug}" class="flex gap-4 group items-center p-2 rounded-xl hover:bg-white/10 transition-colors">
            <div class="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
              <img src="${img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="${n.titulo}">
            </div>
            <div class="flex-1 min-w-0 flex flex-col justify-center">
              <h4 class="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-sky-400 transition-colors">${n.titulo}</h4>
              <span class="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">${date}</span>
            </div>
          </a>
        `;
      }).join('');
    })
    .catch(() => { const e = document.getElementById('archive-top-news'); if (e) e.innerHTML = '<p class="text-sm text-slate-400">Error al cargar noticias.</p>'; });
}
