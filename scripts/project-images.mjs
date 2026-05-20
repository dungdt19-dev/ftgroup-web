/**
 * Local project images under assets/images/du-an/{project-slug}/
 * Slug = HTML filename without extension (e.g. dem-hoi-chao-tan-sinh-vien-k69.html → dem-hoi-chao-tan-sinh-vien-k69)
 * Put 6 images per folder: 1.jpg … 6.jpg (or .png / .webp)
 */
import { existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', 'assets', 'images', 'du-an');

/** Project pages in projects/ */
export const PROJECT_IMAGE_URL_PREFIX = '../assets/images/du-an';
/** du-an.html, index.html */
export const PROJECT_IMAGE_URL_PREFIX_ROOT = 'assets/images/du-an';

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

export function projectSlugFromFile(file) {
  return String(file).replace(/\.html$/i, '');
}

export function resolveProjectImageFolder(projectSlug) {
  const dir = join(ROOT, projectSlug);
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir).filter((name) => IMAGE_EXT.test(name));
  return files.length ? projectSlug : null;
}

function listFilesInFolder(folder) {
  const dir = join(ROOT, folder);
  return readdirSync(dir)
    .filter((name) => IMAGE_EXT.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
}

function toUrls(folder, files, prefix) {
  return files.map((name) => `${prefix}/${folder}/${name}`);
}

export function listProjectImageUrls(projectSlug, prefix = PROJECT_IMAGE_URL_PREFIX) {
  const folder = resolveProjectImageFolder(projectSlug);
  if (!folder) return [];
  return toUrls(folder, listFilesInFolder(folder), prefix);
}

export function getProjectHeroImage(projectSlug) {
  const urls = listProjectImageUrls(projectSlug);
  return urls[0] || null;
}

export function getProjectThumbImage(projectSlug) {
  return listProjectImageUrls(projectSlug, PROJECT_IMAGE_URL_PREFIX_ROOT)[0] || null;
}

export function getProjectGalleryImages(projectSlug, count = 6) {
  const urls = listProjectImageUrls(projectSlug);
  if (!urls.length) return [];
  return urls.slice(0, count);
}
