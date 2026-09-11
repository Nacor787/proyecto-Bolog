// ManageLocations.js — Gestión de Ubicaciones / Sucursales desde el panel de administración
import { fetchWithAuth } from '../../utils/api.js';
import { showAlert, showConfirm } from '../../components/UI.js';

export async function renderManageLocations(container) {
  container.innerHTML = `
    <header class="glass-card-admin h-auto min-h-16 flex items-center justify-between px-6 py-3 gap-3">

      <button id="btn-add-location" class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Nueva Ubicación
      </button>
    </header>

    <div class="w-full p-4 md:p-8">
      <div class="max-w-5xl mx-auto">
        <p class="text-slate-400 text-sm mb-6">Puedes tener múltiples sucursales. La marcada como <strong class="text-sky-400">Sede Central</strong> aparecerá seleccionada por defecto en la web.</p>
        <div id="locations-admin-list" class="space-y-4">
          <div class="text-slate-500 text-sm flex items-center gap-2 py-12 justify-center">
            <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Cargando ubicaciones...
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Ubicación -->
    <div id="location-modal" class="fixed inset-0 z-[100] hidden bg-black/70 backdrop-blur-sm overflow-y-auto" data-lenis-prevent>
      <div class="min-h-screen px-4 flex items-center justify-center py-8">
        <div class="relative w-full max-w-2xl glass-card-admin rounded-2xl text-left flex flex-col max-h-[calc(100vh-4rem)]">
          <div class="px-5 py-4 border-b border-white/5 flex justify-between items-center shrink-0">
            <h3 id="loc-modal-title" class="text-lg font-bold text-white">Nueva Ubicación</h3>
            <button id="close-location-modal" class="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="p-5 overflow-y-auto flex-1 min-h-0 custom-scrollbar" data-lenis-prevent>
            <form id="location-form" class="space-y-0">
              <input type="hidden" id="loc-id">

              <!-- Tabs Nav -->
              <div class="flex border-b border-white/10 mb-4 gap-2">
                <button type="button" class="loc-tab-btn active px-4 py-2 text-sky-400 font-bold border-b-2 border-sky-400 text-sm transition-colors" data-target="loc-tab-tarjeta">Tarjeta (Info)</button>
                <button type="button" class="loc-tab-btn px-4 py-2 text-slate-400 hover:text-white font-bold border-b-2 border-transparent text-sm transition-colors" data-target="loc-tab-mapa">Mapa (Links)</button>
              </div>

              <!-- Tab Tarjeta -->
              <div id="loc-tab-tarjeta" class="loc-tab-panel space-y-4 block animate-fade-in pt-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nombre de la Sede (ES) *</label>
                    <input type="text" id="loc-nombre-es" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Sede Central">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Name (EN) *</label>
                    <input type="text" id="loc-nombre-en" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Headquarters">
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Ciudad (ES) *</label>
                    <input type="text" id="loc-ciudad-es" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="La Paz, Bolivia">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">City (EN) *</label>
                    <input type="text" id="loc-ciudad-en" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="La Paz, Bolivia">
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Dirección (ES)</label>
                    <textarea id="loc-direccion-es" rows="2" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Calle Capitán Ravelo Nro 267..."></textarea>
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Address (EN)</label>
                    <textarea id="loc-direccion-en" rows="2" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Captain Ravelo St. No. 267..."></textarea>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Horarios (ES)</label>
                    <input type="text" id="loc-horarios-es" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Lunes a Viernes, 8:30 - 17:00">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Hours (EN)</label>
                    <input type="text" id="loc-horarios-en" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Monday to Friday, 8:30 - 17:00">
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Teléfonos</label>
                    <input type="text" id="loc-telefonos" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="2 2147305 – 2 2147384">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
                    <input type="email" id="loc-email" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="info@blg.com.bo">
                  </div>
                </div>

                <div class="flex flex-col gap-2 pt-2 mt-2">
                  <div class="flex items-center gap-3">
                    <input type="checkbox" id="loc-sede" class="w-4 h-4 rounded bg-white/10 border border-white/20 text-sky-500">
                    <label for="loc-sede" class="text-sm font-medium text-slate-300">Es Sede Central (aparece seleccionada por defecto)</label>
                  </div>
                  <div class="flex items-center gap-3">
                    <input type="checkbox" id="loc-activa" checked class="w-4 h-4 rounded bg-white/10 border border-white/20 text-sky-500">
                    <label for="loc-activa" class="text-sm font-medium text-slate-300">Activa (visible en la web)</label>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Orden</label>
                    <input type="number" id="loc-orden" value="0" min="0" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all">
                  </div>
                </div>
              </div>

              <!-- Tab Mapa -->
              <div id="loc-tab-mapa" class="loc-tab-panel space-y-6 hidden animate-fade-in pt-4">
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Botón "Abrir en Google Maps"</label>
                  <input type="url" id="loc-mapa-link" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="https://www.google.com/maps/place/...">
                  <p class="text-[10px] text-slate-500 mt-1">El link largo de Google Maps para el botón "Abrir en Google Maps"</p>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">URL del Iframe (Embed) de Google Maps</label>
                  <textarea id="loc-mapa-url" rows="3" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="https://maps.google.com/maps?q=...&output=embed"></textarea>
                  <p class="text-[10px] text-slate-500 mt-1">En Google Maps: Compartir → Insertar mapa → copia solo el valor del atributo src="..."</p>
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-4 border-t border-white/5 mt-4">
                <button type="button" id="cancel-location-btn" class="px-4 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">Cancelar</button>
                <button type="submit" class="px-5 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  await loadLocations();
  setupLocationEvents();
}

async function loadLocations() {
  const list = document.getElementById('locations-admin-list');
  if (!list) return;
  try {
    const res = await fetchWithAuth('/api/ubicaciones/todas');
    if (!res || !res.ok) throw new Error();
    const ubicaciones = await res.json();
    if (!ubicaciones.length) {
      list.innerHTML = `<div class="text-center text-slate-500 py-12">No hay ubicaciones. Haz clic en "Nueva Ubicación" para agregar.</div>`;
      return;
    }
    list.innerHTML = ubicaciones.map(u => `
      <div class="glass-card-admin rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="text-base font-bold text-white">${u.nombre_es}</h4>
              ${u.es_sede_central ? '<span class="text-[9px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-bold">Sede Central</span>' : ''}
              <span class="text-[9px] px-2 py-0.5 rounded-full ${u.activo ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}">${u.activo ? 'Activa' : 'Inactiva'}</span>
            </div>
            <p class="text-xs text-slate-400 mt-1">${u.ciudad_es} · ${u.telefonos || '-'}</p>
            <p class="text-xs text-slate-500 mt-0.5">${u.direccion_es || ''}</p>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button class="btn-edit-location px-3 py-1.5 bg-white/10 hover:bg-sky-600 text-slate-300 hover:text-white text-xs font-bold rounded-lg transition-all" data-loc='${JSON.stringify(u)}'>Editar</button>
          <button class="btn-delete-location px-3 py-1.5 bg-white/5 hover:bg-red-600/80 text-slate-400 hover:text-white text-xs font-bold rounded-lg transition-all" data-id="${u.id}" data-nombre="${u.nombre_es}">Eliminar</button>
        </div>
      </div>
    `).join('');
  } catch {
    list.innerHTML = `<div class="text-center text-red-400 py-12">Error al cargar ubicaciones.</div>`;
  }
}

function fillModal(u = null) {
  // Reset tabs to Tarjeta
  const locTabs = document.querySelectorAll('.loc-tab-btn');
  const locPanels = document.querySelectorAll('.loc-tab-panel');
  locTabs.forEach((b, i) => {
    if (i === 0) {
      b.classList.add('active', 'text-sky-400', 'border-sky-400');
      b.classList.remove('text-slate-400', 'border-transparent');
    } else {
      b.classList.remove('active', 'text-sky-400', 'border-sky-400');
      b.classList.add('text-slate-400', 'border-transparent');
    }
  });
  locPanels.forEach((p, i) => {
    if (i === 0) p.classList.remove('hidden');
    else p.classList.add('hidden');
  });

  document.getElementById('loc-modal-title').textContent = u ? 'Editar Ubicación' : 'Nueva Ubicación';
  document.getElementById('loc-id').value = u?.id || '';
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val ?? ''; };
  setVal('loc-nombre-es', u?.nombre_es);
  setVal('loc-nombre-en', u?.nombre_en);
  setVal('loc-ciudad-es', u?.ciudad_es);
  setVal('loc-ciudad-en', u?.ciudad_en);
  setVal('loc-direccion-es', u?.direccion_es);
  setVal('loc-direccion-en', u?.direccion_en);
  setVal('loc-horarios-es', u?.horarios_es);
  setVal('loc-horarios-en', u?.horarios_en);
  setVal('loc-telefonos', u?.telefonos);
  setVal('loc-email', u?.email);
  setVal('loc-mapa-link', u?.mapa_link);
  setVal('loc-mapa-url', u?.mapa_url);
  setVal('loc-orden', u?.orden ?? 0);
  document.getElementById('loc-sede').checked = u ? !!u.es_sede_central : false;
  document.getElementById('loc-activa').checked = u ? !!u.activo : true;
  document.getElementById('location-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('location-modal').classList.add('hidden');
}

function setupLocationEvents() {
  document.getElementById('btn-add-location')?.addEventListener('click', () => fillModal());
  document.getElementById('close-location-modal')?.addEventListener('click', closeModal);
  document.getElementById('cancel-location-btn')?.addEventListener('click', closeModal);

  // Tab switching logic
  const locTabs = document.querySelectorAll('.loc-tab-btn');
  const locPanels = document.querySelectorAll('.loc-tab-panel');
  locTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      locTabs.forEach(b => {
        b.classList.remove('active', 'text-sky-400', 'border-sky-400');
        b.classList.add('text-slate-400', 'border-transparent');
      });
      btn.classList.add('active', 'text-sky-400', 'border-sky-400');
      btn.classList.remove('text-slate-400', 'border-transparent');
      
      locPanels.forEach(p => p.classList.add('hidden'));
      const target = document.getElementById(btn.getAttribute('data-target'));
      if (target) target.classList.remove('hidden');
    });
  });

  const mapaUrlInput = document.getElementById('loc-mapa-url');
  if (mapaUrlInput) {
    mapaUrlInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val.toLowerCase().startsWith('<iframe')) {
        const match = val.match(/src=["'](.*?)["']/);
        if (match && match[1]) {
          e.target.value = match[1];
        }
      }
    });
  }

  document.getElementById('location-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('loc-id').value;
    const getVal = (elId) => document.getElementById(elId)?.value?.trim() || null;
    const body = {
      nombre_es: getVal('loc-nombre-es'),
      nombre_en: getVal('loc-nombre-en'),
      ciudad_es: getVal('loc-ciudad-es'),
      ciudad_en: getVal('loc-ciudad-en'),
      direccion_es: getVal('loc-direccion-es'),
      direccion_en: getVal('loc-direccion-en'),
      horarios_es: getVal('loc-horarios-es'),
      horarios_en: getVal('loc-horarios-en'),
      telefonos: getVal('loc-telefonos'),
      email: getVal('loc-email'),
      mapa_link: getVal('loc-mapa-link'),
      mapa_url: getVal('loc-mapa-url'),
      orden: parseInt(document.getElementById('loc-orden').value) || 0,
      es_sede_central: document.getElementById('loc-sede').checked,
      activo: document.getElementById('loc-activa').checked,
    };
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/api/ubicaciones/${id}` : '/api/ubicaciones/';
      const res = await fetchWithAuth(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res || !res.ok) throw new Error();
      showAlert(id ? 'Ubicación actualizada.' : 'Ubicación creada correctamente.', 'success');
      closeModal();
      await loadLocations();
    } catch {
      showAlert('Error al guardar la ubicación.', 'error');
    }
  });

  document.getElementById('locations-admin-list')?.addEventListener('click', async (e) => {
    const editBtn = e.target.closest('.btn-edit-location');
    const deleteBtn = e.target.closest('.btn-delete-location');
    if (editBtn) {
      try { fillModal(JSON.parse(editBtn.dataset.loc)); } catch { }
    }
    if (deleteBtn) {
      const confirmed = await showConfirm(`¿Eliminar la ubicación "${deleteBtn.dataset.nombre}"?`);
      if (!confirmed) return;
      try {
        const res = await fetchWithAuth(`/api/ubicaciones/${deleteBtn.dataset.id}`, { method: 'DELETE' });
        if (!res || !res.ok) throw new Error();
        showAlert('Ubicación eliminada.', 'success');
        await loadLocations();
      } catch {
        showAlert('Error al eliminar la ubicación.', 'error');
      }
    }
  });
}
