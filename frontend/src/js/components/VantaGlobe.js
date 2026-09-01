export const VantaGlobe = (id = 'vanta-globe-bg') => `
  <div id="${id}" class="absolute top-0 left-0 w-full h-full overflow-hidden z-0"></div>
`;

export function initVantaGlobe(elementId = 'vanta-globe-bg') {
  const initEffect = () => {
    if (window.VANTA) {
      if (window.vantaGlobeEffect) {
        window.vantaGlobeEffect.destroy();
      }
      window.vantaGlobeEffect = window.VANTA.GLOBE({
        el: `#${elementId}`,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x22d3ee, // sky-400
        color2: 0x1d4ed8, // blue-700
        size: 1.30,
        backgroundColor: 0x0f172a // brand-dark (slate-900)
      });
    }
  };

  if (window.VANTA) {
    initEffect();
  } else {
    // Dynamic import to save bandwidth on public pages
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.globe.min.js";
    script.onload = initEffect;
    document.head.appendChild(script);
  }
}
