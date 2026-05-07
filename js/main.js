/* =====================================================================
   MAIN — YouTube facade loader, lightbox, init orchestration
   ===================================================================== */
(function () {
  'use strict';

  const lightbox        = document.getElementById('lightbox');
  const lightboxFrame   = document.getElementById('lightboxFrame');
  const lightboxClose   = document.querySelector('.lightbox-close');

  /* ---------- Build YouTube embed URL ---------- */
  function buildEmbedUrl(videoId, autoplay) {
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1'
    });
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  }

  /* ---------- YouTube facade — replace poster with iframe on click ---------- */
  document.querySelectorAll('.yt-facade').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.youtubeId;
      if (!id) return;
      // Inline play (used by hero/intro). When data-lightbox=true, open modal instead.
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

  /* ---------- Lightbox ---------- */
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

  // Open lightbox from any [data-open-video]
  document.querySelectorAll('[data-open-video]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openLightbox(btn.dataset.openVideo);
    });
  });

  // Open lightbox from reels (delegated)
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

  /* ---------- Image error fallback (if Unsplash 404s) ---------- */
  document.querySelectorAll('img[data-fallback]').forEach((img, i) => {
    img.addEventListener('error', function once() {
      img.removeEventListener('error', once);
      img.src = `https://picsum.photos/seed/event-${i}/800/${500 + (i * 31) % 250}`;
    });
  });

  /* ---------- Current year ---------- */
  const yr = document.getElementById('currentYear');
  if (yr) yr.textContent = new Date().getFullYear();
})();
