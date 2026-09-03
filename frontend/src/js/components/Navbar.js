const logoSrc = 'https://res.cloudinary.com/oyusqpnf/image/upload/v1787506176/logo-bolog.png';

export const Navbar = `
  <header id="header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">

    <!-- Mobile Slim Banner (solo móvil) -->
    <div id="mobile-top-banner" class="w-full border-transparent transition-all duration-300 sm:hidden z-30 text-white/80 text-[11px] font-medium tracking-wide pt-2.5 pb-1 px-3">
      <!-- Fila 1: teléfono, email y horario -->
      <div class="flex items-center justify-center gap-1.5 whitespace-nowrap text-[10px]">
        <div class="flex items-center gap-1">
          <svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          <span id="mobile-phone-number">+591 2 214 7305</span>
        </div>
        <span class="text-sky-500/30">|</span>
        <div class="flex items-center gap-1">
          <svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          <span>info@blg.com.bo</span>
        </div>
        <span class="text-sky-500/30">|</span>
        <div class="flex items-center gap-1">
          <svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span data-i18n="topBanner.hoursMobile">Lun–Vie: 8:30AM–5:00PM</span>
        </div>
      </div>
      <!-- Fila 2: sucursal -->
      <div class="flex items-center justify-center mt-1">
        <div class="relative branch-wrapper">
          <button class="branch-btn flex items-center gap-1.5 text-white/80 hover:text-white transition-colors focus:outline-none bg-white/5 px-2.5 py-0.5 rounded-md border border-white/20">
            <svg class="w-3 h-3 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
            <span class="branch-selected-text" data-i18n="topBanner.branchLaPaz">Central La Paz</span>
            <svg class="branch-chevron w-2.5 h-2.5 text-sky-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="branch-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-1 w-44 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden opacity-0 invisible transition-all duration-200 translate-y-[-6px] z-50">
            <div class="py-1">
              <button class="w-full text-left px-3 py-2 text-xs text-white bg-white/10 hover:bg-white/20 transition-colors branch-option font-medium" data-value="lapaz" data-i18n="topBanner.branchLaPaz">Central La Paz</button>
              <button class="w-full text-left px-3 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors branch-option font-medium" data-value="santacruz" data-i18n="topBanner.branchSantaCruz">Sucursal Santa Cruz</button>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- Main Navbar (Transparent initially) -->
    <nav id="main-nav" class="bg-transparent border-b border-transparent relative z-20 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative flex lg:justify-center justify-center h-12 md:h-14 items-center">

          <!-- Logo a la izquierda -->
          <div class="absolute left-0 flex items-center h-full pl-4 md:pl-0">
            <a id="nav-logo" href="#" class="relative flex items-center group opacity-0 -translate-y-2 pointer-events-none transition-all duration-300">
              <!-- Glow desplazado a la izquierda -->
              <div class="absolute -left-4 w-16 h-8 bg-white/20 blur-[16px] rounded-full z-0 pointer-events-none transition-all duration-300 group-hover:bg-white/30"></div>
              <img src="${logoSrc}" alt="BOLOG Logo" class="relative z-10 h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300" />
            </a>
          </div>

          <!-- Desktop Menu - Glassmorph Pill -->
          <div class="hidden lg:flex items-center space-x-3 lg:space-x-4 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <a href="#home" class="nav-link text-[11px] font-bold text-white/70 hover:text-white transition-colors tracking-widest uppercase">
              <span data-i18n="nav.home">INICIO</span>
            </a>
            <a href="#coverage" class="nav-link text-[11px] font-bold text-white/70 hover:text-white transition-colors tracking-widest uppercase">
              <span data-i18n="nav.coverage">COBERTURA</span>
            </a>
            <a href="#services" class="nav-link text-[11px] font-bold text-white/70 hover:text-white transition-colors tracking-widest uppercase">
              <span data-i18n="nav.services">SERVICIOS</span>
            </a>
            <a href="#clients" class="nav-link text-[11px] font-bold text-white/70 hover:text-white transition-colors tracking-widest uppercase">
              <span>CLIENTES</span>
            </a>
            <a href="#contact" class="nav-link text-[11px] font-bold text-white/70 hover:text-white transition-colors tracking-widest uppercase">
              <span data-i18n="nav.contact">CONTACTO</span>
            </a>
            <a href="#location" class="nav-link text-[11px] font-bold text-white/70 hover:text-white transition-colors tracking-widest uppercase">
              <span data-i18n="nav.location">UBICACIÓN</span>
            </a>
            <a href="#about" class="nav-link text-[11px] font-bold text-white/70 hover:text-white transition-colors tracking-widest uppercase">
              <span data-i18n="nav.about">NOSOTROS</span>
            </a>
            <a href="#news/all" class="nav-link text-[11px] font-bold text-white/70 hover:text-white transition-colors tracking-widest uppercase">
              <span>NOTICIAS</span>
            </a>
            <a href="#tracking" class="nav-link text-[11px] font-bold text-white/70 hover:text-white transition-colors tracking-widest uppercase">
              <span>SEGUIMIENTO BLG</span>
            </a>
            <a id="nav-dashboard" href="#dashboard" class="hidden bg-brand-accent hover:bg-yellow-400 text-brand-dark px-4 py-1.5 text-xs font-bold transition-colors shadow uppercase tracking-widest">
              Dashboard
            </a>
          </div>

          <!-- Mobile Menu Button (animated hamburger → X) -->
          <div class="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 flex items-center z-[100]">
            <button id="mobile-menu-btn" aria-label="Toggle menu" class="relative text-white focus:outline-none bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20 hover:bg-white/20 transition-all shadow-lg w-11 h-11 flex flex-col items-center justify-center gap-[5px]">
              <span id="hb-top"    class="block h-[2.5px] w-6 bg-white rounded-full origin-center transition-all duration-300"></span>
              <span id="hb-mid"    class="block h-[2.5px] w-6 bg-white rounded-full origin-center transition-all duration-300"></span>
              <span id="hb-bot"    class="block h-[2.5px] w-6 bg-white rounded-full origin-center transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Mobile Menu (fixed below header, no layout shift) -->
      <div id="mobile-menu" class="hidden lg:hidden fixed left-0 right-0 z-[49] bg-black/60 backdrop-blur-2xl border-t border-white/10 shadow-2xl overflow-y-auto max-h-[calc(100vh-4rem)] rounded-b-2xl">
        <div class="px-4 pt-3 pb-4 space-y-1">
          <a href="#home" class="flex items-center px-3 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded">
            <span data-i18n="nav.home">Inicio</span>
          </a>
          <a href="#coverage" class="flex items-center px-3 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded">
            <span data-i18n="nav.coverage">Cobertura</span>
          </a>
          <a href="#services" class="flex items-center px-3 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded">
            <span data-i18n="nav.services">Servicios</span>
          </a>
          <a href="#clients" class="flex items-center px-3 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded">
            <span>Clientes</span>
          </a>
          <a href="#contact" class="flex items-center px-3 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded">
            <span data-i18n="nav.contact">Contacto</span>
          </a>
          <a href="#location" class="flex items-center px-3 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded">
            <span data-i18n="nav.location">Ubicación</span>
          </a>
          <a href="#about" class="flex items-center px-3 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded">
            <span data-i18n="nav.about">Nosotros</span>
          </a>
          <a href="#news/all" class="flex items-center px-3 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded">
            <span>Noticias</span>
          </a>
          <a href="#tracking" class="flex items-center px-3 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded">
            <span data-i18n="nav.tracking">Seguimiento BLG</span>
          </a>

          <!-- Divisor -->
          <div class="h-px w-full bg-white/10 my-2"></div>
          
          <button class="lang-toggle-btn flex items-center w-full gap-2 px-3 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded text-left">
            <svg class="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
            <span class="flex-1">Idioma / Language</span>
            <span class="current-lang bg-white/10 px-2 py-0.5 rounded text-xs">ES</span>
          </button>

          <a id="mobile-dashboard" href="#dashboard" class="hidden flex items-center gap-2 px-3 py-2 text-sm font-bold text-brand-dark bg-brand-accent rounded mt-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
            Dashboard
          </a>
        </div>
      </div>
    </nav>

    <!-- Bottom Info Banner (desktop: sm y mayor) -->
    <div id="top-banner" class="w-full border-transparent text-white/80 font-medium text-xs tracking-wide relative z-20 hidden sm:block transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center py-2">
        
        <!-- Info Principal -->
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 whitespace-nowrap">
          <div class="flex items-center gap-1 hover:text-sky-100 transition-colors cursor-default">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <span id="header-phone-number">+591 2 214 7305</span>
          </div>
          <a href="mailto:info@blg.com.bo" class="flex items-center gap-1 hover:text-sky-100 transition-colors cursor-pointer group">
            <svg class="w-3.5 h-3.5 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <span>info@blg.com.bo</span>
          </a>
          <div class="flex items-center gap-1 hover:text-sky-100 transition-colors cursor-default hidden lg:flex">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span data-i18n="topBanner.hours">Lun-Vie: 8:30AM–5:00PM</span>
          </div>
        </div>

        <!-- Controles -->
        <div class="flex items-center gap-4">
          <button class="lang-toggle-btn flex items-center gap-1 hover:text-sky-300 transition-colors shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
            <span class="current-lang">ES</span>
          </button>
          
          <div class="h-3 w-px bg-white/20"></div>

          <div class="relative shrink-0 branch-wrapper">
            <button class="branch-btn flex items-center gap-1 text-white/80 hover:text-white transition-colors focus:outline-none">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
              <span class="branch-selected-text" data-i18n="topBanner.branchLaPaz">La Paz</span>
              <svg class="branch-chevron w-3 h-3 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div class="branch-dropdown absolute top-full right-0 mt-2 w-48 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden opacity-0 invisible transition-all duration-200 translate-y-[-10px] z-50">
              <div class="py-1">
                <button class="w-full text-left px-3 py-2 text-xs text-white bg-white/10 hover:bg-white/20 transition-colors branch-option font-medium" data-value="lapaz" data-i18n="topBanner.branchLaPaz">Central La Paz</button>
                <button class="w-full text-left px-3 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors branch-option font-medium" data-value="santacruz" data-i18n="topBanner.branchSantaCruz">Sucursal Santa Cruz</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </header>
`;

export function initNavbar() {
  const phone = document.getElementById('header-phone-number');
  const mobilePhone = document.getElementById('mobile-phone-number');

  document.querySelectorAll('.branch-wrapper').forEach(wrapper => {
    const btn = wrapper.querySelector('.branch-btn');
    const dropdown = wrapper.querySelector('.branch-dropdown');
    const chevron = wrapper.querySelector('.branch-chevron');

    if (btn && dropdown) {
      let isOpen = false;
      const toggleDropdown = () => {
        if (isOpen) {
          dropdown.classList.remove('opacity-0', 'invisible', 'translate-y-[-10px]');
          chevron.classList.add('rotate-180');
        } else {
          dropdown.classList.add('opacity-0', 'invisible', 'translate-y-[-10px]');
          chevron.classList.remove('rotate-180');
        }
      };

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen = !isOpen;
        toggleDropdown();
      });

      document.addEventListener('click', () => {
        if (isOpen) {
          isOpen = false;
          toggleDropdown();
        }
      });
    }
  });

  // Lógica de opciones de sucursales globales
  document.querySelectorAll('.branch-option').forEach(option => {
    option.addEventListener('click', (e) => {
      const val = e.currentTarget.getAttribute('data-value');

      document.querySelectorAll('.branch-selected-text').forEach(textEl => {
        textEl.setAttribute('data-i18n', val === 'lapaz' ? 'topBanner.branchLaPaz' : 'topBanner.branchSantaCruz');
        if (window.i18next) {
          textEl.innerText = window.i18next.t(val === 'lapaz' ? 'topBanner.branchLaPaz' : 'topBanner.branchSantaCruz');
        } else {
          textEl.innerText = e.currentTarget.innerText;
        }
      });

      // Actualizar estilos activos
      document.querySelectorAll('.branch-option').forEach(opt => {
        if (opt.closest('#mobile-menu')) {
          opt.classList.remove('text-white', 'bg-sky-500', 'text-slate-300');
          if (opt.getAttribute('data-value') === val) {
            opt.classList.add('text-white', 'bg-sky-500');
          } else {
            opt.classList.add('text-slate-300');
          }
        } else {
          opt.classList.remove('text-white', 'bg-sky-500', 'text-sky-600', 'hover:bg-sky-50');
          if (opt.getAttribute('data-value') === val) {
            opt.classList.add('text-white', 'bg-sky-500');
          } else {
            opt.classList.add('text-sky-600', 'hover:bg-sky-50');
          }
        }
      });

      if (phone) {
        if (val === 'lapaz') phone.innerText = '+591 2 214 7305 - 7384';
        else if (val === 'santacruz') phone.innerText = '+591 3 341 7324';
      }
      if (mobilePhone) {
        if (val === 'lapaz') mobilePhone.innerText = '+591 2 214 7305';
        else if (val === 'santacruz') mobilePhone.innerText = '+591 3 341 7324';
      }
    });
  });

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hbTop = document.getElementById('hb-top');
  const hbMid = document.getElementById('hb-mid');
  const hbBot = document.getElementById('hb-bot');

  let menuOpen = false;

  const setMenuState = (open) => {
    menuOpen = open;
    const header = document.getElementById('header');
    if (open) {
      // Posicionar exactamente debajo del header
      if (header) mobileMenu.style.top = header.offsetHeight + 'px';
      mobileMenu.classList.remove('hidden');
      // Animar entrada (slide down)
      requestAnimationFrame(() => {
        mobileMenu.style.opacity = '1';
        mobileMenu.style.transform = 'translateY(0)';
      });
      // Animate to X
      hbTop.style.transform = 'translateY(7.5px) rotate(45deg)';
      hbMid.style.opacity = '0';
      hbMid.style.transform = 'scaleX(0)';
      hbBot.style.transform = 'translateY(-7.5px) rotate(-45deg)';
    } else {
      mobileMenu.style.opacity = '0';
      mobileMenu.style.transform = 'translateY(-8px)';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 250);
      // Animar de vuelta al icono de hamburguesa
      hbTop.style.transform = '';
      hbMid.style.opacity = '1';
      hbMid.style.transform = '';
      hbBot.style.transform = '';
    }
  };

  // Inicializar estilos de transición del menú
  mobileMenu.style.opacity = '0';
  mobileMenu.style.transform = 'translateY(-8px)';
  mobileMenu.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setMenuState(!menuOpen);
    });
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    const targetId = href.slice(1);

    // Si es un enlace vacío o solo '#', dejamos el comportamiento nativo
    if (!targetId) {
      if (menuOpen) setMenuState(false);
      return;
    }

    const target = document.getElementById(targetId);

    // Si el elemento destino está en la página
    if (target) {
      e.preventDefault();

      const wasMenuOpen = menuOpen;
      if (menuOpen) setMenuState(false);

      // Actualizar URL sin trigger hashchange para no interferir
      history.pushState(null, '', href);

      const doScroll = () => {
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 0;
        if (window.lenis) {
          window.lenis.scrollTo(target, {
            offset: -headerHeight,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      };

      if (wasMenuOpen) {
        setTimeout(doScroll, 120);
      } else {
        doScroll();
      }
    } else {
      // El elemento destino NO está en la página (estamos en #tracking, #news/..., etc.)
      e.preventDefault();
      if (menuOpen) setMenuState(false);

      if (window.location.hash === href) {
        // Ya tiene este hash pero no estaba en la landing: forzamos el evento hashchange para reconstruir la vista
        window.dispatchEvent(new Event('hashchange'));
      } else {
        // Cambiar el hash. handleRoute en main.js se encargará de renderizar la landing y hacer scroll al target
        window.location.hash = href;
      }
    }
  });

  // Lógica de la barra de navegación fija y ScrollSpy
  const header = document.getElementById('header');
  const mainNav = document.getElementById('main-nav');
  const topBanner = document.getElementById('top-banner');
  const mobileTopBanner = document.getElementById('mobile-top-banner');
  const navLogo = document.getElementById('nav-logo');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#main-nav a[href^="#"]');

  if (header && mainNav) {
    const updateNavBackground = () => {
      const isTrackingPage = window.location.hash === '#tracking';
      const isNewsDetail = window.location.hash.startsWith('#news/');

      if (isTrackingPage || isNewsDetail || window.scrollY > 50) {
        if (topBanner) {
          topBanner.classList.add('bg-white/5', 'backdrop-blur-md', 'border-y', 'border-white/10');
          topBanner.classList.remove('border-transparent');
        }
        if (mobileTopBanner) {
          mobileTopBanner.classList.add('bg-white/5', 'backdrop-blur-md', 'border-b', 'border-white/10');
          mobileTopBanner.classList.remove('border-transparent');
        }
        if (navLogo) {
          navLogo.classList.remove('opacity-0', '-translate-y-2', 'pointer-events-none');
          navLogo.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
      } else {
        if (topBanner) {
          topBanner.classList.remove('bg-white/5', 'backdrop-blur-md', 'border-y', 'border-white/10');
          topBanner.classList.add('border-transparent');
        }
        if (mobileTopBanner) {
          mobileTopBanner.classList.remove('bg-white/5', 'backdrop-blur-md', 'border-b', 'border-white/10');
          mobileTopBanner.classList.add('border-transparent');
        }
        if (navLogo) {
          navLogo.classList.add('opacity-0', '-translate-y-2', 'pointer-events-none');
          navLogo.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
      }
    };

    window.addEventListener('scroll', updateNavBackground);
    updateNavBackground(); // Initialize the correct background based on route/scroll

    window.addEventListener('scroll', () => {
      // Lógica de ScrollSpy dinámica: Actualizar el enlace de navegación activo
      let currentSection = '';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Verificamos si la parte superior de la sección cruzó nuestro umbral visual
        if (rect.top <= (header.offsetHeight + 150)) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#' || !href) return;

        if (href === '#' + currentSection) {
          link.classList.remove('text-white/70');
          link.classList.add('text-white', 'drop-shadow-md');
        } else {
          link.classList.remove('text-white', 'drop-shadow-md');
          link.classList.add('text-white/70');
        }
      });
    });
  }
}
