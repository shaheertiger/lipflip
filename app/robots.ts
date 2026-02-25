import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/thank-you'],
      },
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: ['/api/', '/thank-you'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/thank-you'],
      },
    ],
    sitemap: 'https://lipflipbeforeandafter.online/sitemap.xml',
  };
}
