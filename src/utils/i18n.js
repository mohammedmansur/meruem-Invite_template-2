export const translations = {
  ckb: {
    demoLabel: 'نموونەی دەعوەتنامە:',
    shareUrl: 'کۆپیکردنی بەستەر',
    copied: 'بەستەر کۆپیکرا!',
    languageName: 'کوردی سۆرانی',
    defaultBadge: 'بنەڕەتی'
  },
  ar: {
    demoLabel: 'اختر نموذجاً:',
    shareUrl: 'نسخ الرابط',
    copied: 'تم النسخ بنجاح!',
    languageName: 'العربية',
    defaultBadge: 'الافتراضي'
  },
  en: {
    demoLabel: 'Select Demo Wedding:',
    shareUrl: 'Copy Share Link',
    copied: 'Link Copied!',
    languageName: 'English',
    defaultBadge: 'Default'
  }
};

export function getT(lang = 'ckb') {
  return translations[lang] || translations.ckb;
}
