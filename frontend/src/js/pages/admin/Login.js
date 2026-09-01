const logoSrc = 'https://res.cloudinary.com/oyusqpnf/image/upload/v1787506176/logo-bolog.png';
import { VantaGlobe, initVantaGlobe } from '../../components/VantaGlobe.js';

export const Login = `
  <div id="login-page" class="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0B192C] text-white font-sans">
    <!-- Decoración de fondo Vanta Globe -->
    ${VantaGlobe('vanta-login-bg')}

    <!-- Login Card -->
    <div class="relative z-20 w-full max-w-[420px] mx-4">
      
      <!-- Glassmorphism Card (Dark theme) -->
      <div class="bg-[#0B192C]/50 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] p-6 md:px-8 md:py-6">

        <!-- Logo & Title -->
        <div class="text-center mb-5">
          <img src="${logoSrc}" alt="BOLOG Logo" class="h-12 w-auto mx-auto mb-2 drop-shadow-lg" />
          <h1 class="text-xl font-heading font-black tracking-tight">
            <span class="text-white"> Dashboard</span>
          </h1>
          <p class="text-slate-400 text-xs mt-1 tracking-wide">Panel de Administración · Acceso Seguro</p>
          
          <!-- Divider -->
          <div class="mt-4 flex items-center gap-3">
            <div class="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
            <svg class="w-4 h-4 text-blue-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            <div class="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
          </div>
        </div>

        <!-- Form -->
        <form id="login-form" class="space-y-3">

          <!-- Username -->
          <div class="group relative">
            <label for="username" class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Usuario</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-blue-400/70 group-focus-within:text-sky-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <input 
                id="username" name="username" type="text" required 
                class="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/60 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300" 
                placeholder="Nombre de usuario"
              >
            </div>
          </div>

          <!-- Password -->
          <div class="group relative">
            <label for="password" class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Contraseña</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <svg class="h-4 w-4 text-blue-400/70 group-focus-within:text-sky-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </span>
              <input 
                id="password" name="password" type="password" required 
                class="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/60 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300" 
                placeholder="••••••••"
              >
              <button type="button" id="toggle-password" class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-sky-400 focus:outline-none transition-colors" title="Mostrar/Ocultar contraseña">
                <svg id="eye-icon" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div id="login-error" class="hidden flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            <svg class="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span class="text-red-400 text-sm">Credenciales inválidas. Intenta de nuevo.</span>
          </div>

          <!-- Cloudflare Turnstile Captcha -->
          <div class="flex justify-center mt-2 mb-0 scale-[0.80] origin-top h-[52px]">
            <div class="cf-turnstile" data-sitekey="0x4AAAAAAEfhcuePdjIqdfTl" data-theme="dark"></div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="w-full mt-1 py-2.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 tracking-wide flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
            Iniciar Sesión
          </button>

          <!-- Back link -->
          <div class="text-center pt-2">
            <a href="javascript:void(0)" onclick="window.location.hash='#'" class="text-xs text-slate-500 hover:text-sky-400 transition-colors tracking-wide flex items-center justify-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver al sitio público
            </a>
          </div>

        </form>
      </div>

      <!-- Footer text -->
      <p class="text-center text-slate-400 text-xs mt-4 tracking-wide drop-shadow-md">© ${new Date().getFullYear()} BOLOG Logistics Group S.R.L.</p>
    </div>
  </div>
`;

export function initLogin() {
  initVantaGlobe('vanta-login-bg');

  const form = document.getElementById('login-form');
  if (!form) return;

  // Cargar script de Turnstile dinámicamente si no existe
  if (!document.getElementById('turnstile-script')) {
    const script = document.createElement('script');
    script.id = 'turnstile-script';
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  } else if (window.turnstile) {
    // Si ya existe y volvemos a la página, renderizar nuevamente (Turnstile auto-renderiza la clase cf-turnstile, pero a veces necesita reset o un render explícito si el DOM cambió)
    // Usamos setTimeout para asegurar que el DOM esté listo
    setTimeout(() => {
      document.querySelectorAll('.cf-turnstile').forEach(el => {
        if (!el.hasChildNodes()) {
          window.turnstile.render(el);
        } else {
          window.turnstile.reset(el);
        }
      });
    }, 100);
  }

  const spinnerHTML = '<svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Verificando...';
  const loginBtnHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg> Iniciar Sesión';

  const togglePasswordBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eye-icon');

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      if (type === 'text') {
        // Ícono de ojo cerrado
        eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />';
      } else {
        // Ícono de ojo abierto
        eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
      }
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('login-error');
    const submitBtn = form.querySelector('button[type="submit"]');
    const turnstileInput = document.querySelector('[name="cf-turnstile-response"]');
    const captcha_token = turnstileInput ? turnstileInput.value : '';

    if (!captcha_token) {
      errorEl.querySelector('span').textContent = 'Por favor, completa el Captcha.';
      errorEl.classList.remove('hidden');
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = spinnerHTML;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, captcha_token })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('bolog_access_token', data.access_token);
        localStorage.setItem('bolog_refresh_token', data.refresh_token);
        window.location.hash = '#dashboard';
      } else {
        const errorData = await res.json().catch(() => ({}));
        errorEl.querySelector('span').textContent = errorData.detail || 'Credenciales inválidas. Intenta de nuevo.';
        errorEl.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = loginBtnHTML;
        if (window.turnstile) window.turnstile.reset();
      }
    } catch (err) {
      console.error(err);
      errorEl.querySelector('span').textContent = 'Error de conexión con el servidor.';
      errorEl.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = loginBtnHTML;
      if (window.turnstile) window.turnstile.reset();
    }
  });
}
