/**
 * DolarBCB - Componente del Tipo de Cambio Oficial BCB
 * Muestra el tipo de cambio BOB/USD obtenido desde la API del Banco Central de Bolivia.
 * Diseñado para insertarse inline junto a los botones del hero con indicación de vigencia en tiempo real.
 */

export const DolarBCB = `
  <div id="exchange-rate-widget" class="flex flex-col items-center justify-center px-5 py-4 sm:px-6 sm:py-5 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-sky-500/40 hover:bg-black/40 transition-all duration-300 cursor-default group text-center min-w-[124px] sm:min-w-[140px]" title="Tipo de Cambio Oficial publicado por el Banco Central de Bolivia (BCB)">
    <div class="flex items-center gap-1.5 mb-2">
      <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.9)] shrink-0"></div>
      <span class="text-[9px] sm:text-[10px] text-slate-300 font-bold uppercase tracking-widest whitespace-nowrap">BCB Oficial</span>
    </div>
    <div class="flex items-baseline justify-center gap-1">
      <span id="exchange-rate-value" class="text-3xl sm:text-4xl font-black text-sky-400 tabular-nums leading-none drop-shadow-md">—</span>
      <span class="text-[10px] sm:text-xs font-bold text-slate-400 self-end pb-0.5">Bs</span>
    </div>
    <div class="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-1">por USD</div>
    <div class="w-full h-px bg-white/10 my-2.5"></div>
    <span id="exchange-rate-date" class="text-[8px] sm:text-[9px] text-emerald-400 font-semibold tracking-wide truncate max-w-full">—</span>
  </div>
`;

export async function initDolarBCB() {
  const valueEl = document.getElementById('exchange-rate-value');
  const dateEl = document.getElementById('exchange-rate-date');
  const widget = document.getElementById('exchange-rate-widget');
  if (!valueEl || !dateEl) return;

  try {
    const res = await fetch('/api/exchange-rate/current');
    if (!res.ok) throw new Error();
    const data = await res.json();

    if (data.rate !== null && data.rate !== undefined) {
      // Fade-in animado del número
      valueEl.style.opacity = '0';
      valueEl.style.transition = 'opacity 0.5s ease';
      valueEl.textContent = Number(data.rate).toFixed(2);
      setTimeout(() => { valueEl.style.opacity = '1'; }, 50);

      if (data.date) {
        const recordedDate = new Date(data.date);
        const today = new Date();

        // Normalizar a fechas de medianoche para comparar días
        const recDay = new Date(recordedDate.getFullYear(), recordedDate.getMonth(), recordedDate.getDate());
        const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const diffDays = Math.round((todayDay - recDay) / (1000 * 60 * 60 * 24));

        let validityText = '';
        if (diffDays === 0) {
          // Publicado hoy
          validityText = `Vigente hoy · ${today.toLocaleDateString('es-BO', { day: 'numeric', month: 'short' })}`;
        } else if (diffDays > 0 && diffDays <= 3) {
          // Fin de semana o feriado con vigencia extendida
          const startDay = recDay.toLocaleDateString('es-BO', { day: 'numeric' });
          const endDay = today.toLocaleDateString('es-BO', { day: 'numeric', month: 'short' });
          validityText = `Vigente: ${startDay}–${endDay}`;
        } else {
          // Fecha estándar vigente
          validityText = `Vigente: ${today.toLocaleDateString('es-BO', { day: 'numeric', month: 'short' })}`;
        }

        dateEl.textContent = validityText;
        if (widget) {
          widget.setAttribute('title', `Tipo de Cambio Oficial BCB: ${Number(data.rate).toFixed(2)} Bs/USD (${validityText}). Publicado por el Banco Central de Bolivia.`);
        }
      }
    } else {
      valueEl.textContent = 'N/D';
      dateEl.textContent = '';
    }
  } catch {
    valueEl.textContent = 'N/D';
    dateEl.textContent = '';
  }
}

