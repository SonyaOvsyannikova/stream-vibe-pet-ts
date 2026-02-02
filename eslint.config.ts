import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // Игнорируем ненужные файлы
  {
    ignores: [
      'dist',
      'node_modules',
      '*.config.*',
      'coverage',
      'build',
      '.git',
      '.vscode',
      'public',
    ],
  },

  // Базовые настройки для всех файлов
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
  },

  // TypeScript правила
  ...tseslint.configs.recommended,

  // React правила
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect', // Автоматически определяет версию React
      },
    },
    rules: {
      // Отключаем правило, требующее импорт React (не нужно с React 17+)
      'react/react-in-jsx-scope': 'off',
      // Отключаем prop-types (используем TypeScript)
      'react/prop-types': 'off',
    },
  },

  // React Hooks правила
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },

  // React Refresh (для Vite)
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
])
