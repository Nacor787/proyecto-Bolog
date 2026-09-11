/**
 * uploadToCloudinary.js
 * Utilidad para subir archivos a Cloudinary a través del endpoint del backend.
 * Sin necesidad de API keys en el frontend ni pegar links manualmente.
 */
import { fetchWithAuth } from './api.js';

/**
 * Sube una imagen a Cloudinary vía el backend.
 * @param {File} file - El archivo de imagen a subir
 * @param {string} carpeta - Carpeta en Cloudinary (ej: "clientes", "nosotros")
 * @param {function} onProgress - Callback opcional de progreso (no implementado aún)
 * @returns {Promise<{url: string, public_id: string}>}
 */
export async function uploadImagen(file, carpeta = 'subidas', onProgress = null) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('carpeta', carpeta);

  const res = await fetchWithAuth('/api/upload/imagen', {
    method: 'POST',
    body: formData,
  });

  if (!res || !res.ok) {
    const err = await res?.json().catch(() => ({}));
    throw new Error(err.detail || 'Error al subir la imagen');
  }
  return res.json();
}

/**
 * Sube un video a Cloudinary vía el backend.
 * @param {File} file - El archivo de video a subir
 * @param {string} carpeta - Carpeta en Cloudinary (ej: "videos")
 * @returns {Promise<{url: string, public_id: string}>}
 */
export async function uploadVideo(file, carpeta = 'videos') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('carpeta', carpeta);

  const res = await fetchWithAuth('/api/upload/video', {
    method: 'POST',
    body: formData,
  });

  if (!res || !res.ok) {
    const err = await res?.json().catch(() => ({}));
    throw new Error(err.detail || 'Error al subir el video');
  }
  return res.json();
}

/**
 * Abre un selector de archivo y retorna el File seleccionado.
 * @param {string} accept - tipos MIME permitidos, ej: "image/*"
 */
export function pickFile(accept = 'image/*') {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = () => resolve(input.files[0] || null);
    input.click();
  });
}

/**
 * Helper que crea un botón de upload con estado de carga integrado.
 * Retorna { button: HTMLElement, setLoading: (bool) => void }
 */
export function createUploadButton({ label = 'Subir archivo', icon = '📎', className = '' } = {}) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-sky-600 text-slate-300 hover:text-white text-sm font-bold rounded-xl transition-all border border-white/10 ${className}`;
  btn.innerHTML = `<span class="upload-icon">${icon}</span><span class="upload-label">${label}</span>`;

  const setLoading = (loading) => {
    btn.disabled = loading;
    const iconEl = btn.querySelector('.upload-icon');
    const labelEl = btn.querySelector('.upload-label');
    if (loading) {
      iconEl.innerHTML = `<svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>`;
      labelEl.textContent = 'Subiendo...';
    } else {
      iconEl.textContent = icon;
      labelEl.textContent = label;
    }
  };

  return { button: btn, setLoading };
}
