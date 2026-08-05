import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://brewhaven.cafe';
  const lastModified = new Date();

  const routes = [
    '',
    '/menu',
    '/customizer',
    '/reserve',
    '/origins',
    '/locations',
    '/story',
    '/blog',
    '/dashboard',
    '/gift-cards',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' || route === '/menu' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/menu' ? 0.9 : 0.8,
  }));
}
