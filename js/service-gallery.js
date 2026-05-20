/**
 * Horizontal gallery controls for service detail pages.
 * Progressive enhancement: rail still scrolls without JS.
 */
(function () {
  document.querySelectorAll('[data-srv-gallery]').forEach(function (root) {
    var rail = root.querySelector('.srv-gallery-rail');
    var prev = root.querySelector('.srv-gallery-prev');
    var next = root.querySelector('.srv-gallery-next');
    if (!rail) return;

    var step = function (dir) {
      var amount = Math.min(rail.clientWidth * 0.92, 480);
      rail.scrollBy({ left: dir * amount, behavior: 'smooth' });
    };

    if (prev) {
      prev.addEventListener('click', function () {
        step(-1);
      });
    }
    if (next) {
      next.addEventListener('click', function () {
        step(1);
      });
    }
  });
})();
