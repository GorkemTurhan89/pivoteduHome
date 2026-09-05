// Canli site tek bir adrestir. Onun disindaki her adres (staging, preview,
// localhost) indekslenmemelidir. Varsayilan GUVENLI taraftir: bilinmiyorsa noindex.
export const PROD_HOST = 'pivotedu.com.tr';

export const SITE_URL = import.meta.env.SITE_URL || process.env.SITE_URL || 'https://pivotedu.com.tr';

export function isProduction(site?: URL | string | null): boolean {
  const raw = site ? String(site) : SITE_URL;
  try {
    const host = new URL(raw).hostname.replace(/^www\./, '');
    return host === PROD_HOST;
  } catch {
    return false;
  }
}
