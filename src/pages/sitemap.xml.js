  export async function GET() {
    const base = 'https://tlocompro.cl';

    const pages = [
      { path: '/', priority: '1.0' },
      { path: '/como-funciona', priority: '0.9' },
      { path: '/preguntas-frecuentes', priority: '0.9' },
      { path: '/nosotros', priority: '0.6' },
      { path: '/automotoras', priority: '0.9' },
      { path: '/contacto-automotoras', priority: '0.8' },
      { path: '/oferta', priority: '0.8' },
      { path: '/gracias', priority: '0.3' },
      { path: '/privacidad', priority: '0.2' },
      { path: '/terminos', priority: '0.2' }
    ];

    const urls = pages.map(
      ({ path, priority }) => `
      <url>
        <loc>${base}${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
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

