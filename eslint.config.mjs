import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // JavaScript基本設定
  js.configs.recommended,
  
  // TypeScript + React設定
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier: prettierPlugin,
      react: react,
      'react-hooks': reactHooks,
    },
    
    rules: {
      // === コード品質に関するルール ===
      // console.logを警告レベルに（本番前に削除推奨）
      'no-console': 'warn',
      
      // debuggerステートメントを禁止（本番環境で問題となるため）
      'no-debugger': 'error',
      
      // 基本の未使用変数ルールをオフ（TypeScriptルールを使用）
      'no-unused-vars': 'off',
      
      // TypeScriptの未使用変数チェック（_から始まる変数は除外）
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      
      // === 可読性向上のルール ===
      // 再代入されない変数はconstを強制
      'prefer-const': 'error',
      
      // varの使用を禁止（letまたはconstを使用）
      'no-var': 'error',
      
      // オブジェクトのプロパティ短縮記法を強制
      'object-shorthand': 'error',
      
      // === React固有のルール ===
      // React 17+では不要なルールを無効化
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      
      // Hooksのルールを強制
      'react-hooks/rules-of-hooks': 'error',
      
      // useEffectの依存配列を警告
      'react-hooks/exhaustive-deps': 'warn',
      
      // === TypeScript固有のルール ===
      // 戻り値の型定義を任意に
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      
      // any型の使用を警告
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // ?? 演算子の使用を推奨
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      
      // ?. 演算子の使用を推奨
      '@typescript-eslint/prefer-optional-chain': 'error',
      
      // === Prettier統合 ===
      // Prettierルール違反をエラー扱い
      'prettier/prettier': 'error',
    },
    
    settings: {
      react: {
        version: 'detect',
        runtime: 'automatic',
      },
    },
  },
  
  // Prettier設定（必ず最後に配置）
  prettierConfig,
];
