const colors = require('./src/theme/colors');

module.exports = {
  presets: [
    {
      purge: [
        './public/index.html',
        './src/**/*.js',
        './src/**/(!tailwind).css',
        './node_modules/@ftrprf/**/*.{js,ts,jsx,tsx}',
        '../tailwind-components/**/*.{js,ts,jsx,tsx}',
      ],
      theme: {
        extend: {
          fontFamily: {
            sans: [
              'Inter',
              '-apple-system',
              'BlinkMacSystemFont',
              'sans-serif',
            ],
          },
          height: {
            '1/2': '50%', // used in the styled slide viewer
            28: '7rem',
            112: '28rem',
          },
          maxHeight: {
            12: '3rem',
          },
          fontSize: {
            xxs: '0.625rem',
          },
          textColor: {
            accent: colors.accent[500],
          },
          borderColor: (theme) => ({
            ...theme('colors'),
            default: theme('colors.gray.600'),
          }),
          colors,
          boxShadow: {
            base: '0 2px 10px #00000029',
            focus: '0 0 2px #33caff;',
            form: 'inset 0px 0px 3px 0px rgba(0, 0, 0, 0.05)',
          },
          width: {
            36: '9rem',
            88: '22rem',
          },
          minWidth: {
            32: '7rem',
            56: '14rem',
            96: '24rem',
          },
          minHeight: {
            16: '4rem',
          },
          maxWidth: {
            48: '12rem',
          },
          scale: {
            '-1': '-1',
          },
          spacing: {
            '9/16': '56.25%',
          },
          inset: {
            '-1': '-.5em',
          },
        },
      },
      variants: {
        opacity: ['responsive', 'hover', 'focus', 'group-hover'],
        backgroundColor: ['responsive', 'even', 'hover', 'focus'],
        padding: ['responsive', 'hover', 'focus', 'first'],
        display: ['responsive', 'hover', 'focus', 'group-hover'],
      },
      plugins: [],
    },
  ],
  theme: {},
};
