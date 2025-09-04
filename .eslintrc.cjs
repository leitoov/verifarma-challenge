/* .eslintrc.cjs */
module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: ['plugin:vue/vue3-recommended', '@vue/eslint-config-typescript', 'prettier'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
