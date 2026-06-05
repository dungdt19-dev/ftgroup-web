/**
 * Shared site header, mobile menu, footer & float actions — single source of truth.
 * @param {object} opts
 * @param {number} [opts.depth=0] 0 = site root (index, du-an), 1 = services/ or projects/
 * @param {'home'|'services'|'projects'|null} [opts.activeNav=null]
 */

export function assetPrefix(depth = 0) {
  return depth === 0 ? '' : '../';
}

const ZALO_ICON = 'assets/images/chung/zalo.webp';
const FB_ICON = 'assets/images/chung/fb.png';
const FB_URL = 'https://www.facebook.com/profile.php?id=61570255771094';

/** Official Zalo mark — footer social & floating button */
export function renderZaloIcon(depth = 0, { className = 'zalo-icon', size = 20 } = {}) {
  const src = `${assetPrefix(depth)}${ZALO_ICON}`;
  return `<img class="${className}" src="${src}" width="${size}" height="${size}" alt="" aria-hidden="true" loading="lazy" decoding="async">`;
}

/** Facebook page icon — footer social */
export function renderFacebookIcon(depth = 0, { className = 'social-icon', size = 22 } = {}) {
  const src = `${assetPrefix(depth)}${FB_ICON}`;
  return `<img class="${className}" src="${src}" width="${size}" height="${size}" alt="" aria-hidden="true" loading="lazy" decoding="async">`;
}

function navActive(active, key) {
  if (active !== key) return '';
  return ' class="nav-link--active" aria-current="page"';
}

export function renderSiteNav({ depth = 0, activeNav = null } = {}) {
  const p = assetPrefix(depth);
  const index = `${p}index.html`;
  const duAn = depth === 0 ? 'du-an.html' : `${p}du-an.html`;

  return `<header class="site-header" id="siteHeader">
  <a href="${index}#home" class="brand brand-with-logo" aria-label="FT GROUP E&amp;E — về trang chủ">
    <img class="brand-logo" src="${p}assets/images/logo.png" width="160" height="48" alt="Logo FT GROUP E&amp;E" loading="eager">
    <span class="brand-name">FT GROUP <span class="accent">E&amp;E</span></span>
  </a>
  <nav aria-label="Main navigation">
    <ul class="nav-links">
      <li><a href="${index}#home" data-nav="home"${navActive(activeNav, 'home')}>Trang chủ</a></li>
      <li><a href="${index}#company-intro" data-nav="intro">Giới thiệu</a></li>
      <li><a href="${index}#service-highlight" data-nav="services"${navActive(activeNav, 'services')}>Dịch vụ</a></li>
      <li><a href="${duAn}" data-nav="projects"${navActive(activeNav, 'projects')}>Dự án</a></li>
      <li><a href="${index}#contact" data-nav="contact">Liên hệ</a></li>
    </ul>
  </nav>
  <a href="tel:+84964236197" class="nav-cta">Gọi Ngay</a>
  <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileMenu">
    <span></span><span></span><span></span>
  </button>
</header>
<div class="mobile-menu" id="mobileMenu" role="dialog" aria-label="Mobile menu">
  <a href="${index}#home" data-nav="home"${navActive(activeNav, 'home')}>Trang chủ</a>
  <a href="${index}#company-intro" data-nav="intro">Giới thiệu</a>
  <a href="${index}#service-highlight" data-nav="services"${navActive(activeNav, 'services')}>Dịch vụ</a>
  <a href="${duAn}" data-nav="projects"${navActive(activeNav, 'projects')}>Dự án</a>
  <a href="${index}#contact" data-nav="contact">Liên hệ</a>
</div>`;
}

export function renderSiteFooter({ depth = 0 } = {}) {
  const p = assetPrefix(depth);
  const index = `${p}index.html`;
  const duAn = depth === 0 ? 'du-an.html' : `${p}du-an.html`;

  return `<footer class="site-footer" id="contact">
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="${index}#home" class="brand brand-with-logo brand-footer">
        <img class="brand-logo" src="${p}assets/images/logo.png" width="160" height="48" alt="Logo FT GROUP E&amp;E" loading="lazy">
        <span class="brand-name">FT GROUP <span class="accent">E&amp;E</span></span>
      </a>
      <p><strong>Công ty TNHH Du lịch Sự kiện và Giáo dục trải nghiệm FT Group</strong> — giáo dục trải nghiệm, tổ chức sự kiện trọn gói và thiết bị sân khấu.</p>
      <div class="footer-socials">
        <a href="mailto:ftgroup1929@gmail.com" class="social-btn" aria-label="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
        </a>
        <a href="https://zalo.me/0964236197" class="social-btn social-btn--zalo" aria-label="Zalo" target="_blank" rel="noopener">
          ${renderZaloIcon(depth, { size: 22 })}
        </a>
        <a href="${FB_URL}" class="social-btn social-btn--facebook" aria-label="Facebook" target="_blank" rel="noopener">
          ${renderFacebookIcon(depth, { size: 22 })}
        </a>
      </div>
    </div>

    <div class="footer-col">
      <h4>Điều hướng</h4>
      <ul>
        <li><a href="${index}#home">Trang chủ</a></li>
        <li><a href="${index}#service-highlight">Dịch vụ</a></li>
        <li><a href="${duAn}">Dự án</a></li>
        <li><a href="${index}#vision-mission">Tầm nhìn &amp; sứ mệnh</a></li>
        <li><a href="${index}#process">Quy trình</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Liên hệ</h4>
      <div class="contact-row">
        <span class="contact-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </span>
        <span>Thôn Đông, Tàm Xá, Đông Anh, Hà Nội</span>
      </div>
      <div class="contact-row">
        <span class="contact-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
        </span>
        <span><a href="tel:+84964236197">0964 236 197</a> · <a href="tel:+84382032759">0382 032 759</a></span>
      </div>
      <div class="contact-row">
        <span class="contact-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
        </span>
        <a href="mailto:ftgroup1929@gmail.com">ftgroup1929@gmail.com</a>
      </div>
      <div class="map-wrap">
        <iframe
          title="Bản đồ Thôn Đông, Tàm Xá, Đông Anh, Hà Nội"
          src="https://www.google.com/maps?q=Th%C3%B4n%20%C4%90%C3%B4ng%2C%20T%C3%A0m%20X%C3%A1%2C%20%C4%90%C3%B4ng%20Anh%2C%20H%C3%A0%20N%E1%BB%99i&output=embed"
          loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div>© <span id="currentYear">2026</span> FT GROUP E&amp;E. Bảo lưu mọi quyền.</div>
  </div>
</footer>`;
}

export function renderFloatStack({ depth = 0 } = {}) {
  return `<div class="float-stack" aria-label="Liên hệ nhanh">
  <a href="https://zalo.me/0964236197" class="float-btn float-zalo" target="_blank" rel="noopener" aria-label="Liên hệ Zalo">
    ${renderZaloIcon(depth, { className: 'zalo-icon zalo-icon--float', size: 48 })}
    <span class="float-tip">Liên hệ Zalo</span>
  </a>
  <a href="tel:+84964236197" class="float-btn float-call" aria-label="Gọi ngay">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
    <span class="float-tip">0964 236 197</span>
  </a>
</div>`;
}

export const CHROME_STYLES = `  <link rel="stylesheet" href="{{P}}css/header.css">
  <link rel="stylesheet" href="{{P}}css/navbar.css">
  <link rel="stylesheet" href="{{P}}css/footer.css">`;

export function renderChromeStyles(depth = 0) {
  const p = assetPrefix(depth);
  return CHROME_STYLES.replace(/\{\{P\}\}/g, p);
}
