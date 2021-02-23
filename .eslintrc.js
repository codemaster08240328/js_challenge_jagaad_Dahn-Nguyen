module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/base',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    indent: ['error', 2],
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
};
