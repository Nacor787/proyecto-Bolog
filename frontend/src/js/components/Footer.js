import { CLOUDINARY_INSIGNE } from '../utils/cloudinary.js';

export const Footer = `
  <footer class="relative overflow-hidden bg-black border-t border-white/10 text-slate-300 py-16">
    <!-- Efecto degrade/resplandor azul desde abajo centro -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/40 blur-[100px] rounded-full pointer-events-none z-0"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Insignias Empresariales -->
      <div class="pb-12 mb-12 border-b border-white/10">
        <h4 class="text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8" data-i18n="footer.certifications">Membresías y Certificaciones</h4>
        <div class="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          ${CLOUDINARY_INSIGNE.map(item => `
            <div class="group relative flex items-center justify-center">
              <img src="${item.logo}" alt="${item.name}" class="h-16 md:h-20 lg:h-24 w-40 md:w-48 lg:w-56 object-contain bg-white p-2 md:p-3 rounded-xl opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 hover:scale-105" title="${item.name}" />
            </div>
          `).join('')}
        </div>
      </div>

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
            <a href="https://wa.me/59178897815" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors shadow-sm hover:shadow-md border border-white/10 hover:border-[#25D366]">
              <span class="sr-only">WhatsApp</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 21.055a8.94 8.94 0 0 1-4.57-1.25l-.33-.2-3.4.89.9-3.32-.21-.34a8.955 8.955 0 0 1-1.37-4.78 8.973 8.973 0 1 1 8.98 8.99v.01zm0-16a7.07 7.07 0 1 0 7.08 7.07 7.08 7.08 0 0 0-7.08-7.07zm3.87 9.69c-.21-.11-1.25-.62-1.44-.69-.2-.07-.34-.11-.48.11-.14.22-.55.69-.67.83-.12.14-.24.16-.45.05-.21-.11-.9-.33-1.71-1.05-.63-.56-1.06-1.26-1.18-1.47-.12-.22-.01-.33.09-.44.1-.1.21-.24.32-.36.11-.12.14-.2.21-.34.07-.13.04-.25-.01-.36-.06-.11-.48-1.16-.66-1.59-.18-.42-.36-.36-.48-.37h-.41c-.14 0-.38.05-.58.27-.2.22-.76.75-.76 1.83 0 1.08.78 2.12.89 2.27.11.15 1.55 2.37 3.75 3.32.52.22.93.36 1.25.46.52.17.99.14 1.37.09.43-.06 1.25-.51 1.43-1.01.17-.5.17-.92.12-1.01-.05-.09-.18-.14-.4-.25z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@bolog.logistic" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-black hover:text-[#00f2fe] transition-colors shadow-sm hover:shadow-md border border-white/10 hover:border-[#00f2fe]">
              <span class="sr-only">TikTok</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100063732482298&locale=es_LA" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors shadow-sm hover:shadow-md border border-white/10 hover:border-[#1877F2]">
              <span class="sr-only">Facebook</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
            </a>
          </div>
        </div>
        
        <div class="col-span-1">
          <h4 class="text-white font-bold mb-5 uppercase tracking-widest text-xs" data-i18n="footer.links">Enlaces Rápidos</h4>
          <ul class="space-y-2">
            <li><a href="#home" class="text-sm text-slate-400 hover:text-white transition-colors inline-block"><span data-i18n="footer.home">Inicio</span></a></li>
            <li><a href="#coverage" class="text-sm text-slate-400 hover:text-white transition-colors inline-block"><span data-i18n="footer.coverage">Cobertura</span></a></li>
            <li><a href="#services" class="text-sm text-slate-400 hover:text-white transition-colors inline-block"><span data-i18n="footer.services">Servicios</span></a></li>
            <li><a href="#clients" class="text-sm text-slate-400 hover:text-white transition-colors inline-block"><span data-i18n="footer.clients">Clientes</span></a></li>
            <li><a href="#contact" class="text-sm text-slate-400 hover:text-white transition-colors inline-block"><span data-i18n="footer.contact">Contacto</span></a></li>
            <li><a href="#location" class="text-sm text-slate-400 hover:text-white transition-colors inline-block"><span data-i18n="footer.location">Ubicación</span></a></li>
            <li><a href="#about" class="text-sm text-slate-400 hover:text-white transition-colors inline-block"><span data-i18n="footer.about">Nosotros</span></a></li>
            <li><a href="#news" class="text-sm text-slate-400 hover:text-white transition-colors inline-block"><span data-i18n="footer.news">Noticias</span></a></li>
            <li><a href="#tracking" class="text-sm text-slate-400 hover:text-white transition-colors inline-block"><span data-i18n="footer.tracking">Seguimiento BLG</span></a></li>
          </ul>
        </div>
        <div class="col-span-1 md:col-span-2">
          <h4 class="text-white font-bold mb-5 uppercase tracking-widest text-xs" data-i18n="footer.contactTitle">Contáctanos</h4>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start text-slate-400">
              <svg class="w-4 h-4 mr-3 mt-0.5 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span data-i18n="footer.address">Calle Capitán Ravelo Nro 267<br/>Edificio María Cristina, Piso 3, Oficina 3B<br/>(Entre calles Gaitia y Montevideo)</span>
            </li>
            <li class="flex items-center text-slate-400">
              <svg class="w-4 h-4 mr-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <a href="mailto:info@blg.com.bo" class="hover:text-white transition-colors">info@blg.com.bo</a>
            </li>
            <li class="flex items-center text-slate-400">
              <svg class="w-4 h-4 mr-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>2 2147305 – 2 2147384 / 78897815</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-center items-center text-xs text-slate-400 text-center w-full">
      
      <!-- COPYRIGHT AL CENTRO POR EL MOMENTO-->
        <p class="w-full text-center">&copy; ${new Date().getFullYear()} <span data-i18n="footer.rights">BOLOG Logistics Group S.R.L. Todos los derechos reservados.</span></p>
        
        <!-- COMENTADO PARA FUTURA IMPLEMENTACION
        <div class="mt-4 md:mt-0 flex gap-6">
          <a href="javascript:void(0)" class="hover:text-white cursor-default opacity-60 transition-colors" data-i18n="footer.privacy">Políticas de Privacidad</a>
          <a href="javascript:void(0)" class="hover:text-white cursor-default opacity-60 transition-colors" data-i18n="footer.terms">Términos de Servicio</a>
        </div>
        -->

      </div>
    </div>
  </footer>
`;
