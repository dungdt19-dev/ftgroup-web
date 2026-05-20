import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith('.') && ent.name !== '.') continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === '.git') continue;
      walk(p);
    } else if (ent.name.endsWith('.html')) {
      let c = fs.readFileSync(p, 'utf8');
      const orig = c;
      c = c.replace(/^\s*<li><a href="(?:\.\.\/)?index\.html#team">Đội ngũ<\/a><\/li>\r?\n/gm, '');
      c = c.replace(/^\s*<a href="(?:\.\.\/)?index\.html#team">Đội ngũ<\/a>\r?\n/gm, '');
      if (c !== orig) {
        fs.writeFileSync(p, c, 'utf8');
        console.log('Updated:', p);
      }
    }
  }
}

walk(root);
