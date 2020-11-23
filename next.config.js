const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'nl',
    domains: [
      {
        domain: 'localhost:5000',
        defaultLocale: 'en',
      },
    ],
  },
});
