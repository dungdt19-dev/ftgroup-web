import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, '..', 'services');

const navBlock = `<header class="site-header" id="siteHeader">
  <a href="../index.html#home" class="brand brand-with-logo" aria-label="FT GROUP E&amp;E — về trang chủ">
    <img class="brand-logo" src="../assets/images/logo.png" width="160" height="48" alt="Logo FT GROUP E&amp;E" loading="eager">
    <span class="brand-name">FT GROUP <span class="accent">E&amp;E</span></span>
  </a>
  <nav aria-label="Main navigation">
    <ul class="nav-links">
      <li><a href="../index.html#home">Trang chủ</a></li>
      <li><a href="../index.html#company-intro">Giới thiệu</a></li>
      <li><a href="../index.html#service-highlight">Dịch vụ</a></li>
      <li><a href="../du-an.html">Dự án</a></li>
      <li><a href="../index.html#team">Đội ngũ</a></li>
      <li><a href="../index.html#contact">Liên hệ</a></li>
    </ul>
  </nav>
  <a href="tel:+84964236197" class="nav-cta">Gọi Ngay</a>
  <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileMenu">
    <span></span><span></span><span></span>
  </button>
</header>
<div class="mobile-menu" id="mobileMenu" role="dialog" aria-label="Mobile menu">
  <a href="../index.html#home">Trang chủ</a>
  <a href="../index.html#company-intro">Giới thiệu</a>
  <a href="../index.html#service-highlight">Dịch vụ</a>
  <a href="../du-an.html">Dự án</a>
  <a href="../index.html#team">Đội ngũ</a>
  <a href="../index.html#contact">Liên hệ</a>
</div>`;

const headerRe =
  /<header class="site-header"[\s\S]*?<\/header>\s*<div class="mobile-menu" id="mobileMenu"[\s\S]*?<\/div>/;

for (const f of readdirSync(dir)) {
  if (!f.endsWith('.html')) continue;
  const p = join(dir, f);
  let html = readFileSync(p, 'utf8');
  if (!headerRe.test(html)) {
    console.warn('skip', f);
    continue;
  }
  html = html.replace(headerRe, navBlock);
  html = html.replaceAll('href="../index.html#gallery"', 'href="../du-an.html"');
  if (!html.includes('css/header.css')) {
    html = html.replace(
      '<link rel="stylesheet" href="../css/animations.css">',
      `<link rel="stylesheet" href="../css/animations.css">
  <link rel="stylesheet" href="../css/header.css">
  <link rel="stylesheet" href="../css/navbar.css">
  <link rel="stylesheet" href="../css/footer.css">`
    );
  }
  writeFileSync(p, html, 'utf8');
  console.log('patched', f);
}
