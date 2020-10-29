module.exports = {
  env: {
    jest: true,
  },
  plugins: ['simple-import-sort'],
  extends: [
    'kentcdodds/possible-errors',
    'kentcdodds/best-practices',
    'kentcdodds/es6/possible-errors',
    'kentcdodds/react',
    'plugin:json/recommended',
    'prettier',
  ],
  rules: {
    'react/prop-types': 'off',
    'no-shadow': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'simple-import-sort/sort': [
          'error',
          {
            groups: [
              // Node.js builtins. You could also generate this regex if you use a `.js` config.
              // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
              [
                '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
              ],
              // Packages. `react` related packages come first.
              ['^react', '^@?\\w'],
              // Side effect imports.
              ['^\\u0000'],
              // Internal packages.
              ['^(@ftrprf|@ui|components|utils|config|vendored-lib)(/.*|$)'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // hooks
              ['.*hooks.*'],
              // api
              ['.*api.*'],
              // utils
              ['.*utils.*'],
              // Style imports.
              ['^.+\\.s?css$'],
            ],
          },
        ],
      },
    },
  ],
};
