import { showAlert } from './UI.js';
import { fetchWithAuth } from '../utils/api.js';

/**
 * NewsEditor - Modal de creación/edición de noticias (Quill + imágenes).
 * Aislado del Dashboard para mantenerlo limpio.
 */

export const NEWS_MODAL_HTML = `
  <style>
    .ql-toolbar.ql-snow { border-color: #334155 !important; background: #1e293b; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem; }
    .ql-container.ql-snow { border-color: #334155 !important; background: #1e293b; border-bottom-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem; }
    .ql-snow .ql-stroke { stroke: #cbd5e1 !important; }
    .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill { fill: #cbd5e1 !important; }
    .ql-snow .ql-picker { color: #cbd5e1 !important; }
    .ql-snow .ql-picker-options { background-color: #1e293b !important; border-color: #334155 !important; }
    .ql-snow .ql-picker-item:hover, .ql-snow .ql-picker-label:hover { color: #fff !important; }
    .ql-snow button:hover .ql-stroke { stroke: #fff !important; }
    .ql-snow button:hover .ql-fill { fill: #fff !important; }
    .ql-editor.ql-blank::before { color: #94a3b8 !important; }
    #news-category {
      color-scheme: dark !important;
    }
    #news-category option {
      background-color: #18181b !important;
      color: #f4f4f5 !important;
    }
  </style>

  <!-- Modal Nueva/Editar Noticia -->
  <div id="news-modal" class="fixed inset-0 z-[100] hidden bg-black/70 backdrop-blur-sm overflow-y-auto">
    <div class="min-h-screen px-4 flex items-start justify-center py-8">
      <div class="relative w-full max-w-6xl glass-card rounded-2xl text-left flex flex-col">

        <div class="px-5 py-4 border-b border-white/5 flex justify-between items-center">
          <h3 class="text-lg font-bold text-white">Nueva Noticia</h3>
          <button onclick="closeNewsModal()" class="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="p-5 flex-1">
          <form id="news-form" class="h-full flex flex-col">

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 mb-4">

              <!-- Columna Izquierda (Inputs) -->
              <div class="lg:col-span-4 space-y-4 flex flex-col">
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Título *</label>
                  <input type="text" id="news-title" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="Título de la noticia">
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Categoría *</label>
                  <select id="news-category" required class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-sky-400 transition-all cursor-pointer">
                    <option value="" disabled selected class="bg-neutral-900 text-slate-400">Seleccionar categoría...</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Extracto *</label>
                  <textarea id="news-extract" required rows="3" class="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-sky-400 transition-all resize-none placeholder-white/40" placeholder="Breve descripción de la noticia..."></textarea>
                </div>

                <div class="pt-2">
                  <label class="flex items-center gap-2.5 cursor-pointer select-none">
                    <input type="checkbox" id="news-featured" class="w-4 h-4 rounded border-white/5 bg-white/10 text-info-500 focus:ring-info-500 focus:ring-offset-slate-900">
                    <span class="text-sm text-slate-300 font-medium">Noticia Destacada</span>
                  </label>
                </div>

                <div class="pt-2">
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Imágenes <span class="normal-case font-normal text-slate-500">(la primera será portada)</span></label>
                  <input type="file" id="news-images" multiple accept="image/png, image/jpeg, image/webp" class="block w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-sky-600/80 file:text-white hover:file:bg-sky-600 transition-all cursor-pointer">
                  <div id="news-image-previews" class="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2"></div>
                </div>
              </div>

              <!-- Columna Derecha (Editor) -->
              <div class="lg:col-span-8 flex flex-col">
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Contenido *</label>
                <div class="rounded-lg overflow-hidden border border-white/5 bg-white/10 backdrop-blur-xl flex-1 flex flex-col min-h-[400px]">
                  <div id="quill-editor" class="flex-1" style="color:#e2e8f0; background:#1e293b; font-size:14px;"></div>
                </div>
              </div>

            </div>

            <div class="flex justify-end gap-3 pt-4 border-t border-white/5 mt-2">
              <button type="button" onclick="closeNewsModal()" class="px-4 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">Cancelar</button>
              <button type="submit" id="news-submit-btn" class="px-5 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all">
                Guardar Noticia
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
`;

let quillEditor = null;

window.currentEditingNoticiaId = null;

// Estado de imágenes del editor (crear/editar)
window.pendingNewsImages = [];    // Archivos nuevos por subir
window.newsExistingImages = [];   // Imágenes ya subidas de la noticia (id, image_path)
window.newsImagesToDelete = [];   // IDs de imágenes existentes marcadas para eliminar al guardar

function renderNewsImagePreviews() {
  const container = document.getElementById('news-image-previews');
  if (!container) return;
  (window._pendingNewsUrls || []).forEach(u => URL.revokeObjectURL(u));
  const files = window.pendingNewsImages || [];
  const existing = window.newsExistingImages || [];
  window._pendingNewsUrls = [];
  container.innerHTML = '';

  existing.forEach(img => {
    const src = img.image_path.startsWith('http') ? img.image_path : '/' + img.image_path;
    container.innerHTML += `
      <div class="relative">
        <button type="button" data-remove-img-id="${img.id}" title="Quitar imagen" class="absolute -top-2 -right-2 z-10 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center justify-center shadow-lg transition-all cursor-pointer">✕</button>
        <img src="${src}" class="w-full h-16 object-cover rounded-lg border border-white/5" alt="Imagen actual">
      </div>
    `;
  });

  files.forEach((file, idx) => {
    const url = URL.createObjectURL(file);
    window._pendingNewsUrls.push(url);
    container.innerHTML += `
      <div class="relative">
        <button type="button" data-remove-idx="${idx}" title="Quitar imagen" class="absolute -top-2 -right-2 z-10 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center justify-center shadow-lg transition-all cursor-pointer">✕</button>
        <img src="${url}" class="w-full h-16 object-cover rounded-lg border border-white/5" alt="Vista previa">
      </div>
    `;
  });
}

// Tooltips en español para los botones del editor (Quill)
function getTooltipLabel(btn) {
  if (btn.classList.contains('ql-list')) {
    return btn.getAttribute('value') === 'ordered' ? 'Lista numerada' : 'Lista con viñetas';
  }
  if (btn.classList.contains('ql-header')) return 'Encabezado / Título';
  if (btn.classList.contains('ql-bold')) return 'Negrita';
  if (btn.classList.contains('ql-italic')) return 'Cursiva';
  if (btn.classList.contains('ql-underline')) return 'Subrayado';
  if (btn.classList.contains('ql-link')) return 'Insertar enlace';
  if (btn.classList.contains('ql-clean')) return 'Quitar formato';
  return '';
}

function setupEditorTooltips() {
  const toolbar = document.querySelector('.ql-toolbar');
  if (!toolbar || toolbar.dataset.tips) return;
  toolbar.dataset.tips = '1';

  let tipEl = document.getElementById('ql-custom-tooltip');
  if (!tipEl) {
    tipEl = document.createElement('div');
    tipEl.id = 'ql-custom-tooltip';
    tipEl.className = 'hidden fixed z-[200] px-2.5 py-1 rounded-md bg-slate-800 text-white text-xs font-semibold shadow-lg border border-white/5 pointer-events-none whitespace-nowrap';
    document.body.appendChild(tipEl);
  }

  const hide = () => tipEl.classList.add('hidden');
  const show = (btn, label) => {
    const rect = btn.getBoundingClientRect();
    tipEl.textContent = label;
    tipEl.classList.remove('hidden');
    tipEl.style.left = (rect.left + rect.width / 2) + 'px';
    tipEl.style.top = (rect.top - 8) + 'px';
    tipEl.style.transform = 'translate(-50%, -100%)';
  };

  toolbar.addEventListener('mouseover', (e) => {
    const btn = e.target.closest('.ql-header, .ql-bold, .ql-italic, .ql-underline, .ql-list, .ql-link, .ql-clean');
    if (!btn) { hide(); return; }
    // No mostrar tooltip sobre el menú desplegado del encabezado
    if (btn.querySelector('.ql-picker-options') && btn.querySelector('.ql-picker-options').contains(e.target)) { hide(); return; }
    const label = getTooltipLabel(btn);
    if (!label) { hide(); return; }
    show(btn, label);
  });

  toolbar.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget || !toolbar.contains(e.relatedTarget)) hide();
  });

  toolbar.addEventListener('click', hide);
}

window.openNewsModal = async () => {
  const modal = document.getElementById('news-modal');
  if (modal) {
    modal.classList.remove('hidden');

    // Limpiar selección de imágenes pendientes al abrir (crear o editar)
    window.pendingNewsImages = [];
    window.newsExistingImages = [];
    window.newsImagesToDelete = [];
    const imgInput = document.getElementById('news-images');
    if (imgInput) imgInput.value = '';
    renderNewsImagePreviews();

    // Si no estamos editando, asegurar que los títulos sean de "crear"
    if (!window.currentEditingNoticiaId) {
      const titleEl = modal.querySelector('h3');
      if (titleEl) titleEl.innerText = 'Nueva Noticia';
      const submitBtn = document.getElementById('news-submit-btn');
      if (submitBtn) submitBtn.innerText = 'Guardar Noticia';
    }

    // Cargar categorías en el select
    const catSelect = document.getElementById('news-category');
    if (catSelect && catSelect.options.length <= 1) {
      try {
        const r = await fetch('/api/categories/');
        const cats = await r.json();
        catSelect.innerHTML = '<option value="" disabled selected class="bg-neutral-900 text-slate-400">Seleccionar categoría...</option>';
        cats.forEach(c => {
          catSelect.innerHTML += `<option value="${c.name}" class="bg-neutral-900 text-white">${c.name}</option>`;
        });
      } catch (e) {
        console.error("Error cargando categorías en modal de noticias:", e);
      }
    }

    // Initialize Quill if not already done, or if the DOM node was replaced
    const editorNode = document.getElementById('quill-editor');
    if (editorNode && (!quillEditor || !editorNode.classList.contains('ql-container'))) {
      quillEditor = new Quill('#quill-editor', {
        theme: 'snow',
        placeholder: 'Escribe el contenido de la noticia...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
          ]
        }
      });
      // Dark theme override for Quill
      const qlEditor = document.querySelector('.ql-editor');
      if (qlEditor) { qlEditor.style.color = '#e2e8f0'; qlEditor.style.background = '#1e293b'; }
      setupEditorTooltips();
    } else if (quillEditor) {
      // Limpiar el editor al reabrir
      quillEditor.root.innerHTML = '';
    }

    // Limpiar formulario si NO estamos editando (si estamos editando, editNoticia ya lo llenó)
    if (!window.currentEditingNoticiaId) {
      const form = document.getElementById('news-form');
      if (form) form.reset();
    }
  }
};

window.closeNewsModal = () => {
  const modal = document.getElementById('news-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
  window.currentEditingNoticiaId = null; // Limpiar al cerrar
  window.pendingNewsImages = [];
  window.newsExistingImages = [];
  window.newsImagesToDelete = [];
  const imgInput = document.getElementById('news-images');
  if (imgInput) imgInput.value = '';
  renderNewsImagePreviews();
};

window.editNoticia = async (id) => {
  try {
    const res = await fetch(`/api/noticias/${id}`);
    if (!res.ok) throw new Error('No se pudo cargar la noticia');

    const noticia = await res.json();

    // Configurar estado
    window.currentEditingNoticiaId = id;

    // Abrir el modal y luego llenar los datos
    await openNewsModal();

    // Cambiar títulos
    const modal = document.getElementById('news-modal');
    if (modal) {
      const titleEl = modal.querySelector('h3');
      if (titleEl) titleEl.innerText = 'Editar Noticia';
      const submitBtn = document.getElementById('news-submit-btn');
      if (submitBtn) submitBtn.innerText = 'Actualizar Noticia';
    }

    // Llenar campos simples
    document.getElementById('news-title').value = noticia.titulo || '';
    document.getElementById('news-category').value = noticia.categoria || '';
    document.getElementById('news-extract').value = noticia.extracto || '';
    document.getElementById('news-featured').checked = noticia.es_destacado || false;

    // Llenar Quill
    if (quillEditor) {
      quillEditor.root.innerHTML = noticia.contenido || '';
    } else {
      setTimeout(() => {
        if (quillEditor) quillEditor.root.innerHTML = noticia.contenido || '';
      }, 300);
    }

    // Mostrar imágenes existentes de la noticia con su ✕ para poder quitarlas
    window.newsExistingImages = (noticia.imagenes || []).map(img => ({ id: img.id, image_path: img.image_path }));
    window.newsImagesToDelete = [];
    renderNewsImagePreviews();

  } catch (err) {
    showAlert(err.message, 'error');
  }
};

export function resetNewsEditor() {
  quillEditor = null;
}

export function initNewsEditor() {
  // Vista previa de imágenes (change + click para quitar)
  if (!window.hasNewsImagesListener) {
    window.hasNewsImagesListener = true;
    document.addEventListener('change', (e) => {
      if (e.target.id === 'news-images') {
        window.pendingNewsImages = Array.from(e.target.files);
        renderNewsImagePreviews();
      }
    });
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-remove-idx], [data-remove-img-id]');
      if (btn) {
        if (btn.hasAttribute('data-remove-img-id')) {
          const id = parseInt(btn.getAttribute('data-remove-img-id'), 10);
          window.newsImagesToDelete.push(id);
          window.newsExistingImages = window.newsExistingImages.filter(img => img.id !== id);
        } else {
          const idx = parseInt(btn.getAttribute('data-remove-idx'), 10);
          const files = window.pendingNewsImages || [];
          if (idx > -1 && idx < files.length) files.splice(idx, 1);
          window.pendingNewsImages = files;
        }
        renderNewsImagePreviews();
      }
    });
  }

  // Submit del formulario de noticias (crear/editar + imágenes)
  if (!window.hasNewsSubmitListener) {
    window.hasNewsSubmitListener = true;
    document.addEventListener('submit', async (e) => {
      if (e.target.id !== 'news-form') return;
      e.preventDefault();

      const titulo = document.getElementById('news-title').value;
      const categoria = document.getElementById('news-category').value;
      const extracto = document.getElementById('news-extract').value;
      const es_destacado = document.getElementById('news-featured').checked;
      const files = window.pendingNewsImages || [];

      // Obtener el HTML generado por Quill
      const contenido = quillEditor ? quillEditor.root.innerHTML : '';
      if (!contenido || contenido === '<p><br></p>') {
        showAlert('El contenido de la noticia es obligatorio', 'error');
        return;
      }

      const submitBtn = document.getElementById('news-submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Guardando...';

      try {
        const payload = {
          titulo,
          categoria,
          extracto,
          contenido,
          es_destacado,
          icono: null
        };

        let url = '/api/noticias/';
        let method = 'POST';

        if (window.currentEditingNoticiaId) {
          url = `/api/noticias/${window.currentEditingNoticiaId}`;
          method = 'PUT';
        }

        const res = await fetchWithAuth(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error(window.currentEditingNoticiaId ? 'Error al actualizar la noticia' : 'Error al crear la noticia');

        const savedNoticia = await res.json();

        const token = localStorage.getItem('bolog_access_token');

        // 1. Eliminar imágenes existentes marcadas con ✕
        if (window.newsImagesToDelete && window.newsImagesToDelete.length > 0) {
          for (const imgId of window.newsImagesToDelete) {
            await fetch(`/api/noticias/${savedNoticia.id}/images/${imgId}`, {
              method: 'DELETE',
              headers: { 'Authorization': 'Bearer ' + token }
            }).catch(() => { });
          }
        }

        // 2. Subir Imágenes nuevas si hay
        if (files.length > 0) {
          const formData = new FormData();
          for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
          }

          const imgRes = await fetch(`/api/noticias/${savedNoticia.id}/images`, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token },
            body: formData
          });

          if (!imgRes.ok) throw new Error('Noticia guardada pero falló la subida de imágenes');
        }

        showAlert(window.currentEditingNoticiaId ? 'Noticia actualizada correctamente' : 'Noticia creada correctamente', 'success');
        closeNewsModal();
        if (window.newsTable) window.newsTable.refresh(); // Recargar la tabla

      } catch (err) {
        console.error(err);
        showAlert(err.message || 'Error de conexión', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
}
