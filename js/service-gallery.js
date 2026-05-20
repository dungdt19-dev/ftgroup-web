/**
 * Service detail pages — masonry gallery lightbox.
 */
(function () {
  'use strict';

  var lb = document.getElementById('srvLightbox');
  if (!lb) return;

  var lbImg = lb.querySelector('.srv-lightbox__img');
  var btnClose = lb.querySelector('.srv-lightbox__close');
  var btnPrev = lb.querySelector('.srv-lightbox__prev');
  var btnNext = lb.querySelector('.srv-lightbox__next');
  var urls = [];
  var altTexts = [];
  var idx = 0;

  function gather() {
    urls = [];
    altTexts = [];
    document.querySelectorAll('a.srv-gl-item[href][data-srv-lightbox]').forEach(function (a) {
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

  document.querySelectorAll('a.srv-gl-item[data-srv-lightbox]').forEach(function (a) {
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
    if (e.key === 'ArrowLeft') showAt(idx - 1);
    if (e.key === 'ArrowRight') showAt(idx + 1);
  });
})();
