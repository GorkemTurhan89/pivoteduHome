// dist/ icindeki her gorsel referansinin public/ altinda karsiligi var mi?
// Kirik varsa cikis kodu 1 doner; build sonrasi calistirilmali.
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const DIST = 'dist';
const PUB = 'public';
const IMG_RE = /\.(png|jpe?g|svg|ico|webp|gif|avif)$/i;

if (!fs.existsSync(DIST)) {
  console.error('dist/ yok — once "npm run build" calistir.');
  process.exit(1);
}

const refs = new Map(); // url -> ilk goruldugu sayfa

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) scan(p);
  }
}

function scan(file) {
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);
  const add = (u) => {
    if (!u) return;
    const clean = u.split('?')[0].split('#')[0];
    if (!clean.startsWith('/') || !IMG_RE.test(clean)) return;
    if (!refs.has(clean)) refs.set(clean, path.relative(DIST, file));
  };

  $('img[src]').each((i, el) => add($(el).attr('src')));
  $('img[srcset], source[srcset]').each((i, el) =>
    ($(el).attr('srcset') || '').split(',').forEach((s) => add(s.trim().split(/\s+/)[0]))
  );
  $('link[href]').each((i, el) => add($(el).attr('href')));
  $('meta[content]').each((i, el) => add($(el).attr('content')));
  for (const m of html.matchAll(/url\((['"]?)(\/[^)'"]+)\1\)/g)) add(m[2]);
}

walk(DIST);

const broken = [...refs].filter(([u]) => !fs.existsSync(path.join(PUB, u)));

for (const [u, where] of broken) console.error(`KIRIK  ${u}\n       ilk goruldugu sayfa: ${where}`);

// Uretime mutlak baglanan varliklar: staging canli siteye bagimli kalmamali.
const HOTLINK = /(?:src|href)="https:\/\/pivotedu\.com\.tr\/wp-content|url\(\s*['"]?https:\/\/pivotedu\.com\.tr/g;
const hotlinks = [];
(function scanHot(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scanHot(p);
    else if (e.name.endsWith('.html')) {
      const n = (fs.readFileSync(p, 'utf8').match(HOTLINK) || []).length;
      if (n) hotlinks.push({ page: path.relative(DIST, p), n });
    }
  }
})(DIST);

for (const h of hotlinks) console.error(`HOTLINK  ${h.page}  (${h.n} adet uretime mutlak baglanti)`);

const fail = broken.length + hotlinks.length;
console.log(`\ngorsel referansi: ${refs.size} | kirik: ${broken.length} | hotlink sayfasi: ${hotlinks.length}`);
process.exit(fail ? 1 : 0);
