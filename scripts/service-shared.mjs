/**
 * Shared HTML fragments for service detail pages (gallery, contact form, lightbox).
 */
import { getGallery } from './gallery-pools.mjs';
import { getServiceGalleryImages } from './service-images.mjs';

/** Maps service id → gallery-pools.mjs key */
export const SERVICE_GALLERY_POOL = {
  'khai-truong': 'opening',
  'khoi-cong-khanh-thanh': 'opening',
  'ra-mat-san-pham': 'opening',
  'in-quang-cao': 'opening',
  'tiec-cuoi-nam': 'concert',
  'hoi-nghi': 'concert',
  'hoi-thao': 'concert',
  'ky-niem-thanh-lap': 'concert',
  'to-chuc-su-kien': 'concert',
  'cho-thue-thiet-bi': 'equipment',
  'thiet-bi-san-khau': 'equipment',
  'cung-cap-nhan-su': 'team',
  'dao-cu-teambuilding': 'team',
  'san-xuat-dao-cu': 'team',
  'trai-nghiem-tai-truong': 'school',
};

export function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function getServiceImages(serviceId, count = 9) {
  const local = getServiceGalleryImages(serviceId, count);
  if (local.length) return local;

  const poolKey = SERVICE_GALLERY_POOL[serviceId] || 'concert';
  const pool = getGallery(poolKey);
  const out = [];
  for (let i = 0; i < count; i++) out.push(pool[i % pool.length]);
  return out;
}

export function renderMasonryGallery(serviceId, serviceTitle) {
  const images = getServiceImages(serviceId, 9);
  const title = escHtml(serviceTitle);
  const items = images
    .map((url, i) => {
      const isRemote = /^https?:\/\//i.test(url);
      const full = isRemote ? url.replace(/w=\d+/, 'w=1920').replace(/q=\d+/, 'q=82') : url;
      const thumb = url;
      const alt = `${title} — hình ${i + 1}`;
      return `        <a class="srv-gl-item" href="${escHtml(full)}" data-srv-lightbox>
          <img src="${escHtml(thumb)}" alt="${escHtml(alt)}" loading="lazy" decoding="async">
          <span class="srv-gl-item__overlay" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1"/></svg>
          </span>
        </a>`;
    })
    .join('\n');

  return `    <section class="srv-gallery-section srv-gallery-section--prominent" aria-labelledby="srv-gallery-heading" data-srv-gallery-grid>
      <div class="srv-section-head srv-section-head--compact">
        <span class="srv-section-eyebrow">Thư viện hình ảnh</span>
        <h2 id="srv-gallery-heading">Hình ảnh triển khai</h2>
      </div>
      <div class="srv-gallery-grid">
${items}
      </div>
    </section>`;
}

/** Scannable benefit chips — right below hero */
export function renderBenefitsStrip(benefits) {
  const items = benefits
    .map(
      (b) => `        <li class="srv-glance-card">
          <span class="srv-glance-card__icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg></span>
          <div>
            <strong>${b.t}</strong>
            <p>${b.d}</p>
          </div>
        </li>`
    )
    .join('\n');

  return `    <section class="srv-glance" aria-label="Giá trị cốt lõi">
      <ul class="srv-glance-grid">
${items}
      </ul>
    </section>`;
}

/** Compact CTA — no form until backend is ready */
export function renderContactCta(serviceLabel) {
  const subject = encodeURIComponent('Báo giá / Tư vấn — ' + serviceLabel);
  return `    <section class="srv-cta reveal" id="srv-contact" aria-labelledby="cta-heading">
      <h2 id="cta-heading">Liên hệ tư vấn</h2>
      <p>Gọi hotline, chat Zalo hoặc gửi email — đội ngũ FT GROUP E&amp;E tư vấn <strong>${escHtml(serviceLabel)}</strong> và báo giá sơ bộ.</p>
      <div class="srv-cta-actions">
        <a class="srv-btn srv-btn--primary" href="mailto:ftgroup1929@gmail.com?subject=${subject}">Yêu cầu báo giá</a>
        <a class="srv-btn srv-btn--ghost" href="https://zalo.me/0964236197" target="_blank" rel="noopener">Liên hệ Zalo</a>
        <a class="srv-btn srv-btn--ghost" href="tel:+84964236197">Gọi 0964 236 197</a>
      </div>
    </section>`;
}

export function renderLightboxMarkup() {
  return `<div class="srv-lightbox" id="srvLightbox" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Xem ảnh lớn">
  <div class="srv-lightbox__inner">
    <button type="button" class="srv-lightbox__close" aria-label="Đóng">✕</button>
    <button type="button" class="srv-lightbox__prev" aria-label="Ảnh trước"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
    <img class="srv-lightbox__img" src="" alt="">
    <button type="button" class="srv-lightbox__next" aria-label="Ảnh sau"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
  </div>
</div>`;
}

export const SERVICE_PAGE_ASSETS = `  <link rel="stylesheet" href="../css/shared-gallery.css">`;

export const SERVICE_PAGE_SCRIPTS = `<script src="../js/service-gallery.js" defer></script>`;
