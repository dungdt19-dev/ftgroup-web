/**
 * Sync header, mobile menu, footer & float stack from site-chrome.mjs across static HTML pages.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { renderSiteNav, renderSiteFooter, renderFloatStack } from './site-chrome.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const navRe =
  /<header class="site-header"[\s\S]*?<\/header>\s*(?:<!--[\s\S]*?-->\s*)?<div class="mobile-menu" id="mobileMenu"[\s\S]*?<\/div>/;

const footerRe = /<footer class="site-footer" id="contact">[\s\S]*?<\/footer>/;

const floatRe =
  /<div class="float-stack" aria-label="Liên hệ nhanh">[\s\S]*?<\/div>\s*(?:<!--[\s\S]*?-->\s*)*(?=<script|<\/body)/;

function patchFile(filePath, depth, activeNav) {
  let html = readFileSync(filePath, 'utf8');
  const nav = renderSiteNav({ depth, activeNav });
  const footer = renderSiteFooter({ depth });
  const float = renderFloatStack({ depth });

  if (!navRe.test(html)) {
    console.warn('skip nav:', filePath);
    return false;
  }
  html = html.replace(navRe, nav);
  if (footerRe.test(html)) {
    html = html.replace(footerRe, footer);
  } else {
    console.warn('skip footer:', filePath);
  }
  if (floatRe.test(html)) {
    html = html.replace(floatRe, `${float}\n\n`);
  } else if (!html.includes('float-stack')) {
    html = html.replace(/<script src="/, `${float}\n\n<script src="`);
  }

  html = html.replace(/href="[^"]*#team"/g, 'href="' + (depth ? '../' : '') + 'index.html#vision-mission"');
  html = html.replaceAll('>Đội ngũ<', '>Tầm nhìn<');

  writeFileSync(filePath, html, 'utf8');
  return true;
}

const rootPages = [
  { file: 'index.html', activeNav: 'home' },
  { file: 'du-an.html', activeNav: 'projects' },
];

for (const { file, activeNav } of rootPages) {
  if (patchFile(join(root, file), 0, activeNav)) console.log('synced', file);
}

for (const dir of ['services', 'projects']) {
  const full = join(root, dir);
  for (const f of readdirSync(full)) {
    if (!f.endsWith('.html')) continue;
    const activeNav = dir === 'services' ? 'services' : 'projects';
    if (patchFile(join(full, f), 1, activeNav)) console.log('synced', `${dir}/${f}`);
  }
}

console.log('Site chrome sync complete.');
