/* =====================================================================
   GALLERY — category filter
   Hidden items use display:none (see .is-hidden) so they leave layout flow.
   Grid uses auto-placement (no :nth-child grid areas) so visible cards
   always pack from the top with no blank bands after filtering.
   ===================================================================== */
(function () {
  'use strict';

  const root = document.getElementById('gallery');
  if (!root) return;

  const tabs = root.querySelectorAll('.gallery-tab');
  const items = root.querySelectorAll('.gallery-item, .project-card-featured');
  const grid = root.querySelector('.project-showcase-grid');

  if (!tabs.length || !items.length) return;

  let currentFilter = 'all';

  function applyFilter(filter) {
    items.forEach((item) => {
      const cats = (item.dataset.cat || '').split(/\s+/);
      const match = filter === 'all' || cats.includes(filter);
      item.classList.toggle('is-hidden', !match);
    });
    if (grid) {
      void grid.offsetWidth;
    }
  }

  function runFilterAnimation(filter) {
    if (!grid) {
      applyFilter(filter);
      return;
    }
    grid.classList.add('is-filter-animating');
    applyFilter(filter);
    void grid.offsetWidth;
    window.setTimeout(() => {
      grid.classList.remove('is-filter-animating');
    }, 480);
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter || 'all';
      if (filter === currentFilter) return;
      currentFilter = filter;

      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      runFilterAnimation(filter);
    });
  });

  const activeOnLoad = root.querySelector('.gallery-tab.is-active');
  if (activeOnLoad) {
    currentFilter = activeOnLoad.dataset.filter || 'all';
  }

  applyFilter(currentFilter);
})();
