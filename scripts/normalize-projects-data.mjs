/**
 * Convert HTML entities in projects-data.mjs to UTF-8 literals.
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { decodeHtmlEntities } from './html-entities.mjs';

const path = join(dirname(fileURLToPath(import.meta.url)), 'projects-data.mjs');
let src = readFileSync(path, 'utf8');

if (!/&(?:#x?[0-9a-f]+|[a-z]+);/i.test(src)) {
  console.log('projects-data.mjs already UTF-8 (no HTML entities found).');
  process.exit(0);
}

let prev = '';
let guard = 0;
while (src !== prev && guard < 12) {
  prev = src;
  src = decodeHtmlEntities(src);
  guard += 1;
}

writeFileSync(path, src, 'utf8');
console.log('Normalized HTML entities in projects-data.mjs');
