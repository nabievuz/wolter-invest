'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const TG = 'https://t.me/nabievuz';
const PHONE = '+998994320318';

export default function LeadForm() {
  const t = useTranslations('cta.form');
  const ranges = t.raw('ranges') as string[];

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [range, setRange] = useState(ranges[0]);
  const [msg, setMsg] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: boolean; contact?: boolean; consent?: boolean }>({});
  const [toast, setToast] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er = { name: !name.trim(), contact: !contact.trim(), consent: !consent };
    setErrors(er);
    if (er.name || er.contact || er.consent) return;

    let text = t('tgMessage', { name: name.trim(), contact: contact.trim(), range });
    if (msg.trim()) text += t('tgMessageMsg', { msg: msg.trim() });

    window.open(`${TG}?text=${encodeURIComponent(text)}`, '_blank');
    setToast(true);
    setTimeout(() => setToast(false), 3200);
    setName('');
    setContact('');
    setMsg('');
    setConsent(false);
    setRange(ranges[0]);
    setErrors({});
  }

  return (
    <>
      <form className="form" onSubmit={submit} noValidate>
        <div className={'field' + (errors.name ? ' bad' : '')}>
          <label htmlFor="f-name">{t('name')}</label>
          <input id="f-name" type="text" placeholder={t('namePh')} value={name} autoComplete="name" onChange={(e) => setName(e.target.value)} />
          <span className="err">{t('errName')}</span>
        </div>
        <div className={'field' + (errors.contact ? ' bad' : '')}>
          <label htmlFor="f-contact">{t('contact')}</label>
          <input id="f-contact" type="text" placeholder={t('contactPh')} value={contact} onChange={(e) => setContact(e.target.value)} />
          <span className="err">{t('errContact')}</span>
        </div>
        <div className="field">
          <label htmlFor="f-range">{t('range')}</label>
          <select id="f-range" value={range} onChange={(e) => setRange(e.target.value)}>
            {ranges.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-msg">{t('msg')}</label>
          <textarea id="f-msg" rows={2} placeholder={t('msgPh')} value={msg} onChange={(e) => setMsg(e.target.value)} />
        </div>
        <label className="consent">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>{t('consent')}</span>
        </label>
        {errors.consent && <span className="err show">{t('errConsent')}</span>}
        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>
          {t('send')} →
        </button>
        <div className="direct">
          {t('directPre')}{' '}
          <a href={TG} target="_blank" rel="noopener">
            Telegram @nabievuz
          </a>{' '}
          · <a href={`tel:${PHONE}`}>+998 99 432 03 18</a>
        </div>
        <p className="priv">{t('privacy')}</p>
      </form>
      <div className={'toast' + (toast ? ' show' : '')}>{t('toast')}</div>
    </>
  );
}
