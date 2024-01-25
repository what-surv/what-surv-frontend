module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  settings: {
    // import/resolver` 는 `eslint-plugin-import` 의 경로 설정 옵션
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
      typescript: {},
    },
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'airbnb',
    'prettier',
    'prettier/prettier',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'import', 'react-hooks'],
  rules: {
    'no-var': 'error',
    'no-multiple-empty-lines': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'no-console': ['warn', { allow: ['error'] }],
    'react-hooks/rules-of-hooks': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'no-use-before-define': 'off',
    'no-return-assign': 'off',
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    eqeqeq: 'error',
    'dot-notation': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': ['off'],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^react-modal/.+'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
