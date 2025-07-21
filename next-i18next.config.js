// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
  },
  localePath: './public/locales',
  defaultNS: 'common',
  ns: ['common'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  
  // For Next.js App Router compatibility
  nonExplicitSupportedLngs: true,
  strictMode: false
};
