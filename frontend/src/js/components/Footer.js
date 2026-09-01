export const Footer = `
  <footer class="relative overflow-hidden bg-black border-t border-white/10 text-slate-300 py-16">
    <!-- Efecto degrade/resplandor azul desde abajo centro -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/40 blur-[100px] rounded-full pointer-events-none z-0"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8 mb-12">
        <div class="col-span-1 md:col-span-2">
          <div class="font-black text-3xl tracking-tighter mb-5">
            <span class="color-logo drop-shadow-sm">BOLOG</span>
          </div>
          <p class="mb-6 max-w-md text-slate-300 leading-relaxed" data-i18n="footer.desc">
            Agente de carga internacional con más de 20 años de experiencia, conectando a Bolivia y el mundo con cada carga, cada ruta y cada solución.
          </p>
          <div class="flex space-x-4">
            <!-- Social Icons -->
            <a href="javascript:void(0)" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors shadow-sm hover:shadow-md border border-white/10 hover:border-blue-500">
              <span class="sr-only">Facebook</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
            <a href="javascript:void(0)" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors shadow-sm hover:shadow-md border border-white/10 hover:border-blue-500">
              <span class="sr-only">Instagram</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
            </a>
            <a href="https://www.tiktok.com/@bolog.logistic" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors shadow-sm hover:shadow-md border border-white/10 hover:border-blue-500">
              <span class="sr-only">TikTok</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
          </div>
        </div>
        
        <div class="col-span-1">
          <h4 class="text-white font-bold mb-5 uppercase tracking-widest text-xs" data-i18n="footer.links">Enlaces Rápidos</h4>
          <ul class="space-y-2.5">
            <li><a href="#home" class="group text-slate-300 hover:text-sky-400 transition-colors flex items-center gap-3"><svg class="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg><span data-i18n="footer.home">Inicio</span></a></li>
            <li><a href="#services" class="group text-slate-300 hover:text-sky-400 transition-colors flex items-center gap-3"><svg class="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg><span data-i18n="footer.services">Servicios</span></a></li>
            <li><a href="#about" class="group text-slate-300 hover:text-sky-400 transition-colors flex items-center gap-3"><svg class="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span data-i18n="footer.about">Nosotros</span></a></li>
            <li><a href="#clients" class="group text-slate-300 hover:text-sky-400 transition-colors flex items-center gap-3"><svg class="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg><span data-i18n="footer.clients">Clientes</span></a></li>
            <li><a href="#news" class="group text-slate-300 hover:text-sky-400 transition-colors flex items-center gap-3"><svg class="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg><span data-i18n="footer.news">Noticias</span></a></li>
            <li><a href="#location" class="group text-slate-300 hover:text-sky-400 transition-colors flex items-center gap-3"><svg class="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><span data-i18n="footer.location">Ubicación</span></a></li>
            <li><a href="#tracking" class="group text-slate-300 hover:text-sky-400 transition-colors flex items-center gap-3"><svg class="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7"></path></svg><span data-i18n="footer.tracking">Seguimiento BLG</span></a></li>
            <li><a href="#contact" class="group text-slate-300 hover:text-sky-400 transition-colors flex items-center gap-3"><svg class="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg><span data-i18n="footer.contact">Contacto</span></a></li>
          </ul>
        </div>
        <div class="col-span-1 md:col-span-2">
          <h4 class="text-white font-bold mb-5 uppercase tracking-widest text-xs" data-i18n="footer.contactTitle">Contáctanos</h4>
          <ul class="space-y-3">
            <li class="flex items-start text-slate-300">
              <svg class="w-5 h-5 mr-3 mt-1 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span data-i18n="footer.address">Calle Capitán Ravelo Nro 267<br/>Edificio María Cristina, Piso 3, Oficina 3B<br/>(Entre calles Gaitia y Montevideo)</span>
            </li>
            <li class="flex items-center text-slate-300">
              <svg class="w-5 h-5 mr-3 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <a href="mailto:info@blg.com.bo" class="hover:text-primary-400 transition-colors">info@blg.com.bo</a>
            </li>
            <li class="flex items-center text-slate-300">
              <svg class="w-5 h-5 mr-3 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>2 2147305 – 2 2147384 / 78897815</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
        <p>&copy; ${new Date().getFullYear()} <span data-i18n="footer.rights">BOLOG Logistics Group S.R.L. Todos los derechos reservados.</span></p>
        <div class="mt-4 md:mt-0 flex gap-6">
          <a href="javascript:void(0)" class="hover:text-white cursor-default opacity-60 transition-colors" data-i18n="footer.privacy">Políticas de Privacidad</a>
          <a href="javascript:void(0)" class="hover:text-white cursor-default opacity-60 transition-colors" data-i18n="footer.terms">Términos de Servicio</a>
        </div>
      </div>
    </div>
  </footer>
`;
