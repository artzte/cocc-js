import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    ignores: ['dist/**'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-var': 'warn',
      'prefer-const': 'warn',
      eqeqeq: 'warn',
    },
  },
]
