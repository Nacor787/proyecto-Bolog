// ManageCoverage.js — Gestión de Rutas de Cobertura desde el panel de administración
import { fetchWithAuth } from '../../utils/api.js';
import { showAlert, showConfirm } from '../../components/UI.js';

const REGION_ICONS = {
  asia: '🌏', eu: '🌍', na: '🌎', sa: '🌎', africa: '🌍', oceania: '🌏', me: '🌍'
};

export async function renderManageCoverage(container) {
  container.innerHTML = `
    <header class="glass-card-admin h-auto min-h-16 flex items-center justify-between px-6 py-3 gap-3">

      <button id="btn-add-route" class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Nueva Ruta
      </button>
    </header>

    <div class="w-full p-4 md:p-8">
      <div class="max-w-6xl mx-auto">
        <p class="text-slate-400 text-sm mb-6">
          Administra las rutas de cobertura. Cada ruta pertenece a una <strong class="text-sky-400">región</strong> que se convierte en un filtro en el mapa. Las coordenadas (<strong>lat / lng destino</strong>) marcan el punto de llegada del arco en el globo 3D.
        </p>
        <div id="routes-admin-list" class="space-y-3">
          <div class="text-slate-500 text-sm flex items-center gap-2 py-8 justify-center">
            <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Cargando rutas...
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Ruta -->
    <div id="route-modal" class="fixed inset-0 z-[100] hidden bg-black/70 backdrop-blur-sm overflow-y-auto" data-lenis-prevent>
      <div class="min-h-screen px-4 flex items-center justify-center py-8">
        <div class="relative w-full max-w-2xl glass-card-admin rounded-2xl text-left flex flex-col max-h-[calc(100vh-4rem)]">
          <div class="px-5 py-4 border-b border-white/5 flex justify-between items-center shrink-0">
            <h3 id="route-modal-title" class="text-lg font-bold text-white">Nueva Ruta</h3>
            <button id="close-route-modal" class="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="p-5 overflow-y-auto flex-1 min-h-0 custom-scrollbar" data-lenis-prevent>
            <form id="route-form" class="space-y-4">
              <input type="hidden" id="route-id">
              <!-- SECCIÓN 1: FILTROS DE RUTAS -->
              <div class="glass-card-admin rounded-2xl p-5 space-y-4 border border-white/5">
                <h4 class="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                  Filtros de Rutas
                </h4>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Región ID *</label>
                    <input type="text" id="route-region" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="ej: asia, eu, na, sa">
                    <p class="text-[10px] text-slate-500 mt-1">Clave interna sin espacios ni tildes</p>
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Orden</label>
                    <input type="number" id="route-orden" value="0" min="0" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all">
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Etiqueta Región (ES) *</label>
                    <input type="text" id="route-region-label-es" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Asia — Pacífico">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Etiqueta Región (EN) *</label>
                    <input type="text" id="route-region-label-en" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Asia — Pacific">
                  </div>
                </div>

                <div class="flex items-center gap-3 pt-2">
                  <input type="checkbox" id="route-activo" checked class="w-4 h-4 rounded bg-white/10 border border-white/20 text-sky-500">
                  <label for="route-activo" class="text-sm font-medium text-slate-300">Activa (visible en el mapa)</label>
                </div>
              </div>

              <!-- SECCIÓN 2: TARJETA DE FILTROS -->
              <div class="glass-card-admin rounded-2xl p-5 space-y-4 border border-white/5">
                <h4 class="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/></svg>
                  Tarjeta de Filtros
                </h4>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Título (ES) *</label>
                    <input type="text" id="route-titulo-es" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Ruta Asia Pacífico">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Título (EN) *</label>
                    <input type="text" id="route-titulo-en" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Asia Pacific Route">
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tipo de Transporte (ES)</label>
                    <input type="text" id="route-tipo-es" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Marítimo FCL/LCL">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tipo de Transporte (EN)</label>
                    <input type="text" id="route-tipo-en" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Maritime FCL/LCL">
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tiempo de Tránsito</label>
                    <input type="text" id="route-transito" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="28 - 32 Días">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Frecuencia (ES)</label>
                    <input type="text" id="route-freq-es" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Semanal">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Frecuencia (EN)</label>
                    <input type="text" id="route-freq-en" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Weekly">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Puerto de Ingreso</label>
                  <input type="text" id="route-puerto" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Arica (CL) / Callao (PE)">
                </div>

                <div class="bg-sky-500/5 border border-sky-500/20 rounded-xl p-4 mt-2">
                  <p class="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Coordenadas del Globo 3D (Destino)
                  </p>
                  <p class="text-[10px] text-slate-500 mb-3">Bolivia (-16.5, -68.1) es el origen fijo. Define la latitud y longitud del punto de destino para que el arco del globo 3D sea correcto.</p>
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Coordenadas (Pegar de Google Maps)</label>
                    <input type="text" id="route-coords" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40 focus:ring-1 focus:ring-sky-500" placeholder="Ej: 36.296749, 140.604927">
                  </div>
                </div>
              </div>
              <div class="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button type="button" id="cancel-route-btn" class="px-4 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">Cancelar</button>
                <button type="submit" class="px-5 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  await loadRoutes();
  setupRouteEvents();
}

async function loadRoutes() {
  const list = document.getElementById('routes-admin-list');
  if (!list) return;
  try {
    const res = await fetchWithAuth('/api/cobertura/todas');
    if (!res || !res.ok) throw new Error();
    const rutas = await res.json();
    if (!rutas.length) {
      list.innerHTML = `<div class="text-center text-slate-500 py-12">No hay rutas. Haz clic en "Nueva Ruta" para agregar.</div>`;
      return;
    }
    list.innerHTML = rutas.map(r => `
      <div class="glass-card-admin rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3" data-route-id="${r.id}">
        <div class="flex items-center gap-3">
          <span class="text-2xl">${REGION_ICONS[r.region] || '🌐'}</span>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-bold text-white">${r.titulo_es}</h4>
              <span class="text-[9px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400">${r.region.toUpperCase()}</span>
              <span class="text-[9px] px-2 py-0.5 rounded-full ${r.activo ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}">${r.activo ? 'Activa' : 'Inactiva'}</span>
            </div>
            <p class="text-xs text-slate-400">${r.titulo_en} · ${r.tiempo_transito || '-'} · ${r.puerto_entrada || '-'}</p>
            ${r.lat_destino ? `<p class="text-[10px] text-slate-500">Coords: ${r.lat_destino}, ${r.lng_destino}</p>` : ''}
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button class="btn-edit-route px-3 py-1.5 bg-white/10 hover:bg-sky-600 text-slate-300 hover:text-white text-xs font-bold rounded-lg transition-all" data-route='${JSON.stringify(r)}'>Editar</button>
          <button class="btn-delete-route px-3 py-1.5 bg-white/5 hover:bg-red-600/80 text-slate-400 hover:text-white text-xs font-bold rounded-lg transition-all" data-id="${r.id}" data-titulo="${r.titulo_es}">Eliminar</button>
        </div>
      </div>
    `).join('');
  } catch {
    list.innerHTML = `<div class="text-center text-red-400 py-12">Error al cargar rutas.</div>`;
  }
}

function fillModal(r = null) {
  document.getElementById('route-modal-title').textContent = r ? 'Editar Ruta' : 'Nueva Ruta';
  document.getElementById('route-id').value = r?.id || '';
  document.getElementById('route-region').value = r?.region || '';
  document.getElementById('route-region-label-es').value = r?.region_label_es || '';
  document.getElementById('route-region-label-en').value = r?.region_label_en || '';
  document.getElementById('route-titulo-es').value = r?.titulo_es || '';
  document.getElementById('route-titulo-en').value = r?.titulo_en || '';
  document.getElementById('route-tipo-es').value = r?.tipo_transporte_es || '';
  document.getElementById('route-tipo-en').value = r?.tipo_transporte_en || '';
  document.getElementById('route-transito').value = r?.tiempo_transito || '';
  document.getElementById('route-freq-es').value = r?.frecuencia_es || '';
  document.getElementById('route-freq-en').value = r?.frecuencia_en || '';
  document.getElementById('route-puerto').value = r?.puerto_entrada || '';
  document.getElementById('route-coords').value = (r && r.lat_destino !== null && r.lng_destino !== null) ? `${r.lat_destino}, ${r.lng_destino}` : '';
  document.getElementById('route-orden').value = r?.orden ?? 0;
  document.getElementById('route-activo').checked = r ? !!r.activo : true;
  document.getElementById('route-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('route-modal').classList.add('hidden');
}

function setupRouteEvents() {
  document.getElementById('btn-add-route')?.addEventListener('click', () => fillModal());
  document.getElementById('close-route-modal')?.addEventListener('click', closeModal);
  document.getElementById('cancel-route-btn')?.addEventListener('click', closeModal);

  document.getElementById('route-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('route-id').value;
    const coordsRaw = document.getElementById('route-coords').value;
    let lat_destino = null, lng_destino = null;
    if (coordsRaw.trim()) {
      const matches = coordsRaw.match(/-?\d+\.\d+|-?\d+/g);
      if (matches && matches.length >= 2) {
        lat_destino = parseFloat(matches[0]);
        lng_destino = parseFloat(matches[1]);
      } else {
        showAlert('Formato de coordenadas inválido. Pega las coordenadas directamente desde Google Maps.', 'error');
        return;
      }
    }

    const body = {
      region: document.getElementById('route-region').value.trim().toLowerCase().replace(/\s+/g, '_'),
      region_label_es: document.getElementById('route-region-label-es').value.trim(),
      region_label_en: document.getElementById('route-region-label-en').value.trim(),
      titulo_es: document.getElementById('route-titulo-es').value.trim(),
      titulo_en: document.getElementById('route-titulo-en').value.trim(),
      tipo_transporte_es: document.getElementById('route-tipo-es').value.trim() || null,
      tipo_transporte_en: document.getElementById('route-tipo-en').value.trim() || null,
      tiempo_transito: document.getElementById('route-transito').value.trim() || null,
      frecuencia_es: document.getElementById('route-freq-es').value.trim() || null,
      frecuencia_en: document.getElementById('route-freq-en').value.trim() || null,
      puerto_entrada: document.getElementById('route-puerto').value.trim() || null,
      lat_destino,
      lng_destino,
      orden: parseInt(document.getElementById('route-orden').value) || 0,
      activo: document.getElementById('route-activo').checked,
    };
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/api/cobertura/${id}` : '/api/cobertura/';
      const res = await fetchWithAuth(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res || !res.ok) throw new Error();
      showAlert(id ? 'Ruta actualizada.' : 'Ruta creada correctamente.', 'success');
      closeModal();
      await loadRoutes();
    } catch {
      showAlert('Error al guardar la ruta.', 'error');
    }
  });

  document.getElementById('routes-admin-list')?.addEventListener('click', async (e) => {
    const editBtn = e.target.closest('.btn-edit-route');
    const deleteBtn = e.target.closest('.btn-delete-route');
    if (editBtn) {
      try { fillModal(JSON.parse(editBtn.dataset.route)); } catch {}
    }
    if (deleteBtn) {
      const confirmed = await showConfirm(`¿Eliminar la ruta "${deleteBtn.dataset.titulo}"?`);
      if (!confirmed) return;
      try {
        const res = await fetchWithAuth(`/api/cobertura/${deleteBtn.dataset.id}`, { method: 'DELETE' });
        if (!res || !res.ok) throw new Error();
        showAlert('Ruta eliminada.', 'success');
        await loadRoutes();
      } catch {
        showAlert('Error al eliminar la ruta.', 'error');
      }
    }
  });
}
