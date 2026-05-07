/* =====================================================================
   ANIMATIONS — Scroll reveal & counters (IntersectionObserver)
   ===================================================================== */
(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right')
      .forEach(el => el.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right')
    .forEach(el => revealObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1600;
    const start = performance.now();
    const suffix = el.dataset.suffix || '';
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
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

/* =====================================================================
   MAIN — YouTube facade loader, lightbox, init
   ===================================================================== */
(function () {
  'use strict';

  const lightbox        = document.getElementById('lightbox');
  const lightboxFrame   = document.getElementById('lightboxFrame');
  const lightboxClose   = document.querySelector('.lightbox-close');

  function buildEmbedUrl(videoId, autoplay) {
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1'
    });
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  }

  document.querySelectorAll('.yt-facade').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.youtubeId;
      if (!id) return;
      if (el.dataset.lightbox === 'true') {
        openLightbox(id);
        return;
      }
      const iframe = document.createElement('iframe');
      iframe.src = buildEmbedUrl(id, true);
      iframe.title = el.dataset.title || 'YouTube video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      el.innerHTML = '';
      el.appendChild(iframe);
    }, { once: true });
  });

  function openLightbox(videoId) {
    if (!lightbox || !lightboxFrame) return;
    lightboxFrame.src = buildEmbedUrl(videoId, true);
    lightbox.classList.add('is-open');
    requestAnimationFrame(() => lightbox.classList.add('is-visible'));
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox || !lightboxFrame) return;
    lightboxFrame.src = '';
    lightbox.classList.remove('is-visible');
    setTimeout(() => lightbox.classList.remove('is-open'), 380);
    document.body.style.overflow = '';
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  document.querySelectorAll('[data-open-video]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openLightbox(btn.dataset.openVideo);
    });
  });

  document.querySelectorAll('.reel[data-youtube-id]').forEach(reel => {
    reel.addEventListener('click', () => openLightbox(reel.dataset.youtubeId));
    reel.setAttribute('role', 'button');
    reel.setAttribute('tabindex', '0');
    reel.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(reel.dataset.youtubeId);
      }
    });
  });

  document.querySelectorAll('img[data-fallback]').forEach((img, i) => {
    img.addEventListener('error', function once() {
      img.removeEventListener('error', once);
      img.src = `https://picsum.photos/seed/event-${i}/800/${500 + (i * 31) % 250}`;
    });
  });

  const yr = document.getElementById('currentYear');
  if (yr) yr.textContent = new Date().getFullYear();
})();
