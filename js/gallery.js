/* =====================================================================
   GALLERY — category filter (no DOM rebuild — content stays SEO-friendly)
   ===================================================================== */
(function () {
  'use strict';

  const tabs  = document.querySelectorAll('.gallery-tab');
  const items = document.querySelectorAll('.gallery-item');
  if (!tabs.length || !items.length) return;

  function applyFilter(filter) {
    items.forEach(item => {
      const cats = (item.dataset.cat || '').split(/\s+/);
      const match = filter === 'all' || cats.includes(filter);
      item.classList.toggle('is-hidden', !match);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      applyFilter(tab.dataset.filter || 'all');
    });
  });
})();
