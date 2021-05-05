module.exports = {
  env: {
    commonjs: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/eslint-recommended', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    // General
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-interface': 0,

    // Prettier
    'prettier/prettier': 'error',
    semi: ['error', 'never'],

    // Import
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  }
}
