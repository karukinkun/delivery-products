/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,

  ignorePatterns: ['node_modules/', 'dist/', 'build/', '*.min.js', 'coverage/'],

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // ← prettier + eslint統合
    'prettier', // ← 競合ルール無効化（最後）
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    // ===== 基本 =====
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': 'off',

    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // ===== コーディング規約 =====
    'no-restricted-syntax': [
      'error',
      {
        selector: 'FunctionDeclaration',
        message: 'アロー関数を使用してください。',
      },
      {
        selector: 'FunctionExpression',
        message: 'アロー関数を使用してください。',
      },
    ],

    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',

    // ===== React =====
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // ===== TypeScript =====
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',

    // ===== Prettier =====
    'prettier/prettier': 'error',
  },
};
