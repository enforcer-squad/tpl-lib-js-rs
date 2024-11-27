import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      // 'build/**/*',
      'dist/**/*',
      'node_modules/**/*'
    ]
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { 
      globals: {
        ...globals.browser,
        process: 'readonly'
      } 
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
