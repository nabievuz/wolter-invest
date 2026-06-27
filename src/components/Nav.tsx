'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { Spark, Wordmark } from './Brand';

const LANG_LABELS: Record<string, string> = { uz: 'UZ', ru: 'RU', en: 'EN' };

export default function Nav({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: [string, string][] = [
    ['#problem', t('problem')],
    ['#how', t('how')],
    ['#structure', t('structure')],
    ['#calc', t('calc')],
    ['#risks', t('risks')],
    ['#team', t('team')]
  ];

  return (
    <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
      <div className="wrap nav-in">
        <a className="brand" href="#top" aria-label="Wolter">
          <Spark />
          <Wordmark />
        </a>
        <div className={'nav-links' + (open ? ' open' : '')}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <div className="lang" role="group" aria-label="Language">
            {routing.locales.map((lc) => (
              <button
                key={lc}
                className={lc === locale ? 'on' : ''}
                onClick={() => router.replace(pathname, { locale: lc })}
              >
                {LANG_LABELS[lc]}
              </button>
            ))}
          </div>
          <a href="#cta" className="btn btn-primary nav-cta">
            {t('cta')}
          </a>
          <button className="burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}
