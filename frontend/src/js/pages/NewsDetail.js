const logoSrc = 'https://res.cloudinary.com/oyusqpnf/image/upload/v1787506176/logo-bolog.png';
import { Navbar, initNavbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';

export function renderNewsDetail(slug) {
  // Forzar scroll al top ANTES de cambiar el DOM (cubre todos los navegadores)
  if (window.scrollToTop) window.scrollToTop();

  const appEl = document.querySelector('#app');
  appEl.innerHTML = `
    <div class="min-h-screen bg-transparent text-white relative font-sans overflow-x-hidden">
      <!-- Elementos decorativos removidos para no bloquear el 3D -->
      ${Navbar}

      <div class="bg-[#0f0f0f]/35 backdrop-blur-sm relative z-10 min-h-screen">
        <!-- Hero de la noticia con Slider -->
        <div id="news-detail-hero" class="relative w-full overflow-hidden pt-36 pb-8 z-10">
          <div class="max-w-4xl mx-auto px-6 flex flex-col gap-8">
          
          <!-- Botones de Navegación -->
          <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
            <a onclick="window.location.hash='#news'" class="inline-flex items-center gap-2 text-white hover:text-slate-300 transition-colors text-xs font-bold tracking-widest uppercase cursor-pointer group w-fit">
              <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              <span data-i18n="news.back">Volver</span>
            </a>
            <a href="#news/all" class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors text-xs font-bold tracking-widest uppercase group w-fit border border-primary-200 hover:border-primary-400 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded-full">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0l-4-4m4 4l-4 4"></path></svg>
              Ver todas las noticias
            </a>
          </div>

          <!-- Título y categoría (Arriba) -->
          <div class="w-full text-center md:text-left flex flex-col items-center md:items-start pt-2">
            <div id="news-detail-category" class="inline-block bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-md"></div>
            <h1 id="news-detail-title" class="text-3xl md:text-5xl font-black leading-tight text-white mb-2"></h1>
          </div>

          <!-- Slider como Portada -->
          <div class="w-full flex items-center justify-center relative group">
             <button id="slider-prev" class="absolute left-4 z-20 p-2 md:p-3 bg-black/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-110 shadow-lg cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
              </button>
              
              <div class="w-full overflow-hidden relative rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[21/9] md:aspect-[16/7] bg-slate-800 ring-1 ring-white/10">
                  <div class="flex h-full transition-transform duration-700 ease-out" id="news-slider">
                     <!-- Imágenes dinámicas -->
                  </div>
              </div>

              <button id="slider-next" class="absolute right-4 z-20 p-2 md:p-3 bg-black/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-110 shadow-lg cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </button>
          </div>

        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        <!-- MAIN CONTENT -->
        <div class="lg:col-span-8 flex flex-col gap-6">
          <!-- Metadata & Share Bar -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div class="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-300">
              <span id="news-detail-date" class="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span></span>
              </span>
              <span id="news-detail-views" class="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                <span></span>
              </span>
              <span id="news-detail-readtime" class="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span></span>
              </span>
            </div>
            
            <!-- Social Share -->
            <div class="flex items-center gap-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Compartir</span>
              <button onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank')" class="w-8 h-8 rounded-full bg-[#1877F2] text-white hover:opacity-80 hover:scale-110 flex items-center justify-center transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </button>
              <button onclick="window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(window.location.href), '_blank')" class="w-8 h-8 rounded-full bg-[#0A66C2] text-white hover:opacity-80 hover:scale-110 flex items-center justify-center transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </button>
              <button onclick="window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(window.location.href), '_blank')" class="w-8 h-8 rounded-full bg-[#25D366] text-white hover:opacity-80 hover:scale-110 flex items-center justify-center transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </button>
            </div>
          </div>

          <!-- Extracto destacado Premium -->
          <div class="relative bg-white/5 backdrop-blur-sm py-6 pr-6 pl-20 md:pl-24 rounded-2xl border-l-4 border-primary-500 mt-2 min-h-[100px] flex items-center">
            <svg class="absolute top-1/2 left-6 md:left-8 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 text-primary-500/40 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            <p id="news-detail-extract" class="relative z-10 text-lg md:text-xl font-medium text-slate-200 leading-relaxed"></p>
          </div>

          <!-- Contenido principal (Quill HTML) -->
          <article id="news-detail-content" class="
            prose prose-invert prose-lg max-w-none
            prose-headings:font-black prose-headings:text-white prose-headings:tracking-tight
            prose-p:text-slate-300 prose-p:leading-relaxed
            prose-a:text-primary-400 hover:prose-a:text-primary-300 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-li:text-slate-300
            prose-blockquote:border-primary-500 prose-blockquote:text-slate-400 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
            prose-code:text-primary-400 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
          ">
            <!-- El contenido HTML del editor Quill se inyecta aquí -->
            <div class="flex items-center justify-center py-20">
              <div class="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"></div>
            </div>
          </article>

          <!-- Botón Ver más noticias (bottom) -->
          <div class="flex items-center justify-center pt-6 pb-2 border-t border-white/10">
            <a href="#news/all" class="group inline-flex items-center gap-3 px-7 py-3.5 bg-white/5 text-white font-bold text-sm uppercase tracking-widest rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 relative overflow-hidden">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0l-4-4m4 4l-4 4"></path></svg>
              <span>Ver más noticias</span>
            </a>
          </div>
        </div>

        <!-- SIDEBAR -->
        <div class="lg:col-span-4 mt-12 lg:mt-0">
          <div class="sticky top-28 flex flex-col gap-8">
            
            <!-- BANK CARD WIDGET -->
            <div class="bg-gradient-to-br from-[#004d73] to-[#002f47] rounded-3xl p-6 shadow-2xl relative overflow-hidden text-white border border-white/10 group">
              <!-- Decoración de fondo -->
              <div class="absolute top-0 right-0 w-32 h-32 bg-sky-400/20 rounded-full blur-[40px] -translate-y-10 translate-x-10"></div>
              
              <div class="flex items-center justify-between mb-8 relative z-10">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <svg class="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <span class="text-sm font-bold uppercase tracking-wider text-slate-200">Tipo de Cambio</span>
                </div>
              </div>

              <div class="relative z-10 flex flex-col mb-2">
                <span class="text-xs text-slate-400 mb-1 font-medium tracking-wide">Valor actual (Bs/USD)</span>
                <div class="flex items-baseline gap-2">
                  <span id="sidebar-exchange-rate" class="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tight">—</span>
                  <span class="text-lg font-bold text-sky-400">BOB</span>
                </div>
              </div>

              <div class="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-6 relative z-10"></div>

              <div class="flex justify-between items-center relative z-10 text-[11px] text-slate-300 font-medium">
                <span class="flex items-center gap-1.5">
                  <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  En tiempo real
                </span>
                <span id="sidebar-exchange-date" class="text-emerald-300 font-semibold tracking-wide">—</span>
              </div>
            </div>

            <!-- Widget: Top Noticias -->
            <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg">
              <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                Noticias Más Leídas
              </h3>
              <div id="sidebar-top-news" class="flex flex-col gap-4">
                <!-- Loading state -->
                <div class="animate-pulse flex gap-3">
                  <div class="w-20 h-16 bg-white/10 rounded-xl"></div>
                  <div class="flex-1 space-y-2 py-1"><div class="h-3 bg-white/10 rounded"></div><div class="h-3 bg-white/10 rounded w-5/6"></div></div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      ${Footer}
    </div>
  `;

  // Scroll al top también después del innerHTML (por si el browser lo movió)
  if (window.scrollToTop) window.scrollToTop();

  // Lógica Sticky manejada por Navbar
  initNavbar();

  // Update nav state for logged in users
  const token = localStorage.getItem('bolog_access_token');
  if (token) {
    const desktopDashboard = document.getElementById('nav-dashboard');
    const mobileDashboard = document.getElementById('mobile-dashboard');
    const desktopLogin = document.getElementById('nav-login');
    const mobileLogin = document.getElementById('mobile-login');
    if (desktopDashboard) desktopDashboard.classList.remove('hidden');
    if (mobileDashboard) mobileDashboard.classList.remove('hidden');
    if (desktopLogin) desktopLogin.classList.add('hidden');
    if (mobileLogin) mobileLogin.classList.add('hidden');
  }

  // Cargar datos de la noticia por slug
  fetch(`/api/noticias/por-slug/${slug}`)
    .then(res => {
      if (!res.ok) throw new Error('Noticia no encontrada');
      return res.json();
    })
    .then(item => {
      // Hero imagenes slider
      const sliderContainer = document.getElementById('news-slider');
      const prevBtn = document.getElementById('slider-prev');
      const nextBtn = document.getElementById('slider-next');

      if (sliderContainer && item.imagenes && item.imagenes.length > 0) {
        let sliderHtml = '';
        item.imagenes.forEach(img => {
          const imgUrl = img.image_path.startsWith('http') ? img.image_path : '/' + img.image_path.replace(/\\/g, '/');
          sliderHtml += `<img src="${imgUrl}" class="w-full h-full object-cover flex-shrink-0" alt="${item.titulo}">`;
        });
        sliderContainer.innerHTML = sliderHtml;

        if (item.imagenes.length > 1) {
          let currentSlide = 0;
          const totalSlides = item.imagenes.length;

          const goToSlide = (index) => {
            const slideWidth = sliderContainer.clientWidth;
            sliderContainer.style.transform = `translateX(-${index * slideWidth}px)`;
          };

          const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
          };

          const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
          };

          let slideInterval = setInterval(nextSlide, 3000);

          const resetAutoSlide = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 3000);
          };

          nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
          });

          prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
          });

          window.addEventListener('resize', () => goToSlide(currentSlide));
          // Initialize
          setTimeout(() => goToSlide(0), 100);
        } else {
          // Solo 1 imagen, ocultar botones
          prevBtn.style.display = 'none';
          nextBtn.style.display = 'none';
        }
      } else if (sliderContainer) {
        sliderContainer.innerHTML = `<img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?w=800" class="w-full h-full object-cover flex-shrink-0" alt="Placeholder">`;
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      }

      // Título y categoría
      const titleEl = document.getElementById('news-detail-title');
      if (titleEl) titleEl.textContent = item.titulo;

      const catEl = document.getElementById('news-detail-category');
      if (catEl) {
        if (item.categoria) { catEl.textContent = item.categoria; }
        else { catEl.style.display = 'none'; }
      }

      // Meta: fecha y vistas
      const dateEl = document.querySelector('#news-detail-date span');
      if (dateEl && item.fecha_publicacion) {
        dateEl.textContent = new Date(item.fecha_publicacion).toLocaleDateString('es-BO', { year: 'numeric', month: 'long', day: 'numeric' });
      }

      const viewsEl = document.querySelector('#news-detail-views span');
      const readsText = window.i18next ? window.i18next.t('news.reads') : 'lecturas';
      if (viewsEl) viewsEl.textContent = `${item.vistas || 0} ${readsText}`;

      // Extracto
      const extractEl = document.getElementById('news-detail-extract');
      if (extractEl) {
        if (item.extracto && item.extracto.trim() !== '') {
          extractEl.textContent = item.extracto;
          extractEl.parentElement.style.display = 'block';
        } else {
          extractEl.parentElement.style.display = 'none';
        }
      }

      // Contenido HTML (generado por Quill)
      const contentEl = document.getElementById('news-detail-content');
      if (contentEl && item.contenido) {
        contentEl.innerHTML = item.contenido;
        // Aplicar letra capitular (drop cap) al primer párrafo
        const firstP = contentEl.querySelector('p');
        if (firstP) {
          firstP.classList.add('first-letter:text-6xl', 'first-letter:font-black', 'first-letter:text-primary-600', 'first-letter:mr-3', 'first-letter:float-left', 'first-letter:leading-none', 'first-line:uppercase', 'first-line:tracking-widest', 'first-line:font-semibold');
        }

        // Calcular tiempo de lectura estimado
        const wordCount = item.contenido.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
        const readTimeEl = document.querySelector('#news-detail-readtime span');
        if (readTimeEl) {
          const min = Math.max(1, Math.ceil(wordCount / 200)); // 200 palabras por minuto
          const minText = window.i18next ? window.i18next.t('news.minRead') : 'min de lectura';
          readTimeEl.textContent = `${min} ${minText}`;
        }
      } else if (contentEl) {
        contentEl.innerHTML = `<p class="text-slate-400 text-center py-10" data-i18n="news.noContent">${window.i18next ? window.i18next.t('news.noContent') : 'Esta noticia no tiene contenido disponible.'}</p>`;
        const readTimeEl = document.querySelector('#news-detail-readtime');
        if (readTimeEl) readTimeEl.style.display = 'none';
      }
    })
    .catch(err => {
      console.error('Error cargando la noticia:', err);
      const contentEl = document.getElementById('news-detail-content');
      if (contentEl) {
        contentEl.innerHTML = `
          <div class="text-center py-20">
            <svg class="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <h3 class="text-xl font-bold text-slate-400" data-i18n="news.notFound">${window.i18next ? window.i18next.t('news.notFound') : 'Noticia no encontrada'}</h3>
            <p class="text-slate-500 mt-2" data-i18n="news.notFoundDesc">${window.i18next ? window.i18next.t('news.notFoundDesc') : 'La noticia que buscas no existe o fue eliminada.'}</p>
            <button onclick="window.location.hash='#news'" class="mt-6 px-6 py-2.5 bg-primary-600 hover:bg-primary-500 rounded-lg text-sm font-bold transition-colors" data-i18n="news.back">${window.i18next ? window.i18next.t('news.back') : 'Volver a Noticias'}</button>
          </div>
        `;
      }
    })
    .finally(() => {
      if (window.updateContent) window.updateContent();
      // Forzar scroll arriba tras inyectar el contenido (doble rAF > setTimeout)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (window.scrollToTop) window.scrollToTop();
        });
      });
    });

  // Fetch Tipo de Cambio para la Tarjeta
  fetch('/api/exchange-rate/current')
    .then(res => res.json())
    .then(data => {
      const valEl = document.getElementById('sidebar-exchange-rate');
      const dateEl = document.getElementById('sidebar-exchange-date');
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
      const valEl = document.getElementById('sidebar-exchange-rate');
      if (valEl) valEl.textContent = 'N/D';
    });

  // Fetch Noticias más leídas
  fetch('/api/noticias/')
    .then(res => res.json())
    .then(data => {
      const topNewsEl = document.getElementById('sidebar-top-news');
      if (!topNewsEl) return;

      // Ordenar por vistas y tomar top 3 excluyendo la actual
      const topNews = data
        .filter(n => n.slug !== slug)
        .sort((a, b) => (b.vistas || 0) - (a.vistas || 0))
        .slice(0, 3);

      if (topNews.length === 0) {
        topNewsEl.innerHTML = '<p class="text-sm text-slate-500 italic">No hay otras noticias.</p>';
        return;
      }

      let html = '';
      topNews.forEach(n => {
        const title = n.titulo;
        const img = (n.imagenes && n.imagenes.length > 0) ? (n.imagenes[0].image_path.startsWith('http') ? n.imagenes[0].image_path : '/' + n.imagenes[0].image_path.replace(/\\/g, '/')) : 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?w=200';
        const date = new Date(n.fecha_publicacion).toLocaleDateString('es-BO', { day: '2-digit', month: 'short' });

        html += `
          <a href="#news/${n.slug}" class="flex gap-4 group items-center p-2 rounded-xl hover:bg-white/10 transition-colors">
            <div class="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 relative shadow-sm">
              <img src="${img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="${title}">
            </div>
            <div class="flex-1 min-w-0 flex flex-col justify-center">
              <h4 class="text-sm font-bold text-slate-200 leading-snug line-clamp-2 group-hover:text-white transition-colors">${title}</h4>
              <span class="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">${date}</span>
            </div>
          </a>
        `;
      });
      topNewsEl.innerHTML = html;
    })
    .catch(() => {
      const topNewsEl = document.getElementById('sidebar-top-news');
      if (topNewsEl) topNewsEl.innerHTML = '<p class="text-sm text-slate-500">Error al cargar noticias.</p>';
    });
}
