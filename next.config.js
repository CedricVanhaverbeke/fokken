module.exports = {
  target: 'serverless',
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'nl',
    domains: [
      {
        domain: 'ftrprf.be',
        defaultLocale: 'nl',
      },
      {
        domain: 'localhost:5000',
        defaultLocale: 'en',
      },
    ],
  },
};
