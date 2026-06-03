/**
 * Regenerates du-an.html filter tabs + project card grid from PROJECTS.
 * Run: node scripts/build-du-an-gallery.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { PROJECTS } from './projects-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pagePath = join(__dirname, '..', 'du-an.html');

function escAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const TABS = [
  ['all', 'Tất cả', true],
  ['dai-nhac-hoi', 'Đại nhạc hội'],
  ['chao-tan-sinh-vien', 'Chào tân sinh viên'],
  ['team-building', 'Team Building'],
  ['su-kien-truong-hoc', 'Sự kiện trường học'],
  ['khai-truong', 'Khai trương'],
  ['trai-nghiem-giao-duc', 'Trải nghiệm giáo dục'],
  ['thiet-bi-su-kien', 'Thiết bị sự kiện'],
];

const tabsHtml = TABS.map(([id, label, active]) => {
  const cls = active ? 'gallery-tab is-active' : 'gallery-tab';
  return `    <button class="${cls}" type="button" data-filter="${escAttr(id)}">${label}</button>`;
}).join('\n');

let i = 0;
const cardsHtml = PROJECTS.map((p) => {
  const delay = (i % 3) + 1;
  i += 1;
  const dataCat = (p.filters || []).join(' ');
  const src = String(p.thumb).replace(/&/g, '&amp;');
  const linkClass = p.noPhotos
    ? 'project-card-featured reveal is-hidden'
    : 'project-card-featured reveal';
  const linkExtra = p.noPhotos ? ' data-no-photos hidden' : '';
  return `    <a href="projects/${escAttr(p.file)}" class="${linkClass}" data-cat="${escAttr(
    dataCat
  )}" data-delay="${delay}"${linkExtra}>
      <div class="project-card-featured__media">
        <img src="${src}" alt="${escAttr(p.cardTitle)}" width="1400" height="900" loading="lazy" decoding="async">
        <div class="project-card-featured__scrim" aria-hidden="true"></div>
        <div class="project-card-featured__glow" aria-hidden="true"></div>
      </div>
      <div class="project-card-featured__body">
        <div class="project-card-featured__glass">
          <span class="project-card-featured__cat">${escHtml(p.cardCat)}</span>
          <h3 class="project-card-featured__title">${escHtml(p.cardTitle)}</h3>
          <p class="project-card-featured__meta">
            <span class="project-card-featured__desc">${escHtml(p.cardDesc)}</span>
            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${escHtml(p.loc)}</span>
          </p>
          <span class="project-card-featured__cta">Xem chi tiết <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
        </div>
      </div>
    </a>`;
}).join('\n');

const INJECT_START = '<!-- DU_AN_PROJECTS_INJECT_START -->';
const INJECT_END = '<!-- DU_AN_PROJECTS_INJECT_END -->';

const block =
  `${INJECT_START}
  <div class="gallery-tabs reveal-fade">
${tabsHtml}
  </div>

  <div class="project-showcase-grid">
${cardsHtml}
  </div>
${INJECT_END}`;

let html = readFileSync(pagePath, 'utf8');

if (!html.includes(INJECT_START)) {
  throw new Error('du-an.html: add markers DU_AN_PROJECTS_INJECT_START / END');
}
html = html.replace(new RegExp(`${INJECT_START}[\\s\\S]*?${INJECT_END}`, 'm'), block.trimEnd());

writeFileSync(pagePath, html, 'utf8');
console.log('Updated', pagePath, '—', PROJECTS.length, 'cards');
