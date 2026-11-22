// Przekazuje zapytania do starego serwera (dhosting), gdzie co noc trafiają pliki /b2b/ (qogita_serwer.py przez FTP)
// i gdzie leżą zdjęcia produktów /zdjecia/, /zdjecia_min/ oraz stare zdjęcia /wp-content/. Adres starego serwera ustawiasz w Cloudflare Pages:
// Settings -> Variables -> ORIGIN (np. https://stara.perfume-supplier.eu). Bez zmiennej (strona testowa *.pages.dev)
// używamy obecnej strony https://perfume-supplier.eu.
export async function proxy(context) {
  const origin = (context.env.ORIGIN || 'https://eperfumeria.eu').replace(/\/$/, '');
  const url = new URL(context.request.url);
  if (new URL(origin).host === url.host) return new Response('ORIGIN points to this site', { status: 508 });
  const target = origin + url.pathname + url.search;
  const req = new Request(target, context.request);
  const res = await fetch(req, { redirect: 'manual', cf: { cacheEverything: /^\/(wp-content|zdjecia|zdjecia_min)\//.test(url.pathname), cacheTtl: /^\/zdjecia/.test(url.pathname) ? 2592000 : undefined } });
  const out = new Response(res.body, res);
  // przekierowania ze starego serwera kierujemy z powrotem na tę domenę
  const loc = out.headers.get('location');
  if (loc && loc.startsWith(origin)) out.headers.set('location', loc.slice(origin.length) || '/');
  return out;
}
