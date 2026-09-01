import { showAlert, showConfirm } from '../../components/UI.js';
import { TablasCrud } from '../../components/TablasCrud.js';
import { NEWS_MODAL_HTML, initNewsEditor, resetNewsEditor } from '../../components/NewsEditor.js';
import { fetchWithAuth } from '../../utils/api.js';
import { CLOUDINARY_DASHBOARD_BG } from '../../utils/cloudinary.js';
const logoSrc = 'https://res.cloudinary.com/oyusqpnf/image/upload/v1787506176/logo-bolog.png';

export const Dashboard = `
  <div class="min-h-screen flex flex-col md:flex-row text-white" style="background-image:linear-gradient(180deg, rgba(11,25,44,0.8), rgba(11,25,44,0.6)), url('${CLOUDINARY_DASHBOARD_BG}'); background-size:cover; background-position:center;">
    <!-- Mobile Top Nav -->
    <div class="md:hidden flex items-center glass-card-admin glass-card-admin-admin-flat px-4 h-[72px] z-50 sticky top-0 w-full gap-4">
      <button id="mobile-sidebar-toggle" class="p-2 bg-white/10 border border-white/5 text-white rounded-lg shadow-sm hover:bg-white/10 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <img src="${logoSrc}" alt="BOLOG Logo" class="h-10 w-auto object-contain">
    </div>

    <!-- Overlay Móvil -->
    <div id="sidebar-overlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden opacity-0 transition-opacity duration-300 md:hidden"></div>

    <!-- Sidebar -->
    <aside id="dashboard-sidebar" class="w-64 transition-all duration-300 ease-in-out glass-card-admin glass-card-admin-admin-flat text-white flex flex-col fixed top-[72px] bottom-0 left-0 z-40 transform -translate-x-full md:relative md:translate-x-0 md:top-0 md:z-20">
      <div class="hidden md:flex p-6 border-b border-white/5 justify-center items-center h-20 relative">
        <div class="sidebar-text overflow-hidden transition-all duration-300 flex justify-center w-full">
          <a href="#home" class="block hover:opacity-80 transition-opacity cursor-pointer">
            <img src="${logoSrc}" alt="BOLOG Logo" class="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          </a>
        </div>
        <!-- Este botón cerrará/abrirá en desktop -->
        <button id="sidebar-toggle" class="absolute right-4 text-slate-400 hover:text-white transition-colors bg-white/10 p-2 rounded-lg border border-white/5">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
      <nav class="flex-1 p-4 space-y-2 overflow-x-hidden" id="sidebar-nav">
        <!-- Perfil de usuario -->
        <div id="sidebar-profile-container" class="mb-6 px-2 py-3 bg-white/10 rounded-xl border border-white/5 flex items-center shadow-inner transition-all duration-300">
          <div class="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            <span id="sidebar-user-initial">A</span>
          </div>
          <div id="sidebar-profile-text" class="ml-3 sidebar-text overflow-hidden whitespace-nowrap transition-all duration-300">
            <p class="text-sm font-medium text-white" id="sidebar-user-name">Administrador</p>
            <p class="text-xs text-brand-accent capitalize" id="sidebar-user-role">admin</p>
          </div>
        </div>
        
        <a href="#dashboard" class="nav-link flex items-center px-4 py-3 rounded-lg text-slate-300 hover:text-white font-medium transition-colors mb-2 overflow-hidden whitespace-nowrap" data-path="#dashboard">
          <svg class="w-5 h-5 flex-shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          <span class="sidebar-text transition-all duration-300">Gestión de Noticias</span>
        </a>

        <a href="#dashboard-users" class="nav-link flex items-center px-4 py-3 rounded-lg text-slate-300 hover:text-white font-medium transition-colors mb-2 overflow-hidden whitespace-nowrap" data-path="#dashboard-users">
          <svg class="w-5 h-5 flex-shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <span class="sidebar-text transition-all duration-300">Usuarios</span>
        </a>
      </nav>
      <div class="p-4 border-t border-white/5 overflow-hidden whitespace-nowrap">
        <button id="sidebar-logout-btn" onclick="localStorage.removeItem('bolog_access_token'); window.location.hash='#login'" class="flex items-center text-slate-400 hover:text-white transition-colors w-full px-2">
          <svg class="w-5 h-5 flex-shrink-0 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          <span class="sidebar-text transition-all duration-300">Cerrar Sesión</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col" id="dashboard-content">
      <!-- Dynamic Content loaded here -->
    </main>
  </div>
`;

export async function initDashboard() {
  const token = localStorage.getItem('bolog_access_token');
  if (!token) {
    window.location.hash = '#login';
    return;
  }

  // Load current user profile
  fetchWithAuth('/api/users/me').then(res => {
    if (res && res.ok) {
      res.json().then(user => {
        const nameEl = document.getElementById('sidebar-user-name');
        const roleEl = document.getElementById('sidebar-user-role');
        const initialEl = document.getElementById('sidebar-user-initial');
        if (nameEl) nameEl.innerText = `${user.first_name} ${user.last_name}`;
        if (roleEl && user.role) roleEl.innerText = user.role.name;
        if (initialEl) initialEl.innerText = user.first_name.charAt(0).toUpperCase();
      });
    }
  });

  const hash = window.location.hash || '#dashboard';

  let sidebarNav = document.getElementById('sidebar-nav');
  if (sidebarNav) {
    sidebarNav.replaceWith(sidebarNav.cloneNode(true));
  }

  // Highlight active sidebar link & Auto-close on mobile
  document.querySelectorAll('#sidebar-nav .nav-link').forEach(link => {
    if (link.getAttribute('data-path') === hash) {
      link.classList.add('bg-gradient-to-r', 'from-primary-600', 'to-primary-700', 'text-white', 'shadow-lg');
      link.classList.remove('bg-white/10', 'text-slate-300');
    } else {
      link.classList.remove('bg-gradient-to-r', 'from-primary-600', 'to-primary-700', 'text-white', 'shadow-lg');
      link.classList.add('text-slate-300');
    }

    // Auto-close on mobile
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        const sb = document.getElementById('dashboard-sidebar');
        const ov = document.getElementById('sidebar-overlay');
        if (sb && ov) {
          sb.classList.add('-translate-x-full');
          ov.classList.add('opacity-0');
          setTimeout(() => ov.classList.add('hidden'), 300);
        }
      }
    });
  });

  const contentDiv = document.getElementById('dashboard-content');

  // Sidebar Toggle Logic
  const sidebar = document.getElementById('dashboard-sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle'); // Desktop
  let mobileToggleBtn = document.getElementById('mobile-sidebar-toggle'); // Mobile
  let overlay = document.getElementById('sidebar-overlay');

  // Asegurar que event listeners se asignen correctamente
  if (mobileToggleBtn && sidebar && overlay) {
    mobileToggleBtn.replaceWith(mobileToggleBtn.cloneNode(true));
    mobileToggleBtn = document.getElementById('mobile-sidebar-toggle'); // Actualizar ref

    overlay.replaceWith(overlay.cloneNode(true));
    overlay = document.getElementById('sidebar-overlay'); // Actualizar ref

    mobileToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      
      // Si se está abriendo (ya no tiene la clase -translate-x-full)
      if (!sidebar.classList.contains('-translate-x-full')) {
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
      } else {
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
      }
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.add('-translate-x-full');
      overlay.classList.add('opacity-0');
      setTimeout(() => overlay.classList.add('hidden'), 300);
    });
  }

  // Lógica Desktop y Botón interno
  if (toggleBtn && sidebar) {
    toggleBtn.replaceWith(toggleBtn.cloneNode(true));
    document.getElementById('sidebar-toggle').addEventListener('click', () => {
      sidebar.classList.toggle('w-64');
      sidebar.classList.toggle('w-20');

      const isCollapsed = sidebar.classList.contains('w-20');

      const texts = sidebar.querySelectorAll('.sidebar-text');
      texts.forEach(text => {
        if (isCollapsed) {
          text.classList.add('opacity-0', 'w-0');
        } else {
          text.classList.remove('opacity-0', 'w-0');
        }
      });

      const profileContainer = document.getElementById('sidebar-profile-container');
      const profileText = document.getElementById('sidebar-profile-text');
      if (profileContainer) {
        if (isCollapsed) {
          profileContainer.classList.remove('px-2');
          profileContainer.classList.add('px-0', 'justify-center');
          if (profileText) profileText.classList.remove('ml-3');
        } else {
          profileContainer.classList.add('px-2');
          profileContainer.classList.remove('px-0', 'justify-center');
          if (profileText) profileText.classList.add('ml-3');
        }
      }

      const navLinks = sidebar.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        const icon = link.querySelector('svg');
        if (isCollapsed) {
          link.classList.remove('px-4');
          link.classList.add('px-0', 'justify-center');
          if (icon) icon.classList.remove('mr-3');
        } else {
          link.classList.add('px-4');
          link.classList.remove('px-0', 'justify-center');
          if (icon) icon.classList.add('mr-3');
        }
      });

      const logoutBtn = document.getElementById('sidebar-logout-btn');
      if (logoutBtn) {
        const logoutIcon = logoutBtn.querySelector('svg');
        if (isCollapsed) {
          logoutBtn.classList.remove('px-2');
          logoutBtn.classList.add('px-0', 'justify-center');
          if (logoutIcon) logoutIcon.classList.remove('mr-3');
        } else {
          logoutBtn.classList.add('px-2');
          logoutBtn.classList.remove('px-0', 'justify-center');
          if (logoutIcon) logoutIcon.classList.add('mr-3');
        }
      }
    });
  }

  if (hash === '#dashboard-users') {
    renderUsersView(contentDiv);
  } else {
    renderNewsView(contentDiv);
  }

  // Refresh AOS after dynamically inserting elements with data-aos
  if (window.AOS) {
    setTimeout(() => { window.AOS.refresh(); }, 50);
  }
}

function renderNewsView(container) {
  resetNewsEditor(); // Reset editor instance since DOM is being recreated
  container.innerHTML = `
    <header data-aos="fade-down" data-aos-duration="500" class="glass-card-admin h-auto min-h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-3 gap-3">
      <h1 class="text-xl font-heading font-black text-white">Gestión de Noticias</h1>
      
      <div class="flex items-center gap-2 flex-wrap">
        <button id="btn-tab-news" onclick="switchNewsTab('news')" class="news-tab-btn px-4 py-2 rounded-lg text-sm font-bold transition-all bg-primary-600 text-white shadow">Noticias</button>
        <button id="btn-tab-cats" onclick="switchNewsTab('cats')" class="news-tab-btn px-4 py-2 rounded-lg text-sm font-bold transition-all bg-white/10 text-white hover:bg-white/10">Categorías</button>
      </div>
    </header>
    <div class="flex-1 p-4 md:p-8 overflow-y-auto w-full flex justify-center">
      <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="100" class="w-[95%] md:w-[90%] max-w-7xl">
        <div id="tab-panel-news" class="glass-card-admin overflow-hidden w-full flex flex-col h-[600px] max-h-[80vh]"></div>
        <div id="tab-panel-cats" class="hidden flex-col h-[600px] max-h-[80vh] w-full relative">

          <div id="cats-table-container" class="glass-card-admin overflow-hidden flex flex-col flex-1 relative"></div>
        </div>
      </div>
    </div>
    
    ${NEWS_MODAL_HTML}

    <!-- Modal Nueva Categoría -->
    <div id="cat-modal" class="fixed inset-0 z-[100] hidden bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div class="min-h-screen px-4 flex items-center justify-center py-8">
        <div class="relative w-full max-w-md glass-card-admin rounded-2xl text-left flex flex-col">
          <div class="px-5 py-4 border-b border-white/5 flex justify-between items-center">
            <h3 class="text-lg font-bold text-white">Nueva Categoría</h3>
            <button onclick="closeCategoryModal()" class="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div class="p-5">
            <form id="cat-form" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nombre de la Categoría *</label>
                <input type="text" id="new-cat-input-modal" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Ej. Logística">
              </div>
              <div class="flex justify-end gap-3 pt-4 border-t border-white/5 mt-2">
                <button type="button" onclick="closeCategoryModal()" class="px-4 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">Cancelar</button>
                <button type="submit" class="px-5 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  if (!window.newsTable) {
    window.newsTable = new TablasCrud({
      containerId: 'tab-panel-news',
      entityName: 'news',
      searchPlaceholder: 'Buscar noticias...',
      addButtonHtml: '<button onclick="openNewsModal()" class="bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_4px_20px_rgba(6,182,212,0.35)] whitespace-nowrap">+ Nueva Noticia</button>',
      columnsHtml: `
        <th class="px-4 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Fecha</th>
        <th class="px-4 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Título</th>
        <th class="px-4 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider hidden md:table-cell">Categoría</th>
        <th class="px-4 py-4 text-right text-xs font-bold text-slate-300 uppercase tracking-wider">Acciones</th>
      `,
      fetchData: async () => {
        await fetchWithAuth('/api/noticias/fix-slugs', { method: 'POST' }).catch(() => { });
        const res = await fetchWithAuth('/api/noticias/');
        return res && res.ok ? await res.json() : [];
      },
      filterFn: (n, q) =>
        n.titulo.toLowerCase().includes(q) ||
        (n.extracto && n.extracto.toLowerCase().includes(q)),
      renderRow: (item) => {
        let coverImg = 'https://placehold.co/100x100/1e293b/cbd5e1?text=No+Img';
        if (item.imagenes && item.imagenes.length > 0) {
          const cover = item.imagenes.find(img => img.es_portada) || item.imagenes[0];
          coverImg = cover.image_path.startsWith('http') ? cover.image_path : '/' + cover.image_path;
        }

        return `
          <tr class="hover:bg-white/10 transition-colors">
            <td class="px-4 py-4 whitespace-nowrap text-sm text-slate-400 w-32">${new Date(item.fecha_publicacion).toLocaleDateString('es-BO')}</td>
            <td class="px-4 py-4">
              <div class="flex items-center gap-4">
                <div class="w-16 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0 border border-white/5 hidden sm:block">
                  <img src="${coverImg}" class="w-full h-full object-cover" alt="${item.titulo}" onerror="this.src='https://placehold.co/100x100/1e293b/cbd5e1?text=No+Img'">
                </div>
                <div>
                  <p class="text-sm font-bold text-white line-clamp-1">${item.titulo}</p>
                  <div class="flex items-center gap-2 mt-1">
                    ${item.es_destacado ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-accent/20 text-brand-accent border border-brand-accent/30">Destacada</span>' : ''}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-4 py-4 whitespace-nowrap hidden md:table-cell">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-300 border border-white/5">
                ${item.categoria || 'General'}
              </span>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-right">
              <div class="flex items-center justify-end gap-2">
                <a title="Ver noticia" href="#news/${item.slug}"
                  class="p-1.5 rounded-lg bg-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </a>
                <button title="Editar noticia" onclick="editNoticia(${item.id})"
                  class="p-1.5 rounded-lg bg-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
                <button title="Eliminar noticia" onclick="deleteNoticia(${item.id}, '${item.titulo.replace(/'/g, "\\'")}')"
                  class="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }
    });
  } else {
    window.newsTable.container = document.getElementById('tab-panel-news');
  }
  window.newsTable.init();

  if (!window.catsTable) {
    window.catsTable = new TablasCrud({
      containerId: 'cats-table-container',
      entityName: 'cats',
      searchPlaceholder: 'Buscar categorías...',
      addButtonHtml: '<button onclick="openCategoryModal()" class="bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_4px_20px_rgba(6,182,212,0.35)] whitespace-nowrap">+ Nueva Categoría</button>',
      columnsHtml: `
        <th class="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Nombre</th>
        <th class="px-6 py-4 text-right text-xs font-bold text-slate-300 uppercase tracking-wider">Acciones</th>
      `,
      fetchData: async () => {
        const res = await fetch('/api/categories/');
        return res && res.ok ? await res.json() : [];
      },
      filterFn: (c, q) => c.name.toLowerCase().includes(q),
      onDataLoaded: (cats) => {
        const sel = document.getElementById('news-category');
        if (!sel) return;
        const current = sel.value;
        sel.innerHTML = '<option value="" disabled selected class="bg-neutral-900 text-slate-400">Seleccionar categoría...</option>';
        cats.forEach(c => {
          const opt = document.createElement('option');
          opt.value = c.name;
          opt.textContent = c.name;
          opt.className = 'bg-neutral-900 text-white';
          if (c.name === current) opt.selected = true;
          sel.appendChild(opt);
        });
      },
      renderRow: (c) => `
        <tr class="hover:bg-white/10 transition-colors">
          <td class="px-6 py-4 text-sm font-bold text-white">${c.name}</td>
          <td class="px-6 py-4 text-right">
            <button onclick="deleteCategory(${c.id}, '${c.name.replace(/'/g, "\\'")}')"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-xs font-bold">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              Eliminar
            </button>
          </td>
        </tr>`
    });
  } else {
    window.catsTable.container = document.getElementById('cats-table-container');
  }
  window.catsTable.init();
  initNewsEditor();
}

// ─── Gestion de Tabs en Noticias ────────────────────────────
window.switchNewsTab = (tab) => {
  const panelNews = document.getElementById('tab-panel-news');
  const panelCats = document.getElementById('tab-panel-cats');
  const btnNews = document.getElementById('btn-tab-news');
  const btnCats = document.getElementById('btn-tab-cats');

  if (!panelNews) return;
  if (tab === 'news') {
    panelNews.classList.remove('hidden');
    panelNews.classList.add('flex');
    panelCats.classList.add('hidden');
    panelCats.classList.remove('flex');
    btnNews.classList.add('bg-primary-600', 'text-white', 'shadow');
    btnNews.classList.remove('bg-white/10', 'text-white', 'hover:bg-white/10');
    btnCats.classList.remove('bg-primary-600', 'text-white', 'shadow');
    btnCats.classList.add('bg-white/10', 'text-white', 'hover:bg-white/10');
  } else {
    panelNews.classList.add('hidden');
    panelNews.classList.remove('flex');
    panelCats.classList.remove('hidden');
    panelCats.classList.add('flex');
    btnCats.classList.add('bg-primary-600', 'text-white', 'shadow');
    btnCats.classList.remove('bg-white/10', 'text-white', 'hover:bg-white/10');
    btnNews.classList.remove('bg-primary-600', 'text-white', 'shadow');
    btnNews.classList.add('bg-white/10', 'text-white', 'hover:bg-white/10');
  }
};



window.openCategoryModal = () => {
  const modal = document.getElementById('cat-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeCategoryModal = () => {
  const modal = document.getElementById('cat-modal');
  if (modal) modal.classList.add('hidden');
};




window.deleteCategory = (id, name) => {
  showConfirm('Eliminar Categoría', `¿Eliminar la categoría "${name}"?`, async () => {
    const res = await fetchWithAuth(`/api/categories/${id}`, { method: 'DELETE' });
    if (res && res.ok) { showAlert('Categoría eliminada', 'success'); if (window.catsTable) window.catsTable.refresh(); }
    else showAlert('Error al eliminar', 'error');
  });
};

// Se ejecutará después de renderizar la vista (cuando hagamos clic en el sidebar o recarguemos la vista)
// Pero como renderNewsView reemplaza el HTML, debemos atar el submit form en un lugar seguro.
if (!window.hasNewsSubmitListener) {
  window.hasNewsSubmitListener = true;
  document.addEventListener('submit', async (e) => {
    if (e.target.id === 'cat-form') {
      e.preventDefault();
      const input = document.getElementById('new-cat-input-modal');
      const name = input ? input.value.trim() : '';
      if (!name) { showAlert('Escribe el nombre de la categoría', 'error'); return; }

      const btn = e.target.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Guardando...';

      try {
        const res = await fetchWithAuth('/api/categories/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name })
        });

        if (res && res.ok) {
          input.value = '';
          showAlert('Categoría creada', 'success');
          closeCategoryModal();
          if (window.catsTable) window.catsTable.refresh();
        } else {
          const err = await res.json();
          showAlert(err.detail || 'Error al crear categoría', 'error');
        }
      } catch (err) {
        showAlert('Error de conexión', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    }
  });
}

function renderUsersView(container) {
  container.innerHTML = `
    <header data-aos="fade-down" data-aos-duration="500" class="glass-card-admin h-auto min-h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-3 gap-3">
      <h1 class="text-xl font-heading font-black text-white">Gestión de Usuarios</h1>
      
      <div class="flex items-center gap-2 flex-wrap">
        <button id="btn-tab-users" onclick="switchUsersTab('users')" class="px-4 py-2 rounded-lg text-sm font-bold transition-all bg-primary-600 text-white shadow">Usuarios</button>
        <button id="btn-tab-roles" onclick="switchUsersTab('roles')" class="px-4 py-2 rounded-lg text-sm font-bold transition-all bg-white/10 text-white hover:bg-white/10">Tipos de Usuario</button>
      </div>
    </header>
    <div class="flex-1 p-4 md:p-8 overflow-y-auto w-full flex justify-center">
      <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="100" class="w-[95%] md:w-[90%] max-w-7xl relative">
        <div id="tab-panel-users" class="glass-card-admin overflow-hidden w-full flex flex-col h-[600px] max-h-[80vh]"></div>
        <div id="tab-panel-roles" class="hidden flex-col h-[600px] max-h-[80vh] w-full glass-card-admin overflow-hidden relative"></div>
      </div>
    </div>
    
    <!-- Modal Nuevo/Editar Usuario -->
    <div id="user-modal" class="fixed inset-0 z-[100] hidden bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div class="min-h-screen px-4 flex items-center justify-center py-8">
        <div class="relative w-full max-w-lg glass-card-admin rounded-2xl text-left flex flex-col">
          <div class="px-5 py-4 border-b border-white/5 flex justify-between items-center">
            <h3 id="user-modal-title" class="text-lg font-bold text-white">Nuevo Usuario</h3>
            <button onclick="closeUserModal()" class="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div class="p-5">
            <form id="user-form" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nombre *</label>
                  <input type="text" id="user-first-name" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Apellido *</label>
                  <input type="text" id="user-last-name" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40">
                </div>
              </div>
              
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Usuario *</label>
                <input type="text" id="user-username" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40">
              </div>
              
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Correo *</label>
                <input type="email" id="user-email" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40">
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Rol *</label>
                <select id="user-role" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all cursor-pointer" style="color-scheme: dark;">
                  <option value="" disabled selected class="bg-neutral-900 text-slate-400">Cargando roles...</option>
                </select>
              </div>

              <div>
                <label id="user-password-label" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Contraseña *</label>
                <input type="password" id="user-password" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="••••••••">
                <p id="user-password-hint" class="text-xs text-slate-500 mt-1 hidden">Déjalo en blanco para mantener la contraseña actual.</p>
              </div>

              <div class="pt-2">
                <label class="flex items-center gap-2.5 cursor-pointer select-none">
                  <input type="checkbox" id="user-active" checked class="w-4 h-4 rounded border-white/5 bg-white/10 text-info-500 focus:ring-info-500 focus:ring-offset-slate-900">
                  <span class="text-sm text-slate-300 font-medium">Usuario Activo</span>
                </label>
              </div>

              <div class="flex justify-end gap-3 pt-4 border-t border-white/5 mt-2">
                <button type="button" onclick="closeUserModal()" class="px-4 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">Cancelar</button>
                <button type="submit" id="user-submit-btn" class="px-5 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal Nuevo/Editar Rol -->
    <div id="role-modal" class="fixed inset-0 z-[100] hidden bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div class="min-h-screen px-4 flex items-center justify-center py-8">
        <div class="relative w-full max-w-lg glass-card-admin rounded-2xl text-left flex flex-col">
          <div class="px-5 py-4 border-b border-white/5 flex justify-between items-center">
            <h3 id="role-modal-title" class="text-lg font-bold text-white">Nuevo Rol</h3>
            <button onclick="closeRoleModal()" class="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div class="p-5">
            <form id="role-form" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nombre del Rol *</label>
                <input type="text" id="role-name" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40">
              </div>
              
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Descripción</label>
                <textarea id="role-description" rows="3" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all resize-none placeholder-white/40"></textarea>
              </div>

              <div class="flex justify-end gap-3 pt-4 border-t border-white/5 mt-2">
                <button type="button" onclick="closeRoleModal()" class="px-4 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">Cancelar</button>
                <button type="submit" id="role-submit-btn" class="px-5 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  if (!window.usersTable) {
    window.usersTable = new TablasCrud({
      containerId: 'tab-panel-users',
      entityName: 'users',
      searchPlaceholder: 'Buscar usuarios...',
      addButtonHtml: '<button onclick="openUserModal()" class="bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_4px_20px_rgba(6,182,212,0.35)] whitespace-nowrap">+ Nuevo Usuario</button>',
      columnsHtml: `
        <th class="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Nombre</th>
        <th class="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider hidden sm:table-cell">Usuario</th>
        <th class="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider hidden md:table-cell">Correo</th>
        <th class="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Estado</th>
        <th class="px-6 py-4 text-right text-xs font-bold text-slate-300 uppercase tracking-wider">Acciones</th>
      `,
      fetchData: async () => {
        const res = await fetchWithAuth('/api/users/');
        return res && res.ok ? await res.json() : [];
      },
      filterFn: (u, q) =>
        u.first_name.toLowerCase().includes(q) ||
        u.last_name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
      renderRow: (item) => {
        const roleName = item.role ? item.role.name : 'N/A';
        const statusBadge = item.is_active
          ? '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100/10 text-green-400 border border-green-500/20">Activo</span>'
          : '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100/10 text-red-400 border border-red-500/20">Inactivo</span>';

        return `
          <tr class="hover:bg-white/10 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-8 w-8 rounded-full bg-gradient-to-tr from-info-600 to-info-400 flex items-center justify-center text-white font-bold border border-white/5 shadow-inner flex-shrink-0">
                  ${item.first_name.charAt(0)}${item.last_name.charAt(0)}
                </div>
                <div class="ml-3">
                  <p class="text-sm font-bold text-white">${item.first_name} ${item.last_name}</p>
                  <p class="text-xs text-brand-accent capitalize">${roleName}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-300 hidden sm:table-cell">${item.username}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-400 hidden md:table-cell">${item.email}</td>
            <td class="px-6 py-4 whitespace-nowrap">${statusBadge}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
              <div class="flex items-center justify-end gap-2">
                <button title="Editar usuario" onclick='openUserModal(${JSON.stringify(item).replace(/'/g, "&#39;")})'
                  class="p-1.5 rounded-lg bg-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
                <button title="Eliminar usuario" onclick="deleteUser(${item.id}, '${item.username.replace(/'/g, "\\'")}')"
                  class="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }
    });
  } else {
    window.usersTable.container = document.getElementById('tab-panel-users');
  }
  window.usersTable.init();

  if (!window.rolesTable) {
    window.rolesTable = new TablasCrud({
      containerId: 'tab-panel-roles',
      entityName: 'roles',
      searchPlaceholder: 'Buscar roles...',
      addButtonHtml: '<button onclick="openRoleModal()" class="bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_4px_20px_rgba(6,182,212,0.35)] whitespace-nowrap">+ Nuevo Rol</button>',
      columnsHtml: `
        <th class="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Nombre del Rol</th>
        <th class="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider hidden sm:table-cell">Descripción</th>
        <th class="px-6 py-4 text-right text-xs font-bold text-slate-300 uppercase tracking-wider">Acciones</th>
      `,
      fetchData: async () => {
        const res = await fetchWithAuth('/api/roles/');
        return res && res.ok ? await res.json() : [];
      },
      filterFn: (r, q) =>
        r.name.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q)),
      onDataLoaded: (roles) => {
        const roleSelect = document.getElementById('user-role');
        if (roleSelect) {
          roleSelect.innerHTML = '<option value="" disabled selected class="bg-neutral-900 text-slate-400">Seleccionar rol...</option>';
          roles.forEach(r => {
            roleSelect.innerHTML += `<option value="${r.id}" class="bg-neutral-900 text-white">${r.name}</option>`;
          });
        }
      },
      renderRow: (item) => {
        return `
          <tr class="hover:bg-white/10 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-white capitalize">${item.name}</td>
            <td class="px-6 py-4 text-sm text-slate-300 hidden sm:table-cell">${item.description || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
              <div class="flex items-center justify-end gap-2">
                <button title="Editar rol" onclick='openRoleModal(${JSON.stringify(item).replace(/'/g, "&#39;")})'
                  class="p-1.5 rounded-lg bg-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
                <button title="Eliminar rol" onclick="deleteRole(${item.id}, '${item.name.replace(/'/g, "\\'")}')"
                  class="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all ${item.name === 'admin' ? 'opacity-50 cursor-not-allowed' : ''}">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }
    });
  } else {
    window.rolesTable.container = document.getElementById('tab-panel-roles');
  }
  window.rolesTable.init();

  setupUserAndRoleModals();
}

window.switchUsersTab = (tab) => {
  const panelUsers = document.getElementById('tab-panel-users');
  const panelRoles = document.getElementById('tab-panel-roles');
  const btnUsers = document.getElementById('btn-tab-users');
  const btnRoles = document.getElementById('btn-tab-roles');

  if (!panelUsers || !panelRoles) return;

  if (tab === 'users') {
    panelUsers.classList.remove('hidden');
    panelUsers.classList.add('flex');
    panelRoles.classList.add('hidden');
    panelRoles.classList.remove('flex');
    btnUsers.classList.add('bg-primary-600', 'text-white', 'shadow');
    btnUsers.classList.remove('bg-white/10', 'text-white', 'hover:bg-white/10');
    btnRoles.classList.remove('bg-primary-600', 'text-white', 'shadow');
    btnRoles.classList.add('bg-white/10', 'text-white', 'hover:bg-white/10');
  } else {
    panelUsers.classList.add('hidden');
    panelUsers.classList.remove('flex');
    panelRoles.classList.remove('hidden');
    panelRoles.classList.add('flex');
    btnRoles.classList.add('bg-primary-600', 'text-white', 'shadow');
    btnRoles.classList.remove('bg-white/10', 'text-white', 'hover:bg-white/10');
    btnUsers.classList.remove('bg-primary-600', 'text-white', 'shadow');
    btnUsers.classList.add('bg-white/10', 'text-white', 'hover:bg-white/10');
  }
};

window.currentEditingUserId = null;
window.currentEditingRoleId = null;

window.openUserModal = async (user = null) => {
  const modal = document.getElementById('user-modal');
  if (!modal) return;

  // Cargar roles si no están cargados
  const roleSelect = document.getElementById('user-role');
  if (roleSelect && roleSelect.options.length <= 1) {
    try {
      const res = await fetchWithAuth('/api/roles/');
      if (res && res.ok) {
        const roles = await res.json();
        roleSelect.innerHTML = '<option value="" disabled selected class="bg-neutral-900 text-slate-400">Seleccionar rol...</option>';
        roles.forEach(r => {
          roleSelect.innerHTML += `<option value="${r.id}" class="bg-neutral-900 text-white">${r.name}</option>`;
        });
      }
    } catch (e) {
      console.error("Error cargando roles en modal de usuario:", e);
    }
  }

  modal.classList.remove('hidden');

  if (user) {
    window.currentEditingUserId = user.id;
    document.getElementById('user-modal-title').innerText = 'Editar Usuario';
    document.getElementById('user-first-name').value = user.first_name;
    document.getElementById('user-last-name').value = user.last_name;
    document.getElementById('user-username').value = user.username;
    document.getElementById('user-email').value = user.email;
    document.getElementById('user-role').value = user.role?.id || '';
    document.getElementById('user-active').checked = user.is_active;
    document.getElementById('user-password').required = false;
    document.getElementById('user-password-hint').classList.remove('hidden');
  } else {
    window.currentEditingUserId = null;
    document.getElementById('user-modal-title').innerText = 'Nuevo Usuario';
    document.getElementById('user-form').reset();
    document.getElementById('user-active').checked = true;
    document.getElementById('user-password').required = true;
    document.getElementById('user-password-hint').classList.add('hidden');
  }
};

window.closeUserModal = () => {
  const modal = document.getElementById('user-modal');
  if (modal) modal.classList.add('hidden');
  window.currentEditingUserId = null;
};

window.openRoleModal = (role = null) => {
  const modal = document.getElementById('role-modal');
  if (!modal) return;
  modal.classList.remove('hidden');

  if (role) {
    window.currentEditingRoleId = role.id;
    document.getElementById('role-modal-title').innerText = 'Editar Rol';
    document.getElementById('role-name').value = role.name;
    document.getElementById('role-description').value = role.description || '';
  } else {
    window.currentEditingRoleId = null;
    document.getElementById('role-modal-title').innerText = 'Nuevo Rol';
    document.getElementById('role-form').reset();
  }
};

window.closeRoleModal = () => {
  const modal = document.getElementById('role-modal');
  if (modal) modal.classList.add('hidden');
  window.currentEditingRoleId = null;
};

window.deleteUser = (id, username) => {
  showConfirm('Eliminar Usuario', `¿Estás seguro de eliminar al usuario @${username}?`, async () => {
    const res = await fetchWithAuth(`/api/users/${id}`, { method: 'DELETE' });
    if (res && res.ok) {
      showAlert('Usuario eliminado correctamente', 'success');
      if (window.usersTable) window.usersTable.refresh();
    } else {
      const err = await res.json();
      showAlert(err.detail || 'Error al eliminar usuario', 'error');
    }
  });
};

window.deleteRole = (id, name) => {
  if (name === 'admin') {
    showAlert('No se puede eliminar el rol admin', 'error');
    return;
  }
  showConfirm('Eliminar Rol', `¿Estás seguro de eliminar el rol ${name}?`, async () => {
    const res = await fetchWithAuth(`/api/roles/${id}`, { method: 'DELETE' });
    if (res && res.ok) {
      showAlert('Rol eliminado correctamente', 'success');
      if (window.rolesTable) window.rolesTable.refresh();
    } else {
      const err = await res.json();
      showAlert(err.detail || 'Error al eliminar rol', 'error');
    }
  });
};

window.setupUserAndRoleModals = () => {
  document.body.addEventListener('submit', async (e) => {
    if (e.target.id === 'user-form') {
      e.preventDefault();

      const btn = document.getElementById('user-submit-btn');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Guardando...';

      try {
        const payload = {
          first_name: document.getElementById('user-first-name').value,
          last_name: document.getElementById('user-last-name').value,
          username: document.getElementById('user-username').value,
          email: document.getElementById('user-email').value,
          role_id: parseInt(document.getElementById('user-role').value),
          is_active: document.getElementById('user-active').checked
        };

        const pwd = document.getElementById('user-password').value;
        if (pwd) payload.password = pwd;
        else if (!window.currentEditingUserId) {
          throw new Error('La contraseña es obligatoria para usuarios nuevos');
        }

        let url = '/api/users/';
        let method = 'POST';

        if (window.currentEditingUserId) {
          url = `/api/users/${window.currentEditingUserId}`;
          method = 'PUT';
        }

        const res = await fetchWithAuth(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || 'Error al guardar usuario');
        }

        showAlert(window.currentEditingUserId ? 'Usuario actualizado' : 'Usuario creado', 'success');
        closeUserModal();
        if (window.usersTable) window.usersTable.refresh();
      } catch (err) {
        showAlert(err.message, 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    }

    if (e.target.id === 'role-form') {
      e.preventDefault();

      const btn = document.getElementById('role-submit-btn');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Guardando...';

      try {
        const payload = {
          name: document.getElementById('role-name').value,
          description: document.getElementById('role-description').value
        };

        let url = '/api/roles/';
        let method = 'POST';

        if (window.currentEditingRoleId) {
          url = `/api/roles/${window.currentEditingRoleId}`;
          method = 'PUT';
        }

        const res = await fetchWithAuth(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || 'Error al guardar rol');
        }

        showAlert(window.currentEditingRoleId ? 'Rol actualizado' : 'Rol creado', 'success');
        closeRoleModal();
        if (window.rolesTable) window.rolesTable.refresh();
      } catch (err) {
        showAlert(err.message, 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    }
  });
}

window.deleteNoticia = (id, titulo) => {
  showConfirm('Eliminar Noticia', `¿Estás seguro que deseas eliminar la noticia "${titulo}"? Esta acción no se puede deshacer.`, async () => {
    const res = await fetchWithAuth(`/api/noticias/${id}`, { method: 'DELETE' });
    if (res && res.ok) { showAlert('Noticia eliminada', 'success'); if (window.newsTable) window.newsTable.refresh(); }
    else showAlert('Error al eliminar la noticia', 'error');
  });
};


