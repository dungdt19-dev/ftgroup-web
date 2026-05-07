/* =====================================================================
   ANIMATIONS — Scroll reveal & counter animations (IntersectionObserver)
   ===================================================================== */
(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .reveal-fade, .reveal-scale, .reveal-left')
      .forEach(el => el.classList.add('is-visible'));
    return;
  }

  /* ---------- Generic reveal ---------- */
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-fade, .reveal-scale, .reveal-left')
    .forEach(el => revealObserver.observe(el));

  /* ---------- Counter animation ---------- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1600;
    const start = performance.now();
    const suffix = el.dataset.suffix || '';
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      el.textContent = Math.floor(target * eased).toLocaleString('vi-VN') + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
})();
