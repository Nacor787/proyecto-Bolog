export const Stats = `
  <section id="stats" class="pb-16 bg-transparent relative z-20">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div id="stats-panel" class="relative rounded-3xl p-6 sm:p-8 bg-sky-900/10 backdrop-blur-md border border-white/10 shadow-lg" data-aos="fade-up">
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          
          <!-- Stat 1 -->
          <div class="stat-item flex flex-col items-center text-center pt-4 sm:pt-0 sm:px-4">
            <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 mb-3 shadow-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div class="flex items-baseline gap-0.5 mb-1">
              <span class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">+</span>
              <span class="stats-counter text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight" data-target="20">0</span>
            </div>
            <div class="text-[10px] sm:text-xs font-semibold text-sky-400 uppercase tracking-widest">Años de Experiencia</div>
          </div>

          <!-- Stat 2 -->
          <div class="stat-item flex flex-col items-center text-center pt-4 sm:pt-0 sm:px-4">
            <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 mb-3 shadow-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <div class="flex items-baseline gap-0.5 mb-1">
              <span class="stats-counter text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight" data-target="150">0</span>
              <span class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sky-400 tracking-tight">+</span>
            </div>
            <div class="text-[10px] sm:text-xs font-semibold text-sky-400 uppercase tracking-widest" data-i18n="stats.clients">Clientes Corporativos</div>
          </div>

          <!-- Stat 3 -->
          <div class="stat-item flex flex-col items-center text-center pt-4 sm:pt-0 sm:px-4">
            <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 mb-3 shadow-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div class="flex items-baseline gap-0.5 mb-1">
              <span class="stats-counter text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight" data-target="5000">0</span>
              <span class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sky-400 tracking-tight">+</span>
            </div>
            <div class="text-[10px] sm:text-xs font-semibold text-sky-400 uppercase tracking-widest" data-i18n="stats.partners">Agentes Globales</div>
          </div>

          <!-- Stat 4 -->
          <div class="stat-item flex flex-col items-center text-center pt-4 sm:pt-0 sm:px-4">
            <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 mb-3 shadow-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div class="flex items-baseline gap-0.5 mb-1">
              <span class="stats-counter text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight" data-target="1206">0</span>
              <span class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sky-400 tracking-tight">+</span>
            </div>
            <div class="text-[10px] sm:text-xs font-semibold text-sky-400 uppercase tracking-widest" data-i18n="stats.operations">Operaciones Exitosas</div>
          </div>

        </div>

      </div>
    </div>
  </section>
`;

export function initStats() {
  const statsPanel = document.getElementById("stats-panel");
  const statCounters = document.querySelectorAll(".stats-counter");
  if (!statsPanel || statCounters.length === 0) return;

  let hasAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statCounters.forEach((counter) => {
          const targetValue = parseInt(counter.getAttribute("data-target"), 10) || 0;
          let count = 0;
          const duration = 2000;
          const frameRate = 1000 / 60;
          const totalFrames = Math.round(duration / frameRate);
          const increment = targetValue / totalFrames;

          const updateCount = () => {
            count += increment;
            if (count < targetValue) {
              counter.textContent = Math.ceil(count).toLocaleString();
              requestAnimationFrame(updateCount);
            } else {
              counter.textContent = targetValue.toLocaleString();
            }
          };

          requestAnimationFrame(updateCount);
        });
        observer.unobserve(statsPanel);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(statsPanel);
}
