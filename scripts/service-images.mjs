/**
 * Local service images under assets/images/dich-vu/{service-id}/
 */
import { existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', 'assets', 'images', 'dich-vu');
/** Pages in services/ — relative to HTML file (matches logo paths). */
export const SERVICE_IMAGE_URL_PREFIX = '../assets/images/dich-vu';
/** index.html and other root pages. */
export const SERVICE_IMAGE_URL_PREFIX_ROOT = 'assets/images/dich-vu';

/** Service id → folder when no dedicated folder exists yet */
export const SERVICE_IMAGE_ALIAS = {
  'khoi-cong-khanh-thanh': 'khai-truong',
  'ra-mat-san-pham': 'khai-truong',
  'tiec-cuoi-nam': 'to-chuc-su-kien',
  'hoi-nghi': 'to-chuc-su-kien',
  'hoi-thao': 'to-chuc-su-kien',
  'ky-niem-thanh-lap': 'to-chuc-su-kien',
  'cho-thue-thiet-bi': 'thiet-bi-san-khau',
  'cung-cap-nhan-su': 'to-chuc-su-kien',
  'san-xuat-dao-cu': 'dao-cu-teambuilding',
};

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

export function resolveServiceImageFolder(serviceId) {
  const direct = join(ROOT, serviceId);
  if (existsSync(direct)) return serviceId;
  const alias = SERVICE_IMAGE_ALIAS[serviceId];
  if (alias && existsSync(join(ROOT, alias))) return alias;
  return null;
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

/** Sorted image URLs for service detail pages (services/*.html). */
export function listServiceImageUrls(serviceId) {
  const folder = resolveServiceImageFolder(serviceId);
  if (!folder) return [];
  return toUrls(folder, listFilesInFolder(folder), SERVICE_IMAGE_URL_PREFIX);
}

/** Hero / card image for root pages (index.html). */
export function getServiceHighlightImage(serviceId) {
  const folder = resolveServiceImageFolder(serviceId);
  if (!folder) return null;
  const files = listFilesInFolder(folder);
  if (!files.length) return null;
  return `${SERVICE_IMAGE_URL_PREFIX_ROOT}/${folder}/${files[0]}`;
}

export function getServiceHeroImage(serviceId) {
  const urls = listServiceImageUrls(serviceId);
  return urls[0] || null;
}

export function getServiceGalleryImages(serviceId, count = 10) {
  const urls = listServiceImageUrls(serviceId);
  if (!urls.length) return [];
  const out = [];
  for (let i = 0; i < count; i++) out.push(urls[i % urls.length]);
  return out;
}
