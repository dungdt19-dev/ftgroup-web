/**
 * Dự án tạm ẩn khi chưa có ảnh thật (assets/images/du-an/<slug>/).
 * Bỏ slug khỏi mảng khi đã upload ảnh.
 */
(function () {
  'use strict';

  var SLUGS = [
    'dem-hoi-chao-tan-sinh-vien-khoa-du-lich',
    'dem-nhac-gieo-yeu-thuong',
    'chuyen-de-phong-chay-chua-chay',
    'chuyen-de-khoa-hoc-dieu-ki-a',
    'chuyen-de-khoa-hoc-dieu-ki-b',
    'teambuilding-vietinbank-bac-giang',
    'teambuilding-nha-khoa-nhu-ngoc'
  ];

  function slugFromHref(href) {
    if (!href) return '';
    var path = href;
    try {
      if (href.indexOf('://') !== -1 || href.charAt(0) === '/') {
        path = new URL(href, window.location.href).pathname;
      }
    } catch (e) { /* use path as-is */ }
    var base = path.split('/').pop() || path;
    return base.replace(/\.html$/i, '');
  }

  function isNoPhotos(href) {
    return SLUGS.indexOf(slugFromHref(href)) !== -1;
  }

  window.FT_PROJECT_IS_NO_PHOTOS = isNoPhotos;

  document.querySelectorAll('.pd-related-card[href]').forEach(function (card) {
    if (!isNoPhotos(card.getAttribute('href'))) return;
    card.hidden = true;
    card.setAttribute('data-no-photos', '');
  });

  document.querySelectorAll('.pd-related').forEach(function (section) {
    var visible = section.querySelectorAll('.pd-related-card:not([hidden])');
    if (!visible.length) section.hidden = true;
  });
})();
