/** Decode HTML entities (named + numeric) to UTF-8 text. */
const NAMED = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00A0',
  mdash: '\u2014',
  ndash: '\u2013',
  hellip: '\u2026',
  ldquo: '\u201C',
  rdquo: '\u201D',
  lsquo: '\u2018',
  rsquo: '\u2019',
  agrave: 'à',
  Agrave: 'À',
  aacute: 'á',
  Aacute: 'Á',
  acirc: 'â',
  Acirc: 'Â',
  atilde: 'ã',
  Atilde: 'Ã',
  auml: 'ä',
  Auml: 'Ä',
  aring: 'å',
  Aring: 'Å',
  aelig: 'æ',
  AElig: 'Æ',
  ccedil: 'ç',
  Ccedil: 'Ç',
  egrave: 'è',
  Egrave: 'È',
  eacute: 'é',
  Eacute: 'É',
  ecirc: 'ê',
  Ecirc: 'Ê',
  euml: 'ë',
  Euml: 'Ë',
  igrave: 'ì',
  Igrave: 'Ì',
  iacute: 'í',
  Iacute: 'Í',
  icirc: 'î',
  Icirc: 'Î',
  iuml: 'ï',
  Iuml: 'Ï',
  ograve: 'ò',
  Ograve: 'Ò',
  oacute: 'ó',
  Oacute: 'Ó',
  ocirc: 'ô',
  Ocirc: 'Ô',
  otilde: 'õ',
  Otilde: 'Õ',
  ouml: 'ö',
  Ouml: 'Ö',
  oslash: 'ø',
  Oslash: 'Ø',
  ugrave: 'ù',
  Ugrave: 'Ù',
  uacute: 'ú',
  Uacute: 'Ú',
  ucirc: 'û',
  Ucirc: 'Û',
  uuml: 'ü',
  Uuml: 'Ü',
  yacute: 'ý',
  Yacute: 'Ý',
  yuml: 'ÿ',
  yen: '¥',
  copy: '©',
  reg: '®',
  trade: '™',
};

function decodeOnce(s) {
  return String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === '#') {
      const num =
        code[1].toLowerCase() === 'x'
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10);
      if (!Number.isFinite(num) || num < 0 || num > 0x10ffff) return match;
      try {
        return String.fromCodePoint(num);
      } catch {
        return match;
      }
    }
    return NAMED[code] ?? NAMED[code.toLowerCase()] ?? match;
  });
}

export function decodeHtmlEntities(s) {
  let out = String(s ?? '');
  let prev = '';
  let guard = 0;
  while (out !== prev && guard < 8) {
    prev = out;
    out = decodeOnce(out);
    guard += 1;
  }
  return out;
}
