import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-case-declarations': 'off',
    },
  },
];
