/* =====================================================================
   NAVBAR — sticky scroll + mobile menu + smooth scroll (same document)
   ===================================================================== */
(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  const menuLinks = menu ? menu.querySelectorAll('a') : [];

  if (header) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          header.classList.toggle('is-scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function setMenu(open) {
    if (!menu || !toggle) return;
    menu.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (toggle) toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  menuLinks.forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  const navH = () => (header ? header.offsetHeight : 72);

  function scrollToHash(hash) {
    if (!hash || hash.length < 2) return;
    const target = document.querySelector(hash);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - navH() + 4;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  window.addEventListener(
    'DOMContentLoaded',
    () => {
      if (window.location.hash && document.querySelector(window.location.hash)) {
        requestAnimationFrame(() => scrollToHash(window.location.hash));
      }
    },
    { once: true }
  );

  function sameDocument(url, here) {
    const a = url.pathname;
    const b = here.pathname;
    const rootA = a === '/' || a === '' || /index\.html$/i.test(a);
    const rootB = b === '/' || b === '' || /index\.html$/i.test(b);
    if (rootA && rootB) return true;
    return a === b;
  }

  function navKeyFromLocation() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const file = path.split('/').pop() || 'index.html';
    if (path.includes('/projects/') || file === 'du-an.html') return 'projects';
    if (path.includes('/services/')) return 'services';
    if (file === 'index.html' || file === '' || !/\.html$/i.test(file)) {
      const hash = window.location.hash;
      if (hash === '#service-highlight') return 'services';
      if (hash === '#contact') return 'contact';
      if (hash === '#company-intro') return 'intro';
      return 'home';
    }
    return null;
  }

  function applyActiveNav(key) {
    if (!key) return;
    document.querySelectorAll('.nav-links [data-nav], .mobile-menu [data-nav]').forEach((link) => {
      const on = link.getAttribute('data-nav') === key;
      link.classList.toggle('nav-link--active', on);
      if (on) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  applyActiveNav(navKeyFromLocation());
  window.addEventListener('hashchange', () => applyActiveNav(navKeyFromLocation()));

  document.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

      let url;
      try {
        url = new URL(href, window.location.href);
      } catch (_) {
        return;
      }

      const here = new URL(window.location.href);
      if (url.origin !== here.origin) return;
      if (!sameDocument(url, here)) return;
      if (!url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();
      scrollToHash(url.hash);
    });
  });
})();
