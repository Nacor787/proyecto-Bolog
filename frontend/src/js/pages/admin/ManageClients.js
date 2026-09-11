// ManageClients.js — Gestión de Clientes con upload directo a Cloudinary
import { fetchWithAuth } from '../../utils/api.js';
import { showAlert, showConfirm } from '../../components/UI.js';
import { uploadImagen, pickFile } from '../../utils/uploadToCloudinary.js';

export async function renderManageClients(container) {
  container.innerHTML = `
    <header class="glass-card-admin h-auto min-h-16 flex items-center justify-between px-6 py-3 gap-3">

      <button id="btn-add-client" class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Nuevo Cliente
      </button>
    </header>

    <div class="w-full p-4 md:p-8">
      <div class="max-w-6xl mx-auto">
        <div id="clients-admin-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          ${skeletonCards(5)}
        </div>
      </div>
    </div>

    <!-- Modal Nuevo/Editar Cliente -->
    <div id="client-modal" class="fixed inset-0 z-[100] hidden bg-black/70 backdrop-blur-sm overflow-y-auto" data-lenis-prevent>
      <div class="min-h-screen px-4 flex items-center justify-center py-8">
        <div class="relative w-full max-w-md glass-card-admin rounded-2xl text-left flex flex-col">
          <div class="px-5 py-4 border-b border-white/5 flex justify-between items-center">
            <h3 id="client-modal-title" class="text-lg font-bold text-white">Nuevo Cliente</h3>
            <button id="close-client-modal" class="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="p-5">
            <form id="client-form" class="space-y-4">
              <input type="hidden" id="client-id" value="">

              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nombre del Cliente *</label>
                <input type="text" id="client-nombre" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Ej. Empresa S.R.L.">
              </div>

              <!-- Logo actual / Preview -->
              <div id="client-logo-preview-wrap" class="hidden">
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Logo Actual</label>
                <div class="bg-white rounded-xl p-3 flex items-center justify-center h-20">
                  <img id="client-logo-preview" src="" alt="Preview" class="max-h-16 max-w-full object-contain">
                </div>
              </div>

              <!-- Upload directo -->
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Logo del Cliente *</label>
                <div class="flex flex-col gap-2">
                  <button type="button" id="btn-upload-logo-modal" class="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-white/20 rounded-xl hover:border-sky-400 hover:bg-sky-500/5 text-slate-400 hover:text-sky-400 text-sm font-semibold transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                    <span id="upload-logo-label">Haz clic para subir imagen</span>
                  </button>
                  <p class="text-[10px] text-slate-500 text-center">PNG, JPG, WebP — Máx. 10MB · Se sube automáticamente a Cloudinary</p>
                  <input type="hidden" id="client-logo-url" value="">
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Orden (posición en el carrusel)</label>
                <input type="number" id="client-orden" value="0" min="0" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all">
              </div>

              <div class="flex items-center gap-3">
                <input type="checkbox" id="client-activo" checked class="w-4 h-4 rounded bg-white/10 border border-white/20 text-sky-500">
                <label for="client-activo" class="text-sm font-medium text-slate-300">Activo (visible en la web)</label>
              </div>

              <div class="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button type="button" id="cancel-client-btn" class="px-4 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">Cancelar</button>
                <button type="submit" id="submit-client-btn" class="px-5 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  await loadClients();
  setupClientEvents();
}

function skeletonCards(n) {
  return Array(n).fill(0).map(() =>
    `<div class="rounded-2xl bg-white/5 animate-pulse h-40"></div>`
  ).join('');
}

async function loadClients() {
  const grid = document.getElementById('clients-admin-grid');
  if (!grid) return;

  try {
    const res = await fetchWithAuth('/api/clientes/todos');
    if (!res || !res.ok) throw new Error('Error cargando clientes');
    const clientes = await res.json();

    if (!clientes.length) {
      grid.innerHTML = `<div class="col-span-full text-center text-slate-500 py-12">No hay clientes aún. Haz clic en "Nuevo Cliente" para agregar uno.</div>`;
      return;
    }

    grid.innerHTML = clientes.map(c => `
      <div class="relative group bg-white rounded-2xl p-4 flex flex-col items-center gap-2 border border-white/10 hover:border-sky-400 shadow hover:shadow-sky-500/20 transition-all" data-id="${c.id}">
        <img src="${c.logo_url}" alt="${c.nombre}" class="h-16 w-full object-contain"
             onerror="this.parentElement.querySelector('.logo-fallback').classList.remove('hidden'); this.classList.add('hidden')">
        <span class="logo-fallback hidden text-2xl font-bold text-slate-400">${c.nombre[0]}</span>
        <p class="text-xs text-slate-700 font-semibold text-center truncate w-full">${c.nombre}</p>
        <span class="text-[9px] px-2 py-0.5 rounded-full ${c.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}">${c.activo ? 'Activo' : 'Inactivo'}</span>
        
        <!-- Acciones hover -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
          <button class="btn-edit-client w-full py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            data-id="${c.id}" data-nombre="${c.nombre}" data-logo="${c.logo_url}" data-orden="${c.orden}" data-activo="${c.activo}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            Editar
          </button>
          <button class="btn-replace-logo w-full py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            data-id="${c.id}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            Cambiar Logo
          </button>
          <button class="btn-delete-client w-full py-1.5 bg-red-600/80 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            data-id="${c.id}" data-nombre="${c.nombre}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            Eliminar
          </button>
        </div>
      </div>
    `).join('');

  } catch (err) {
    grid.innerHTML = `<div class="col-span-full text-center text-red-400 py-12">Error al cargar clientes.</div>`;
  }
}

function openModal(data = null) {
  const modal = document.getElementById('client-modal');
  if (!modal) return;

  document.getElementById('client-modal-title').textContent = data ? 'Editar Cliente' : 'Nuevo Cliente';
  document.getElementById('client-id').value = data?.id || '';
  document.getElementById('client-nombre').value = data?.nombre || '';
  document.getElementById('client-logo-url').value = data?.logo || '';
  document.getElementById('client-orden').value = data?.orden ?? 0;
  document.getElementById('client-activo').checked = data ? !!data.activo : true;
  document.getElementById('upload-logo-label').textContent = 'Haz clic para subir imagen';

  // Mostrar preview del logo actual si existe
  const previewWrap = document.getElementById('client-logo-preview-wrap');
  const previewImg = document.getElementById('client-logo-preview');
  if (data?.logo) {
    previewWrap.classList.remove('hidden');
    previewImg.src = data.logo;
  } else {
    previewWrap.classList.add('hidden');
    previewImg.src = '';
  }

  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('client-modal')?.classList.add('hidden');
}

function setupClientEvents() {
  document.getElementById('btn-add-client')?.addEventListener('click', () => openModal());
  document.getElementById('close-client-modal')?.addEventListener('click', closeModal);
  document.getElementById('cancel-client-btn')?.addEventListener('click', closeModal);

  // Upload de logo dentro del modal
  document.getElementById('btn-upload-logo-modal')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-upload-logo-modal');
    const label = document.getElementById('upload-logo-label');
    try {
      const file = await pickFile('image/*');
      if (!file) return;
      btn.disabled = true;
      label.textContent = 'Subiendo a Cloudinary...';
      btn.classList.add('opacity-60');

      const result = await uploadImagen(file, 'clientes');
      document.getElementById('client-logo-url').value = result.url;

      // Mostrar preview
      const previewWrap = document.getElementById('client-logo-preview-wrap');
      const previewImg = document.getElementById('client-logo-preview');
      previewWrap.classList.remove('hidden');
      previewImg.src = result.url;

      label.textContent = 'Logo subido correctamente — clic para cambiar';
      btn.classList.remove('opacity-60');
      btn.disabled = false;
    } catch (err) {
      label.textContent = 'Error al subir — intenta nuevamente';
      btn.disabled = false;
      btn.classList.remove('opacity-60');
      showAlert(err.message || 'Error al subir el logo.', 'error');
    }
  });

  // Guardar cliente
  document.getElementById('client-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('client-id').value;
    const nombre = document.getElementById('client-nombre').value.trim();
    const logo_url = document.getElementById('client-logo-url').value.trim();
    const orden = parseInt(document.getElementById('client-orden').value) || 0;
    const activo = document.getElementById('client-activo').checked ? 1 : 0;

    if (!nombre) {
      showAlert('El nombre del cliente es obligatorio.', 'error');
      return;
    }
    if (!logo_url) {
      showAlert('Debes subir un logo antes de guardar.', 'error');
      return;
    }

    const submitBtn = document.getElementById('submit-client-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Guardando...';

    try {
      const body = { nombre, logo_url, orden, activo };
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/api/clientes/${id}` : '/api/clientes/';
      const res = await fetchWithAuth(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res || !res.ok) throw new Error('Error guardando');
      showAlert(id ? 'Cliente actualizado.' : 'Cliente creado correctamente.', 'success');
      closeModal();
      await loadClients();
    } catch {
      showAlert('Error al guardar el cliente.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Guardar';
    }
  });

  // Delegación de eventos para editar / eliminar / cambiar logo
  document.getElementById('clients-admin-grid')?.addEventListener('click', async (e) => {
    const editBtn = e.target.closest('.btn-edit-client');
    const deleteBtn = e.target.closest('.btn-delete-client');
    const replaceBtn = e.target.closest('.btn-replace-logo');

    if (editBtn) {
      openModal({
        id: editBtn.dataset.id,
        nombre: editBtn.dataset.nombre,
        logo: editBtn.dataset.logo,
        orden: parseInt(editBtn.dataset.orden),
        activo: editBtn.dataset.activo === 'true' || editBtn.dataset.activo === '1' ? 1 : 0
      });
    }

    if (deleteBtn) {
      const confirmed = await showConfirm(`¿Eliminar el cliente "${deleteBtn.dataset.nombre}"?`);
      if (!confirmed) return;
      try {
        const res = await fetchWithAuth(`/api/clientes/${deleteBtn.dataset.id}`, { method: 'DELETE' });
        if (!res || !res.ok) throw new Error();
        showAlert('Cliente eliminado.', 'success');
        await loadClients();
      } catch {
        showAlert('Error al eliminar el cliente.', 'error');
      }
    }

    // Cambiar logo directamente desde la tarjeta
    if (replaceBtn) {
      const clientId = replaceBtn.dataset.id;
      try {
        const file = await pickFile('image/*');
        if (!file) return;
        replaceBtn.textContent = 'Subiendo...';
        replaceBtn.disabled = true;

        // Subir via el endpoint específico del cliente (reemplaza en Cloudinary)
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetchWithAuth(`/api/clientes/${clientId}/logo`, { method: 'POST', body: formData });
        if (!res || !res.ok) throw new Error();
        showAlert('Logo actualizado correctamente.', 'success');
        await loadClients();
      } catch {
        showAlert('Error al subir el logo.', 'error');
        replaceBtn.textContent = 'Cambiar Logo';
        replaceBtn.disabled = false;
      }
    }
  });
}
