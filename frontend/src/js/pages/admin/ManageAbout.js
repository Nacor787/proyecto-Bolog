// ManageAbout.js — Gestión de la sección Nosotros desde el panel de administración
import { fetchWithAuth } from '../../utils/api.js';
import { showAlert } from '../../components/UI.js';
import { uploadVideo, pickFile } from '../../utils/uploadToCloudinary.js';

export async function renderManageAbout(container) {
  container.innerHTML = `
    <header class="glass-card-admin h-auto min-h-16 flex items-center justify-between px-6 py-3 gap-3">

      <button id="btn-save-about" class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        Guardar Cambios
      </button>
    </header>

    <div class="w-full p-4 md:p-8">
      <div id="about-admin-form-wrap" class="max-w-4xl mx-auto space-y-6">
        <div class="text-slate-500 text-sm flex items-center gap-2 py-12 justify-center">
          <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Cargando...
        </div>
      </div>
    </div>
  `;

  await loadAboutForm();

  document.getElementById('btn-save-about')?.addEventListener('click', saveAbout);
}

function fieldBlock(label, idEs, idEn, placeholder_es = '', placeholder_en = '', isTextarea = false) {
  const tag = isTextarea ? 'textarea' : 'input';
  const extra = isTextarea ? 'rows="4"' : 'type="text"';
  const baseClass = 'w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40';
  return `
    <div class="glass-card-admin rounded-2xl p-5 space-y-4">
      <h3 class="text-sm font-bold text-sky-400 uppercase tracking-wider">${label}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Español</label>
          <${tag} id="${idEs}" ${extra} class="${baseClass}" placeholder="${placeholder_es}"></${tag}>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">English</label>
          <${tag} id="${idEn}" ${extra} class="${baseClass}" placeholder="${placeholder_en}"></${tag}>
        </div>
      </div>
    </div>
  `;
}

function fieldGroup(groupLabel, fields) {
  let html = `<div class="glass-card-admin rounded-2xl p-5 space-y-6">
    <h3 class="text-sm font-bold text-sky-400 uppercase tracking-wider border-b border-white/10 pb-3">${groupLabel}</h3>
    <div class="space-y-6">`;
  
  fields.forEach(f => {
    const tag = f.isTextarea ? 'textarea' : 'input';
    const extra = f.isTextarea ? 'rows="4"' : 'type="text"';
    const baseClass = 'w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40';
    html += `
      <div>
        <h4 class="text-xs font-semibold text-slate-300 mb-2">${f.label}</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Español</label>
            <${tag} id="${f.idEs}" ${extra} class="${baseClass}" placeholder="${f.placeholder_es}"></${tag}>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">English</label>
            <${tag} id="${f.idEn}" ${extra} class="${baseClass}" placeholder="${f.placeholder_en}"></${tag}>
          </div>
        </div>
      </div>
    `;
  });
  html += `</div></div>`;
  return html;
}

async function loadAboutForm() {
  const wrap = document.getElementById('about-admin-form-wrap');
  if (!wrap) return;
  try {
    const res = await fetchWithAuth('/api/nosotros');
    if (!res || !res.ok) throw new Error();
    const d = await res.json();

    wrap.innerHTML = `
      <!-- Tabs Nav -->
      <div class="flex overflow-x-auto border-b border-white/10 mb-6 gap-2 hide-scrollbar">
        <button class="admin-tab-btn active px-4 py-2.5 text-sky-400 font-bold border-b-2 border-sky-400 whitespace-nowrap transition-colors" data-target="admin-tab-historia">Historia & Tagline</button>
        <button class="admin-tab-btn px-4 py-2.5 text-slate-400 hover:text-white font-bold border-b-2 border-transparent whitespace-nowrap transition-colors" data-target="admin-tab-video">Video Institucional</button>
        <button class="admin-tab-btn px-4 py-2.5 text-slate-400 hover:text-white font-bold border-b-2 border-transparent whitespace-nowrap transition-colors" data-target="admin-tab-mvv">Misión, Visión y Valores</button>
        <button class="admin-tab-btn px-4 py-2.5 text-slate-400 hover:text-white font-bold border-b-2 border-transparent whitespace-nowrap transition-colors" data-target="admin-tab-politica">Políticas</button>
      </div>

      <!-- Tab Panels -->
      <div id="admin-tab-historia" class="admin-tab-panel space-y-6 block animate-fade-in">
        ${fieldBlock('Tagline (subtítulo del header)', 'about-tagline-es', 'about-tagline-en', 'Más de 20 años de experiencia...', 'More than 20 years of experience...', true)}
        ${fieldBlock('Trayectoria / Motor Logístico', 'about-trayectoria-es', 'about-trayectoria-en', 'Somos el motor que impulsa tu logística global.', 'We are the engine that drives your global logistics.', true)}
        ${fieldBlock('Historia', 'about-historia-es', 'about-historia-en', 'Escribe la historia de la empresa... (separa párrafos con línea en blanco)', 'Write company history... (separate paragraphs with blank line)', true)}
      </div>

      <div id="admin-tab-video" class="admin-tab-panel space-y-6 hidden animate-fade-in">
        <div class="glass-card-admin rounded-2xl p-5 space-y-2">
          <h3 class="text-sm font-bold text-sky-400 uppercase tracking-wider">Video Institucional</h3>
          <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">URL del Video (Cloudinary u otro)</label>
          <div class="flex flex-col gap-2">
            <input type="url" id="about-video-url" class="w-full bg-white/10 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-400 transition-all placeholder-white/40" placeholder="https://res.cloudinary.com/... o enlace YouTube embed">
            <button type="button" id="btn-upload-video-about" class="flex items-center justify-center gap-2 w-full py-2 border border-dashed border-white/20 rounded-lg hover:border-sky-400 hover:bg-sky-500/5 text-slate-400 hover:text-sky-400 text-sm font-semibold transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              <span id="upload-video-label">Subir Video a Cloudinary (MP4/WebM)</span>
            </button>
          </div>
          <p class="text-[10px] text-slate-500">Para YouTube, pega directamente el enlace de embed: https://www.youtube.com/embed/ID_VIDEO</p>
        </div>
      </div>

      <div id="admin-tab-mvv" class="admin-tab-panel space-y-6 hidden animate-fade-in">
        ${fieldGroup('Misión', [
          { label: 'Descripción Principal', idEs: 'about-mision-es', idEn: 'about-mision-en', placeholder_es: '...', placeholder_en: '...', isTextarea: true },
          { label: 'Punto 1', idEs: 'about-mision-b1-es', idEn: 'about-mision-b1-en', placeholder_es: 'Cobertura puerta a puerta...', placeholder_en: 'Personalized door-to-door...' },
          { label: 'Punto 2', idEs: 'about-mision-b2-es', idEn: 'about-mision-b2-en', placeholder_es: 'Trazabilidad y respaldo...', placeholder_en: 'Traceability and regulatory...' }
        ])}
        ${fieldGroup('Visión', [
          { label: 'Descripción Principal', idEs: 'about-vision-es', idEn: 'about-vision-en', placeholder_es: '...', placeholder_en: '...', isTextarea: true },
          { label: 'Punto 1', idEs: 'about-vision-b1-es', idEn: 'about-vision-b1-en', placeholder_es: 'Innovación tecnológica...', placeholder_en: 'Continuous innovation...' },
          { label: 'Punto 2', idEs: 'about-vision-b2-es', idEn: 'about-vision-b2-en', placeholder_es: 'Expansión de alianzas...', placeholder_en: 'Expansion of alliances...' }
        ])}
        ${fieldGroup('Valores', [
          { label: 'Descripción Principal', idEs: 'about-valores-es', idEn: 'about-valores-en', placeholder_es: '...', placeholder_en: '...', isTextarea: true },
          { label: 'Punto 1', idEs: 'about-valores-b1-es', idEn: 'about-valores-b1-en', placeholder_es: 'Transparencia y honestidad...', placeholder_en: 'Transparency and honesty...' },
          { label: 'Punto 2', idEs: 'about-valores-b2-es', idEn: 'about-valores-b2-en', placeholder_es: 'Seguridad y compromiso...', placeholder_en: 'Security and commitment...' }
        ])}
      </div>

      <div id="admin-tab-politica" class="admin-tab-panel space-y-6 hidden animate-fade-in">
        ${fieldBlock('Políticas', 'about-politicas-es', 'about-politicas-en', 'Describe las políticas de la empresa...', "Describe the company's policies...", true)}
      </div>
    `;

    // Llenar con datos existentes
    const setVal = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
    setVal('about-tagline-es', d.tagline_es);
    setVal('about-tagline-en', d.tagline_en);
    setVal('about-trayectoria-es', d.trayectoria_es);
    setVal('about-trayectoria-en', d.trayectoria_en);
    setVal('about-historia-es', d.historia_es);
    setVal('about-historia-en', d.historia_en);
    setVal('about-video-url', d.video_url);
    setVal('about-mision-es', d.mision_es);
    setVal('about-mision-en', d.mision_en);
    const mb_es = (d.mision_bullets_es || '').split('\n');
    const mb_en = (d.mision_bullets_en || '').split('\n');
    setVal('about-mision-b1-es', mb_es[0]); setVal('about-mision-b1-en', mb_en[0]);
    setVal('about-mision-b2-es', mb_es[1]); setVal('about-mision-b2-en', mb_en[1]);

    setVal('about-vision-es', d.vision_es);
    setVal('about-vision-en', d.vision_en);
    const vb_es = (d.vision_bullets_es || '').split('\n');
    const vb_en = (d.vision_bullets_en || '').split('\n');
    setVal('about-vision-b1-es', vb_es[0]); setVal('about-vision-b1-en', vb_en[0]);
    setVal('about-vision-b2-es', vb_es[1]); setVal('about-vision-b2-en', vb_en[1]);

    setVal('about-valores-es', d.valores_es);
    setVal('about-valores-en', d.valores_en);
    const valb_es = (d.valores_bullets_es || '').split('\n');
    const valb_en = (d.valores_bullets_en || '').split('\n');
    setVal('about-valores-b1-es', valb_es[0]); setVal('about-valores-b1-en', valb_en[0]);
    setVal('about-valores-b2-es', valb_es[1]); setVal('about-valores-b2-en', valb_en[1]);
    setVal('about-politicas-es', d.politicas_es);
    setVal('about-politicas-en', d.politicas_en);

    // Setup events after render
    setupAboutEvents();
    setupAdminTabs();

  } catch {
    wrap.innerHTML = `<div class="text-red-400 py-12 text-center">Error al cargar la información de Nosotros.</div>`;
  }
}

function setupAdminTabs() {
  const btns = document.querySelectorAll('.admin-tab-btn');
  const panels = document.querySelectorAll('.admin-tab-panel');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => {
        b.classList.remove('active', 'text-sky-400', 'border-sky-400');
        b.classList.add('text-slate-400', 'border-transparent');
      });
      btn.classList.add('active', 'text-sky-400', 'border-sky-400');
      btn.classList.remove('text-slate-400', 'border-transparent');

      panels.forEach(p => p.classList.add('hidden'));
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId)?.classList.remove('hidden');
    });
  });
}

function setupAboutEvents() {
  document.getElementById('btn-upload-video-about')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-upload-video-about');
    const label = document.getElementById('upload-video-label');
    try {
      const file = await pickFile('video/*');
      if (!file) return;
      btn.disabled = true;
      label.textContent = 'Subiendo video... esto puede tardar un poco';
      btn.classList.add('opacity-60');

      const result = await uploadVideo(file, 'videos');
      document.getElementById('about-video-url').value = result.url;

      label.textContent = '✅ Video subido correctamente';
      btn.classList.remove('opacity-60');
      btn.disabled = false;
    } catch (err) {
      label.textContent = '❌ Error al subir video';
      btn.disabled = false;
      btn.classList.remove('opacity-60');
      showAlert(err.message || 'Error al subir el video.', 'error');
    }
  });
}

async function saveAbout() {
  const getVal = (id) => document.getElementById(id)?.value?.trim() || null;
  const body = {
    tagline_es: getVal('about-tagline-es'),
    tagline_en: getVal('about-tagline-en'),
    trayectoria_es: getVal('about-trayectoria-es'),
    trayectoria_en: getVal('about-trayectoria-en'),
    historia_es: getVal('about-historia-es'),
    historia_en: getVal('about-historia-en'),
    video_url: getVal('about-video-url'),
    mision_es: getVal('about-mision-es'),
    mision_en: getVal('about-mision-en'),
    mision_bullets_es: [getVal('about-mision-b1-es'), getVal('about-mision-b2-es')].filter(Boolean).join('\n'),
    mision_bullets_en: [getVal('about-mision-b1-en'), getVal('about-mision-b2-en')].filter(Boolean).join('\n'),
    vision_es: getVal('about-vision-es'),
    vision_en: getVal('about-vision-en'),
    vision_bullets_es: [getVal('about-vision-b1-es'), getVal('about-vision-b2-es')].filter(Boolean).join('\n'),
    vision_bullets_en: [getVal('about-vision-b1-en'), getVal('about-vision-b2-en')].filter(Boolean).join('\n'),
    valores_es: getVal('about-valores-es'),
    valores_en: getVal('about-valores-en'),
    valores_bullets_es: [getVal('about-valores-b1-es'), getVal('about-valores-b2-es')].filter(Boolean).join('\n'),
    valores_bullets_en: [getVal('about-valores-b1-en'), getVal('about-valores-b2-en')].filter(Boolean).join('\n'),
    politicas_es: getVal('about-politicas-es'),
    politicas_en: getVal('about-politicas-en'),
  };
  try {
    const res = await fetchWithAuth('/api/nosotros', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res || !res.ok) throw new Error();
    showAlert('Información de Nosotros guardada correctamente.', 'success');
  } catch {
    showAlert('Error al guardar la información.', 'error');
  }
}
