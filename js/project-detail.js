/**
 * Project detail: image lightbox + related projects horizontal scroll.
 */
(function () {
  'use strict';

  var lb = document.getElementById('pdLightbox');
  if (!lb) return;

  var lbImg = lb.querySelector('.pd-lightbox__img');
  var btnClose = lb.querySelector('.pd-lightbox__close');
  var btnPrev = lb.querySelector('.pd-lightbox__prev');
  var btnNext = lb.querySelector('.pd-lightbox__next');
  var urls = [];
  var altTexts = [];
  var idx = 0;

  function gather() {
    urls = [];
    altTexts = [];
    document.querySelectorAll('a.pd-gl-item[href]').forEach(function (a) {
      urls.push(a.getAttribute('href'));
      var im = a.querySelector('img');
      altTexts.push(im ? im.getAttribute('alt') || '' : '');
    });
  }

  function showAt(i) {
    if (!urls.length) return;
    idx = (i + urls.length) % urls.length;
    if (lbImg) {
      lbImg.src = urls[idx];
      lbImg.alt = altTexts[idx] || '';
    }
  }

  function openFromAnchor(a) {
    gather();
    var href = a.getAttribute('href');
    idx = Math.max(0, urls.indexOf(href));
    showAt(idx);
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lbImg) lbImg.removeAttribute('src');
  }

  document.querySelectorAll('a.pd-gl-item').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      openFromAnchor(a);
    });
  });

  if (btnClose) btnClose.addEventListener('click', close);
  if (btnPrev) btnPrev.addEventListener('click', function () { showAt(idx - 1); });
  if (btnNext) btnNext.addEventListener('click', function () { showAt(idx + 1); });

  lb.addEventListener('click', function (e) {
    if (e.target === lb) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft' && btnPrev) showAt(idx - 1);
    if (e.key === 'ArrowRight' && btnNext) showAt(idx + 1);
  });

  var related = document.querySelector('[data-pd-related-rail]');
  if (related) {
    var track = related.querySelector('.pd-related-track');
    var prev = related.querySelector('.pd-rel-prev');
    var next = related.querySelector('.pd-rel-next');
    var step = function (dir) {
      if (!track) return;
      var w = Math.min(track.clientWidth * 0.85, 380);
      track.scrollBy({ left: dir * w, behavior: 'smooth' });
    };
    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });
  }
})();
