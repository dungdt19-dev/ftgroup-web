/* Homepage cinematic gallery — lightbox only */
(function () {
  'use strict';

  const lb = document.getElementById('homeLightbox');
  if (!lb) return;

  const imgEl = lb.querySelector('.home-lb__img');
  const capEl = lb.querySelector('.home-lb__cap');
  const closeBtn = lb.querySelector('.home-lb__close');
  const prevBtn = lb.querySelector('.home-lb__prev');
  const nextBtn = lb.querySelector('.home-lb__next');

  const tiles = Array.from(document.querySelectorAll('.home-showcase-tile[data-full-src]'));
  if (!tiles.length || !imgEl) return;

  let idx = 0;

  function srcAt(i) {
    return tiles[i].getAttribute('data-full-src') || '';
  }

  function capAt(i) {
    return tiles[i].getAttribute('data-caption') || '';
  }

  function show(i) {
    idx = (i + tiles.length) % tiles.length;
    imgEl.src = srcAt(idx);
    imgEl.alt = capAt(idx);
    if (capEl) capEl.textContent = capAt(idx);
  }

  function open(i) {
    show(i);
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    imgEl.removeAttribute('src');
  }

  tiles.forEach((tile, i) => {
    tile.addEventListener('click', () => open(i));
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (prevBtn) prevBtn.addEventListener('click', () => show(idx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => show(idx + 1));

  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
