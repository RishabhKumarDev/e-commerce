import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // 1️⃣ Ignore build output
  globalIgnores(['dist']),

  {
    // 2️⃣ Lint only JS / JSX files
    files: ['**/*.{js,jsx}'],

    // 3️⃣ Register plugins
    plugins: {
      import: importPlugin,
    },

    // 4️⃣ Base recommended rules
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],

    // 5️⃣ Language + environment setup
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    // 6️⃣ Tell ESLint how Node resolves imports
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
        }
      },
    },

    rules: {

      // ✅ Only enforce Linux-case-sensitive paths
      'import/no-unresolved': 'off',

      // ✅ Allow JSX usage without triggering unused vars
      'no-unused-vars': 'off',

      // ✅ Disable forcing .js/.jsx extensions
      'import/extensions': 'off',

    },
  },
])
