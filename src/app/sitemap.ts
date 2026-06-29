import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE = 'https://invest.wolter.uz';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${BASE}/${l}`])
  );
  return routing.locales.map((locale) => ({
    url: `${BASE}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages }
  }));
}
