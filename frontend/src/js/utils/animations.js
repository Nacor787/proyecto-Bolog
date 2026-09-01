let observer = null;

/**
 * Initializes and observes all elements with data-aos or data-gsap attributes.
 * Recreates the exact silky smooth, organic entrance of AOS without external library bloat.
 */
export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll('[data-aos], [data-gsap]');
  if (elements.length === 0) return;

  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delayMs = parseInt(el.getAttribute('data-aos-delay') || el.getAttribute('data-gsap-delay') || '0', 10);
        const durationMs = parseInt(el.getAttribute('data-aos-duration') || el.getAttribute('data-gsap-duration') || '800', 10);
        
        el.style.transitionDuration = `${durationMs}ms`;
        if (delayMs > 0) {
          el.style.transitionDelay = `${delayMs}ms`;
        }
        
        el.classList.add('aos-animate');
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px'
  });

  elements.forEach((el) => {
    const delayMs = parseInt(el.getAttribute('data-aos-delay') || el.getAttribute('data-gsap-delay') || '0', 10);
    const durationMs = parseInt(el.getAttribute('data-aos-duration') || el.getAttribute('data-gsap-duration') || '800', 10);
    el.style.transitionDuration = `${durationMs}ms`;

    const rect = el.getBoundingClientRect();
    // If element is already in the initial screen on page load, trigger with its natural stagger
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(() => {
        el.classList.add('aos-animate');
      }, delayMs > 0 ? delayMs : 60);
    } else {
      observer.observe(el);
    }
  });
}

/**
 * Re-scans the DOM for newly added elements (replaces AOS.refresh())
 */
export function refreshScrollAnimations() {
  setTimeout(() => {
    initScrollAnimations();
  }, 60);
}

// Global window shim for backward compatibility with existing calls
if (typeof window !== 'undefined') {
  window.AOS = {
    init: initScrollAnimations,
    refresh: refreshScrollAnimations,
    refreshHard: refreshScrollAnimations
  };
}
