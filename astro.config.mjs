import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canli: https://pivotedu.com.tr
// Staging: SITE_URL ile ez, orn. https://pivotedu.gorkemturhan.com
const SITE = process.env.SITE_URL || 'https://pivotedu.com.tr';
const isProd = new URL(SITE).hostname.replace(/^www\./, '') === 'pivotedu.com.tr';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Sitemap yalnizca canlida uretilir; staging arama motorlarina kapalidir.
  integrations: isProd ? [sitemap()] : [],
  devToolbar: { enabled: false },
});
