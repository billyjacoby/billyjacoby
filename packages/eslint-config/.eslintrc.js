const internalPaths = ['@/*'];

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', 'tailwindcss'],
  rules: {
    'tailwindcss/no-custom-classname': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-unescaped-entities': 1,
    'import/no-unresolved': [
      2,
      {
        ignore: [...internalPaths, '@env'],
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@env',
            group: 'builtin',
          },
          {
            pattern: 'react',
            group: 'builtin',
          },
          {
            pattern: 'react-dom',
            group: 'builtin',
          },
          { pattern: './*', group: 'internal' },
          ...internalPaths.map((path) => ({
            pattern: path,
            group: 'internal',
          })),
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-dom'],
      },
    ],
    quotes: ['warn', 'single', 'avoid-escape'],
    '@typescript-eslint/no-explicit-any': 'warn',
    // 'react/prop-types': 0,
    camelcase: [0],
    'no-console': [
      'error',
      {
        allow: ['error'],
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreMemberSort: false,
        ignoreDeclarationSort: true,
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
};
