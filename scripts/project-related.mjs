/**
 * Filter tags on du-an.html — used to score related projects.
 * Affinity links tags that often go together (e.g. thiết bị ↔ khai trương).
 */
const FILTER_AFFINITY = {
  'dai-nhac-hoi': ['chao-tan-sinh-vien', 'su-kien-truong-hoc', 'thiet-bi-su-kien'],
  'chao-tan-sinh-vien': ['dai-nhac-hoi', 'su-kien-truong-hoc'],
  'su-kien-truong-hoc': ['dai-nhac-hoi', 'chao-tan-sinh-vien', 'trai-nghiem-giao-duc', 'khai-truong'],
  'trai-nghiem-giao-duc': ['su-kien-truong-hoc'],
  'khai-truong': ['thiet-bi-su-kien', 'dai-nhac-hoi', 'su-kien-truong-hoc', 'team-building'],
  'team-building': ['khai-truong', 'thiet-bi-su-kien'],
  'thiet-bi-su-kien': ['khai-truong', 'dai-nhac-hoi', 'team-building', 'su-kien-truong-hoc'],
};

function affinityScore(curFilters, otherFilters) {
  let score = 0;
  for (const f of curFilters) {
    for (const g of otherFilters) {
      if (f === g) score += 10;
      else if (FILTER_AFFINITY[f]?.includes(g)) score += 4;
      else if (FILTER_AFFINITY[g]?.includes(f)) score += 3;
    }
  }
  return score;
}

/** Pick related projects by filter affinity (same tab group on du-an.html). */
export function pickRelatedProjects(current, all, count = 3) {
  const curFilters = current.filters || [];
  const curPool = current.pool || 'concert';

  return all
    .filter((p) => p.file !== current.file)
    .map((p) => {
      const pf = p.filters || [];
      const score = affinityScore(curFilters, pf);
      const poolMatch = p.pool === curPool ? 1 : 0;
      return { file: p.file, score, poolMatch };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.poolMatch !== a.poolMatch) return b.poolMatch - a.poolMatch;
      return a.file.localeCompare(b.file, 'vi');
    })
    .slice(0, count)
    .map((x) => x.file);
}

/** Thumbnail src for cards on projects/*.html */
export function relatedCardThumb(project) {
  const url = (project.gallery && project.gallery[0]) || project.hero || project.thumb || '';
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('../')) return url;
  if (url.startsWith('assets/')) return `../${url}`;
  return url;
}
