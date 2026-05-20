import { writeFileSync, mkdirSync } from 'fs';
import { PROJECTS, PROJECT_GALLERY_COUNT } from './projects-data.mjs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  renderSiteNav,
  renderSiteFooter,
  renderFloatStack,
  renderChromeStyles,
} from './site-chrome.mjs';
import { decodeHtmlEntities } from './html-entities.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'projects');

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Plain text for HTML body (decoded UTF-8). */
function t(s) {
  return decodeHtmlEntities(String(s ?? ''));
}

/** Plain text safe for attributes. */
function attr(s) {
  return esc(t(s));
}

function stripTags(s) {
  return t(String(s).replace(/<[^>]*>/g, ''));
}

const PROCESS = [
  { t: 'Hoạch định', d: 'Khảo sát địa điểm, bản vẽ sơ bộ và rundown với khách hàng.' },
  { t: 'Lắp đặt', d: 'Truss, âm thanh, ánh sáng — kiểm tra tải điện và an toàn.' },
  { t: 'Duyệt chương trình', d: 'Dry-run MC, timing, cue ánh sáng và video.' },
  { t: 'Vận hành sự kiện', d: 'Điều phối tại sự kiện, xử lý linh hoạt tình huống.' },
  { t: 'Bàn giao', d: 'Hạ hình, thu dọn, nghiệm thu và ghi nhận phản hồi.' },
];

const RELATED_META = Object.fromEntries(
  PROJECTS.map((p) => [
    p.file,
    { title: p.cardTitle, cat: p.cat, thumb: p.thumb },
  ])
);

function infoCard(svgInner, label, value) {
  return (
    '<div class="pd-info-card reveal">' +
    '<div class="pd-info-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">' +
    svgInner +
    '</svg></div>' +
    '<div class="pd-info-card__text">' +
    '<h3 class="pd-info-card__label">' +
    label +
    '</h3>' +
    '<p class="pd-info-card__value">' +
    attr(value) +
    '</p></div></div>'
  );
}

function renderPage(p) {
  var canonical = 'https://ftgroup.vn/projects/' + p.file;
  var titlePlain = t(p.titlePlain);
  var descPlain = t(p.descPlain);
  var kwPlain = t(p.keywords);
  var h1Plain = stripTags(p.h1);

  var galleryHtml = p.gallery
    .slice(0, PROJECT_GALLERY_COUNT)
    .map(function (url, i) {
      return (
        '<a class="pd-gl-item" href="' +
        esc(url) +
        '"><img src="' +
        esc(url) +
        '" alt="' +
        attr(h1Plain) +
        ' — hình ' +
        (i + 1) +
        '" loading="lazy" decoding="async"></a>'
      );
    })
    .join('\n');

  var introHtml = p.intros
    .map(function (b) {
      return '<h3>' + t(b.h) + '</h3><p>' + t(b.p) + '</p>';
    })
    .join('\n');

  var processHtml = PROCESS.map(function (st, i) {
    return (
      '<div class="pd-step reveal" data-delay="' +
      ((i % 3) + 1) +
      '"><div class="pd-step-card"><span class="pd-step-num">' +
      (i + 1) +
      '</span><h3>' +
      t(st.t) +
      '</h3><p>' +
      t(st.d) +
      '</p></div></div>'
    );
  }).join('\n');

  var resultsLi = p.results.map(function (item) {
    return '<li>' + t(item) + '</li>';
  }).join('');

  var expParts = [];
  if (p.experienceBullets && p.experienceBullets.length) {
    expParts.push(
      '<ul class="pd-experience-list">' +
        p.experienceBullets
          .map(function (item) {
            return '<li>' + t(item) + '</li>';
          })
          .join('') +
        '</ul>'
    );
  }
  if (p.experienceQuote) {
    expParts.push('<blockquote class="pd-quote pd-quote--experience">' + t(p.experienceQuote) + '</blockquote>');
  }
  var experienceHtml =
    expParts.length > 0
      ? '<section class="pd-wrap pd-wrap--alt" aria-labelledby="exp-h">\n' +
        '<div class="pd-section-head">\n' +
        '<span class="eyebrow">Trải nghiệm</span>\n' +
        '<h2 id="exp-h">Trải nghiệm khách hàng</h2>\n' +
        '</div>\n' +
        expParts.join('\n') +
        '\n</section>'
      : '';

  var relatedHtml = p.related
    .map(function (f) {
      var m = RELATED_META[f];
      if (!m) return '';
      return (
        '<a class="pd-related-card" href="' +
        esc(f) +
        '"><img src="' +
        esc(m.thumb) +
        '" alt="' +
        attr(m.title) +
        '" width="340" height="160" loading="lazy"><div class="pd-related-card__body"><span>' +
        attr(m.cat) +
        '</span><strong>' +
        attr(m.title) +
        '</strong></div></a>'
      );
    })
    .join('\n');

  var ov = p.overview;
  var infoCards =
    infoCard('<path d="M12 2l8 4v6c0 5-3.4 9.2-8 10-4.6-.8-8-5-8-10V6l8-4z"/>', 'Tên dự án', ov.name) +
    infoCard('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>', 'Khách hàng', ov.client) +
    infoCard('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>', 'Địa điểm', ov.place) +
    infoCard('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', 'Thời gian tổ chức', ov.time) +
    infoCard('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>', 'Quy mô sự kiện', ov.scale) +
    infoCard('<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>', 'Dịch vụ cung cấp', ov.services);

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#0f0f10">
  <title>${esc(titlePlain)}</title>
  <meta name="description" content="${esc(descPlain)}">
  <meta name="keywords" content="${esc(kwPlain)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${esc(titlePlain)}">
  <meta property="og:description" content="${esc(descPlain)}">
  <meta property="og:image" content="${esc(p.hero)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/variables.css">
  <link rel="stylesheet" href="../css/animations.css">
${renderChromeStyles(1)}
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/responsive.css">
  <link rel="stylesheet" href="../css/projects.css">
  <link rel="icon" type="image/x-icon" href="../assets/images/logo.ico" sizes="any">
  <script type="application/ld+json">${JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: h1Plain,
      description: descPlain,
      url: canonical,
      creator: {
        '@type': 'Organization',
        name: 'Công ty TNHH Du lịch Sự kiện và Giáo dục trải nghiệm FT Group',
      },
    },
    null,
    2
  )}</script>
</head>
<body class="project-subpage">

${renderSiteNav({ depth: 1, activeNav: 'projects' })}

<main>
<article>
  <header class="pd-hero">
    <div class="pd-hero__bg" style="background-image:url('${esc(p.hero)}');"></div>
    <div class="pd-hero__tint" aria-hidden="true"></div>
    <div class="pd-hero__inner">
      <nav class="pd-breadcrumb" aria-label="Breadcrumb">
        <a href="../index.html#home">Trang chủ</a> · <a href="../du-an.html">Dự án tiêu biểu</a> · <span aria-current="page">${attr(h1Plain)}</span>
      </nav>
      <p class="pd-hero__cat">${t(p.cat)}</p>
      <h1>${t(p.h1)}</h1>
      <p class="pd-hero__sub">
        <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${t(p.loc)}</span>
      </p>
    </div>
  </header>

  <section class="pd-wrap pd-wrap--alt" aria-labelledby="ov-h">
    <div class="pd-section-head">
      <span class="eyebrow">Tổng quan</span>
      <h2 id="ov-h">Thông tin dự án</h2>
    </div>
    <div class="pd-info-grid">
      ${infoCards}
    </div>
  </section>

  <section class="pd-gallery-section" aria-labelledby="gal-h">
    <div class="pd-section-head">
      <span class="eyebrow">Thư viện hình</span>
      <h2 id="gal-h">Không gian &amp; cảm xúc sự kiện</h2>
    </div>
    <div class="pd-gallery-grid">${galleryHtml}</div>
  </section>

  <section class="pd-wrap" aria-labelledby="intro-h">
    <div class="pd-section-head">
      <h2 id="intro-h">Giới thiệu dự án</h2>
    </div>
    <div class="pd-intro-col">${introHtml}</div>
  </section>

  <section class="pd-process" aria-labelledby="proc-h">
    <div class="pd-section-head" style="text-align:center;">
      <span class="eyebrow">Quy trình</span>
      <h2 id="proc-h">Hành trình triển khai</h2>
    </div>
    <div class="pd-process-track">${processHtml}</div>
  </section>

  ${experienceHtml}

  <section class="pd-wrap pd-wrap--alt" aria-labelledby="res-h">
    <div class="pd-section-head">
      <span class="eyebrow">Kết quả</span>
      <h2 id="res-h">Hiệu quả &amp; phản hồi</h2>
    </div>
    <div class="pd-results-grid">
      <div class="pd-result-panel">
        <h3>Điểm sáng</h3>
        <ul class="pd-result-list">${resultsLi}</ul>
      </div>
      <div class="pd-result-panel">
        <h3>Cảm nhận khách hàng</h3>
        <p style="margin:0;color:var(--color-white-dim);line-height:1.7;">${t(p.feedback)}</p>
      </div>
    </div>
  </section>

  <section class="pd-related" aria-labelledby="rel-h">
    <div class="pd-section-head">
      <span class="eyebrow">Tiếp tục khám phá</span>
      <h2 id="rel-h">Dự án liên quan</h2>
    </div>
    <div class="pd-related-rail" data-pd-related-rail>
      <button type="button" class="pd-rel-nav pd-rel-prev" aria-label="Trước"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
      <div class="pd-related-track">${relatedHtml}</div>
      <button type="button" class="pd-rel-nav pd-rel-next" aria-label="Sau"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
    </div>
  </section>

  <section class="pd-cta reveal" aria-labelledby="cta-h">
    <h2 id="cta-h">Đồng hành cùng dự án tiếp theo</h2>
    <p>Tư vấn concept, báo giá theo hạng mục — phản hồi nhanh qua điện thoại &amp; Zalo.</p>
    <div class="pd-cta-actions">
      <a class="pd-btn pd-btn--primary" href="../index.html#contact">Liên hệ tư vấn</a>
      <a class="pd-btn pd-btn--ghost" href="mailto:ftgroup1929@gmail.com?subject=Báo%20giá%20dự%20án">Nhận báo giá</a>
      <a class="pd-btn pd-btn--ghost" href="tel:+84964236197">Gọi 0964 236 197</a>
      <a class="pd-btn pd-btn--ghost" href="https://zalo.me/0964236197" target="_blank" rel="noopener">Zalo</a>
    </div>
  </section>
</article>
</main>

<div class="pd-lightbox" id="pdLightbox" role="dialog" aria-modal="true" aria-hidden="true">
  <div class="pd-lightbox__inner">
    <button type="button" class="pd-lightbox__close" aria-label="Đóng">✕</button>
    <button type="button" class="pd-lightbox__prev" aria-label="Ảnh trước"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
    <img class="pd-lightbox__img" src="" alt="">
    <button type="button" class="pd-lightbox__next" aria-label="Ảnh sau"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
  </div>
</div>

${renderSiteFooter({ depth: 1 })}

${renderFloatStack({ depth: 1 })}

<script src="../js/navbar.js" defer></script>
<script src="../js/project-detail.js" defer></script>
<script src="../js/main.js" defer></script>
</body>
</html>`;
}

mkdirSync(outDir, { recursive: true });
PROJECTS.forEach(function (p) {
  writeFileSync(join(outDir, p.file), renderPage(p), 'utf8');
});
console.log('Wrote', PROJECTS.length, 'project pages');
