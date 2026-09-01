export const ServicesStrip = `
  <section class="bg-[#1a2d4e] py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">

        <!-- Road Freight -->
        <div class="flex flex-col items-center py-6 px-4 group cursor-pointer">
          <div class="relative w-16 h-16 mb-4 flex items-center justify-center">
            <svg class="w-12 h-12 text-slate-400 group-hover:text-sky-400 transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="1.3" viewBox="0 0 24 24">
              <!-- Truck cab: slides right on hover -->
              <path class="transition-transform duration-300 group-hover:translate-x-0.5" stroke-linecap="round" stroke-linejoin="round" d="M14 8h4l3 3v5h-7V8z"/>
              <!-- Truck body: slides right -->
              <path class="transition-transform duration-300 group-hover:translate-x-0.5" stroke-linecap="round" stroke-linejoin="round" d="M1 5h13v11H1z"/>
              <!-- Wheels: scale up -->
              <circle class="transition-transform duration-300 group-hover:scale-110" style="transform-origin: 5.5px 18.5px" cx="5.5" cy="18.5" r="2"/>
              <circle class="transition-transform duration-300 group-hover:scale-110" style="transform-origin: 18.5px 18.5px" cx="18.5" cy="18.5" r="2"/>
            </svg>
          </div>
          <span class="text-white font-semibold text-sm tracking-wide group-hover:text-sky-400 transition-colors duration-300" data-i18n="services.land">Road Freight</span>
        </div>

        <!-- Air Freight -->
        <div class="flex flex-col items-center py-6 px-4 group cursor-pointer">
          <div class="relative w-16 h-16 mb-4 flex items-center justify-center">
            <svg class="w-12 h-12 text-slate-400 group-hover:text-sky-400 transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="1.3" viewBox="0 0 24 24">
              <!-- Plane body: rises up slightly on hover -->
              <path class="transition-transform duration-300 group-hover:-translate-y-1" stroke-linecap="round" stroke-linejoin="round" d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
          </div>
          <span class="text-white font-semibold text-sm tracking-wide group-hover:text-sky-400 transition-colors duration-300" data-i18n="services.air">Air Freight</span>
        </div>

        <!-- Sea Freight -->
        <div class="flex flex-col items-center py-6 px-4 group cursor-pointer">
          <div class="relative w-16 h-16 mb-4 flex items-center justify-center">
            <svg class="w-12 h-12 text-slate-400 group-hover:text-sky-400 transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="1.3" viewBox="0 0 24 24">
              <!-- Hull: rocks slightly (translate) on hover -->
              <path class="transition-transform duration-300 group-hover:translate-y-0.5" stroke-linecap="round" stroke-linejoin="round" d="M2 20c2 2 4 2 6 0s4-2 6 0 4 2 6 0"/>
              <!-- Ship body -->
              <path class="transition-transform duration-300 group-hover:translate-y-0.5" stroke-linecap="round" stroke-linejoin="round" d="M6 17l2-7h8l2 7"/>
              <!-- Mast: rises on hover -->
              <path class="transition-transform duration-300 group-hover:-translate-y-0.5" stroke-linecap="round" stroke-linejoin="round" d="M12 10V4m-3 6l3-5 3 5"/>
            </svg>
          </div>
          <span class="text-white font-semibold text-sm tracking-wide group-hover:text-sky-400 transition-colors duration-300" data-i18n="services.sea">Sea Freight</span>
        </div>

        <!-- Warehousing -->
        <div class="flex flex-col items-center py-6 px-4 group cursor-pointer">
          <div class="relative w-16 h-16 mb-4 flex items-center justify-center">
            <svg class="w-12 h-12 text-slate-400 group-hover:text-sky-400 transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="1.3" viewBox="0 0 24 24">
              <!-- Roof: slides down from top on hover -->
              <path class="transition-transform duration-300 group-hover:translate-y-0 -translate-y-1" stroke-linecap="round" stroke-linejoin="round" d="M3 9.5L12 3l9 6.5"/>
              <!-- Building walls -->
              <path class="transition-opacity duration-300 group-hover:opacity-100 opacity-80" stroke-linecap="round" stroke-linejoin="round" d="M4 10v11h16V10"/>
              <!-- Door -->
              <path class="transition-transform duration-300 group-hover:translate-y-0 translate-y-0.5" stroke-linecap="round" stroke-linejoin="round" d="M10 21v-6h4v6"/>
              <!-- Windows: appear on hover -->
              <path class="transition-opacity duration-300 group-hover:opacity-100 opacity-0" stroke-linecap="round" stroke-linejoin="round" d="M8 13h2v2H8zm6 0h2v2h-2z"/>
            </svg>
          </div>
          <span class="text-white font-semibold text-sm tracking-wide group-hover:text-sky-400 transition-colors duration-300" data-i18n="services.storage">Warehousing</span>
        </div>

      </div>
    </div>
  </section>
`;
