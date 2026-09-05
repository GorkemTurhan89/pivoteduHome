// Elementor'dan kurtarilan stil nesnelerini CSS metnine cevirir.

export type StyleObj = Record<string, string> | null | undefined;

const camelToKebab = (k: string) => k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());

// Bolumun kendisine (tam genislik) uygulanacak ozellikler
const SECTION_KEYS = new Set([
  'backgroundColor',
  'backgroundImage',
  'backgroundSize',
  'backgroundPosition',
  'backgroundRepeat',
  'minHeight',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'borderRadius',
]);

// Elementor'un masaustu icin yazdigi yukseklik/dolgu degerleri web'de fazla ferah
// kaliyor. Bunlari dogrudan yazmak yerine ozel degisken olarak veriyoruz; olcekleme
// ve alt sinir CSS tarafinda yapiliyor (bkz. [...slug].astro .sec.band).
const AS_CUSTOM_PROP: Record<string, string> = {
  minHeight: '--sec-min-h',
  paddingTop: '--sec-pt',
  paddingBottom: '--sec-pb',
  paddingLeft: '--sec-pl',
  paddingRight: '--sec-pr',
};

// Ic sarmalayiciya uygulanacak ozellikler.
// flexDirection BILEREK disarida: Elementor'da bu deger konteynerin COCUKLARINI
// dizer, bizde ise .wrap'in tek cocugu (.row) var. Uygulanirsa .row bir flex
// item olarak icerigine buzulur ve icindeki izgara tek sutuna duser
// (sayaclar ve gorseller alt alta gelir). Yatay dizilimi zaten .grid yapiyor.
const INNER_KEYS = new Set(['justifyContent', 'alignItems', 'gap', 'textAlign']);

function toCss(o: StyleObj, allow: Set<string>, asProp?: Record<string, string>): string | undefined {
  if (!o) return undefined;
  const parts: string[] = [];
  for (const [k, v] of Object.entries(o)) {
    if (!allow.has(k) || !v) continue;
    const prop = asProp?.[k];
    parts.push(prop ? `${prop}:${v}` : `${camelToKebab(k)}:${v}`);
  }
  return parts.length ? parts.join(';') : undefined;
}

export const sectionCss = (o: StyleObj) => toCss(o, SECTION_KEYS, AS_CUSTOM_PROP);
export const innerCss = (o: StyleObj) => toCss(o, INNER_KEYS);

// Widget metin stilleri (baslik rengi, punto, hizalama, bicimlendirme)
const TEXT_KEYS = new Set([
  'color',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'textAlign',
  'letterSpacing',
  'fontStyle',
  'textDecoration',
  'textTransform',
  'textShadow',
]);
export const textCss = (o: StyleObj) => toCss(o, TEXT_KEYS);

// Buton: tipografi + kutu ozellikleri (zemin, kose, golge, dolgu, kenarlik)
const BUTTON_KEYS = new Set([
  ...TEXT_KEYS,
  'backgroundColor',
  'borderRadius',
  'boxShadow',
  'padding',
  'borderWidth',
  'borderColor',
  'borderStyle',
]);
export const buttonCss = (o: StyleObj) => toCss(o, BUTTON_KEYS);

// Bir bolumun zemini koyu mu? Koyuysa icindeki metni acik renge cekeriz.
export function isDark(o: StyleObj): boolean {
  const bg = o?.backgroundColor;
  if (!bg) return false;
  const m = bg.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return false;
  let h = m[1];
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // Algilanan parlaklik (ITU-R BT.601)
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}
