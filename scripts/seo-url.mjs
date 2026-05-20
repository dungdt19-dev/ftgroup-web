/** Canonical site origin for Open Graph / JSON-LD absolute URLs */
export const SITE_ORIGIN = 'https://ftgroup.vn';

/** Homepage hero — shared SEO + hero background */
export const SITE_HERO_IMAGE = '/assets/images/chung/hero-media.jpg';
export const SITE_HERO_IMAGE_ABSOLUTE = `${SITE_ORIGIN}${SITE_HERO_IMAGE}`;

/** Turn ../assets/... or assets/... or /assets/... into https://ftgroup.vn/assets/... */
export function toAbsoluteSeoImage(url) {
  if (!url) return '';
  const raw = String(url).trim();
  if (/^https?:\/\//i.test(raw)) return raw;
  const path = raw.replace(/^\.\.\//, '').replace(/^\/+/, '');
  return `${SITE_ORIGIN}/${path}`;
}
