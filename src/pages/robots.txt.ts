import type { APIRoute } from 'astro';
import { isProduction } from '../lib/env';

// Canli disindaki her ortam tamamen kapali.
export const GET: APIRoute = ({ site }) => {
  const prod = isProduction(site);

  const body = prod
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
    : `# Staging ortami - arama motorlarina kapalidir.\nUser-agent: *\nDisallow: /\n`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
