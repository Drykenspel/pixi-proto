module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "indent": ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-console": "off",
    "no-undef": "error",
    "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
    "multiline-ternary": ["error", "always-multiline"],
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "curly": ["warn", "all"],
    "eol-last": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "max-len": ["error", { code: 100, tabWidth: 2, ignoreTrailingComments: true }],
    "no-trailing-spaces": ["error"],
    "object-curly-spacing": ["warn", "always", { objectsInObjects: false, arraysInObjects: false }],
    "arrow-parens": ["warn", "as-needed", { "requireForBlockBody": true }],
    "@typescript-eslint/array-type": ["error"],
    "@typescript-eslint/class-name-casing": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/member-delimiter-style": ["error", {
      multiline: { delimiter: "semi", requireLast: true },
      singleline: { delimiter: "semi", requireLast: false }
    }],
  },
};
