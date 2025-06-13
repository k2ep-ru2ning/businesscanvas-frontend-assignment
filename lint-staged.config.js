/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{md,css,json}": ["prettier --write"],
};
