export const QuoteSection = `
  <section class="bg-transparent py-16 md:py-20 border-y border-white/10" id="contact">
    <!-- Section Header (Unified Design) -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 border-b border-white/10 pb-8" data-aos="fade-up">
      <div class="flex items-center gap-2 mb-3">
        <span class="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
        <span class="text-xs font-extrabold tracking-[0.25em] text-sky-400 uppercase" data-i18n="contact.tagline">Atención Inmediata & Cotizaciones</span>
      </div>
      <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3" data-i18n="contact.title">Contáctanos</h2>
      <p class="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed font-medium" data-i18n="contact.subtitle">
        Solicita una cotización a medida o cuéntanos los requerimientos de tu carga. Nuestro equipo de especialistas responderá a la brevedad.
      </p>
    </div>
    
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="flex flex-col lg:flex-row bg-gradient-to-br from-slate-900 via-[#0f2038] to-slate-950 rounded-2xl shadow-2xl border border-white/10 overflow-hidden backdrop-blur-xl" data-aos="fade-up" data-aos-delay="150">
        
        <!-- Lado Izquierdo (Texto) -->
        <div class="w-full lg:w-1/2 p-8 lg:p-12 relative flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
          <h2 class="text-3xl font-light text-white mb-3 uppercase tracking-wider" data-i18n="contact.specialTitle">
            ¿QUÉ NOS HACE <br/>
            <span class="font-black text-primary-400">ESPECIALES?</span>
          </h2>
          <p class="text-slate-300 leading-relaxed mb-10 text-sm" data-i18n="contact.specialDesc">
            Nuestra calidad de servicio y los más de 5000 agentes socios en el mundo nos dan un alcance para apoyar al 100% a nuestros clientes.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <!-- Icon 1: Packaging & Storage — Itshover box-open style -->
            <div class="flex items-center gap-4 group cursor-pointer">
              <div class="w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-primary-400 group-hover:text-primary-400 transition-all duration-300 shrink-0 relative overflow-hidden">
                <!-- Lid part animates up on hover -->
                <svg class="w-7 h-7 absolute" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path class="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-0.5" stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v0"/>
                  <path class="transition-opacity duration-300" stroke-linecap="round" stroke-linejoin="round" d="M4 7v10l8 4m0 0l8-4V7M12 21V11m-8-4l8 4 8-4"/>
                </svg>
              </div>
              <div>
                <p class="font-bold text-xs text-white uppercase tracking-wide leading-tight" data-i18n="contact.feat1Title">EMBALAJE</p>
                <p class="font-bold text-xs text-sky-400 uppercase tracking-wide leading-tight" data-i18n="contact.feat1Sub">Y ALMACENAJE</p>
              </div>
            </div>
            
            <!-- Icon 2: Warehousing — Building animates on hover -->
            <div class="flex items-center gap-4 group cursor-pointer">
              <div class="w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-primary-400 group-hover:text-primary-400 transition-all duration-300 shrink-0 relative overflow-hidden">
                <svg class="w-7 h-7 absolute" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <!-- Roof: slides in from top -->
                  <path class="transition-transform duration-300 group-hover:translate-y-0 translate-y-[-2px]" stroke-linecap="round" stroke-linejoin="round" d="M3 9l9-7 9 7"/>
                  <!-- Body: fades/appears -->
                  <path class="transition-all duration-300 group-hover:opacity-100 opacity-70" stroke-linecap="round" stroke-linejoin="round" d="M9 22V12h6v10M3 9v13h18V9"/>
                </svg>
              </div>
              <div>
                <p class="font-bold text-xs text-white uppercase tracking-wide leading-tight" data-i18n="contact.feat2Title">SERVICIO DE</p>
                <p class="font-bold text-xs text-sky-400 uppercase tracking-wide leading-tight" data-i18n="contact.feat2Sub">DEPÓSITO</p>
              </div>
            </div>

            <!-- Icon 3: Worldwide Transport -->
            <div class="flex items-center gap-4 group cursor-pointer">
              <div class="w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-primary-400 group-hover:text-primary-400 transition-all duration-300 shrink-0 relative overflow-hidden">
                <svg class="w-7 h-7 absolute" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <!-- Truck body: slides right on hover -->
                  <path class="transition-transform duration-300 group-hover:translate-x-0.5" stroke-linecap="round" stroke-linejoin="round" d="M1 3h13v13H1z M14 8h4l3 3v5h-7V8z"/>
                  <!-- Wheels: spin slightly (simplified) -->
                  <circle class="transition-transform duration-300 origin-center group-hover:rotate-45" cx="5.5" cy="18.5" r="2"/>
                  <circle class="transition-transform duration-300 origin-center group-hover:rotate-45" cx="18.5" cy="18.5" r="2"/>
                </svg>
              </div>
              <div>
                <p class="font-bold text-xs text-white uppercase tracking-wide leading-tight" data-i18n="contact.feat3Title">TRANSPORTE</p>
                <p class="font-bold text-xs text-sky-400 uppercase tracking-wide leading-tight" data-i18n="contact.feat3Sub">MUNDIAL</p>
              </div>
            </div>

            <!-- Icon 4: Logistic Services -->
            <div class="flex items-center gap-4 group cursor-pointer">
              <div class="w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-primary-400 group-hover:text-primary-400 transition-all duration-300 shrink-0 relative overflow-hidden">
                <svg class="w-7 h-7 absolute" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <!-- Upper plug: moves up-left on hover (itshover plug-connected behavior) -->
                  <path class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" stroke-linecap="round" stroke-linejoin="round" d="M17 12l-5-5 1.5-1.5a3.536 3.536 0 1 1 5 5L17 12z"/>
                  <path class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" stroke-linecap="round" stroke-linejoin="round" d="M18.5 5.5l2.5-2.5"/>
                  <!-- Lower plug: moves down-right on hover -->
                  <path class="transition-transform duration-300 group-hover:translate-y-0.5 group-hover:translate-x-0.5" stroke-linecap="round" stroke-linejoin="round" d="M7 12l5 5-1.5 1.5a3.536 3.536 0 1 1-5-5L7 12z"/>
                  <path class="transition-transform duration-300 group-hover:translate-y-0.5 group-hover:translate-x-0.5" stroke-linecap="round" stroke-linejoin="round" d="M3 21l2.5-2.5"/>
                  <!-- Connector legs: fade out on hover (exactly as itshover does) -->
                  <path class="transition-opacity duration-300 group-hover:opacity-0" stroke-linecap="round" stroke-linejoin="round" d="M10 11l-2 2"/>
                  <path class="transition-opacity duration-300 group-hover:opacity-0" stroke-linecap="round" stroke-linejoin="round" d="M13 14l-2 2"/>
                </svg>
              </div>
              <div>
                <p class="font-bold text-xs text-white uppercase tracking-wide leading-tight" data-i18n="contact.feat4Title">DESPACHO</p>
                <p class="font-bold text-xs text-sky-400 uppercase tracking-wide leading-tight" data-i18n="contact.feat4Sub">ADUANERO</p>
              </div>
            </div>

          </div>
          
          <!-- Social Icons -->
          <div class="mt-12 flex space-x-4">
            <a href="javascript:void(0)" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors shadow-sm hover:shadow-md border border-white/10 hover:border-[#1877F2]">
              <span class="sr-only">Facebook</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
            <a href="javascript:void(0)" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-colors shadow-sm hover:shadow-md border border-white/10 hover:border-[#E1306C]">
              <span class="sr-only">Instagram</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
            </a>
            <a href="https://www.tiktok.com/@bolog.logistic" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-black hover:text-[#00f2fe] transition-colors shadow-sm hover:shadow-md border border-white/10 hover:border-[#00f2fe]">
              <span class="sr-only">TikTok</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
          </div>
        </div>

        <!-- Lado Derecho (Formulario) -->
        <div class="w-full lg:w-1/2 border-l border-white/10 p-8 lg:p-12 relative">
          <!-- Decoración sutil superior -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-primary-900/50 rounded-full translate-x-10 -translate-y-10 blur-xl pointer-events-none"></div>

          <h2 class="text-2xl font-extrabold text-white mb-2 drop-shadow-md" data-i18n="contact.formTitle">
            Solicitar una Cotización
          </h2>
          <p class="text-sm text-slate-300 mb-6" data-i18n="contact.formDesc">
            Completa los detalles a continuación y te responderemos pronto.
          </p>

          <form class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <!-- Fila 1 -->
              <div class="custom-select relative">
                <input type="hidden" name="service" class="custom-select-input" value="">
                <button type="button" class="custom-select-btn w-full flex items-center justify-between bg-slate-800/50 border border-slate-600/50 text-slate-300 rounded-lg pl-4 pr-3 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors">
                  <span class="custom-select-label truncate" data-i18n="contact.formService">Service</span>
                  <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div class="custom-select-menu absolute z-50 left-0 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible transition-all duration-200 transform scale-95 origin-top">
                  <ul class="py-2 text-slate-200 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-200 scrollbar-track-transparent">
                    <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="Freight Type">Freight Type</li>
                    <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="Road Transportation">Road Transportation</li>
                    <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="Air Transportation">Air Transportation</li>
                    <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="Sea Transportation">Sea Transportation</li>
                    <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="Warehousing">Warehousing</li>
                  </ul>
                </div>
              </div>
              <div>
                <input type="text" placeholder="Dimension" data-i18n-placeholder="contact.formDimension" class="w-full bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors" />
              </div>

              <!-- Fila 2 -->
              <div>
                <input type="text" placeholder="City of departure" data-i18n-placeholder="contact.formDeparture" class="w-full bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors" />
              </div>
              <div>
                <input type="email" placeholder="Email" data-i18n-placeholder="contact.formEmail" class="w-full bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors" />
              </div>

              <!-- Fila 3 y Textarea -->
              <div class="flex flex-col gap-4">
                <input type="text" placeholder="Delivery city" data-i18n-placeholder="contact.formDelivery" class="w-full bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors" />
                
                <div class="custom-select relative">
                  <input type="hidden" name="incoterms" class="custom-select-input" value="">
                  <button type="button" class="custom-select-btn w-full flex items-center justify-between bg-slate-800/50 border border-slate-600/50 text-slate-300 rounded-lg pl-4 pr-3 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors">
                    <span class="custom-select-label truncate" data-i18n="contact.formIncoterms">Incoterms</span>
                    <svg class="h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div class="custom-select-menu absolute z-50 left-0 w-full bottom-full mb-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible transition-all duration-200 transform scale-95 origin-bottom">
                    <ul class="py-2 text-slate-200 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-200 scrollbar-track-transparent">
                      <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="EXW">EXW</li>
                      <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="FCA">FCA</li>
                      <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="CPT">CPT</li>
                      <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="CIP">CIP</li>
                      <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="DAT">DAT</li>
                      <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="DAP">DAP</li>
                      <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="DDP">DDP</li>
                      <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="FAS">FAS</li>
                      <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="FOB">FOB</li>
                      <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="CFR">CFR</li>
                      <li class="px-4 py-2 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors" data-value="CIF">CIF</li>
                    </ul>
                  </div>
                </div>

                <input type="text" placeholder="Total gross weight (KG)" data-i18n-placeholder="contact.formWeight" class="w-full bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors" />
              </div>

              <div class="h-full">
                <textarea placeholder="Message" data-i18n-placeholder="contact.formMessage" class="w-full h-full min-h-[140px] bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors resize-none"></textarea>
              </div>

            </div>

            <div class="mt-6 flex justify-end">
              <button type="button" class="group relative px-8 py-3 font-extrabold text-white tracking-widest rounded-full bg-gradient-to-r from-sky-500 to-blue-600 overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.7)] transition-all duration-300 transform hover:-translate-y-1">
                <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
                <span class="relative z-10 flex items-center gap-2 drop-shadow-md">
                  <span data-i18n="contact.formSubmit">ENVIAR</span>
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </section>
`;

export function initQuoteForm() {
  const customSelects = document.querySelectorAll('.custom-select');

  customSelects.forEach(select => {
    const btn = select.querySelector('.custom-select-btn');
    const label = select.querySelector('.custom-select-label');
    const menu = select.querySelector('.custom-select-menu');
    const input = select.querySelector('.custom-select-input');
    const arrow = btn.querySelector('svg');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close other open menus
      document.querySelectorAll('.custom-select').forEach(otherSelect => {
        if (otherSelect !== select) {
          otherSelect.querySelector('.custom-select-menu').classList.remove('opacity-100', 'visible', 'scale-100');
          otherSelect.querySelector('.custom-select-menu').classList.add('opacity-0', 'invisible', 'scale-95');
          otherSelect.querySelector('.custom-select-btn svg').classList.remove('rotate-180');
        }
      });

      const isOpen = menu.classList.contains('opacity-100');
      if (isOpen) {
        menu.classList.remove('opacity-100', 'visible', 'scale-100');
        menu.classList.add('opacity-0', 'invisible', 'scale-95');
        arrow.classList.remove('rotate-180');
      } else {
        menu.classList.remove('opacity-0', 'invisible', 'scale-95');
        menu.classList.add('opacity-100', 'visible', 'scale-100');
        arrow.classList.add('rotate-180');
      }
    });

    menu.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', () => {
        const value = item.getAttribute('data-value');
        const text = item.innerText;
        label.innerText = text;
        label.classList.remove('text-slate-300', 'text-slate-500');
        label.classList.add('text-white');
        input.value = value;
        menu.classList.remove('opacity-100', 'visible', 'scale-100');
        menu.classList.add('opacity-0', 'invisible', 'scale-95');
        arrow.classList.remove('rotate-180');
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select').forEach(select => {
      const menu = select.querySelector('.custom-select-menu');
      const arrow = select.querySelector('.custom-select-btn svg');
      if (menu && arrow) {
        menu.classList.remove('opacity-100', 'visible', 'scale-100');
        menu.classList.add('opacity-0', 'invisible', 'scale-95');
        arrow.classList.remove('rotate-180');
      }
    });
  });
}
