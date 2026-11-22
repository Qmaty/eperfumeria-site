# eperfumeria.eu

Statyczna strona Astro na Cloudflare Pages (polska hurtownia ePerfumeria). Ten sam system co perfume-supplier.eu.

- `npm run build` -> `dist/`
- /b2b/ (cennik PLN, zamowienie_PLN.html, formularze kontakt.php i newsletter.php) i /wp-content/ przekazywane do starego serwera (functions/_proxy.js, zmienna ORIGIN w Cloudflare Pages).
- Przekierowania ze starych adresów: public/_redirects.

- Domena docelowa: eperfumeria.eu (e-perfumeria.eu przekierowana 301).
