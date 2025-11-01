export async function GET() {
  const base = 'https://tlocompro.cl';
  const pages = [
    '/',
    '/como-funciona',
    '/preguntas-frecuentes',
    '/oferta',
    '/gracias',
    '/privacidad',
    '/terminos'
  ];

  const urls = pages.map(
    (path) => `
    <url>
      <loc>${base}${path}</loc>
      <changefreq>weekly</changefreq>
      <priority>${path === '/' ? '1.0' : '0.8'}</priority>
    </url>`
  );

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('\n')}
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
}
