import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Strona statyczna: Cloudflare Pages. /b2b/ i /wp-content/ obsługują funkcje w /functions (proxy do starego serwera).
export default defineConfig({
  site: 'https://eperfumeria.eu',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (p) => !p.includes('/404') && !p.includes('/dziekujemy') })],
});
