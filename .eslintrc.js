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
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/array-type": ["error"],
    "arrow-parens": ["warn", "as-needed", { "requireForBlockBody": true }],
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "@typescript-eslint/class-name-casing": "error",
    "comma-dangle": ["error", "always-multiline"],
    "curly": ["warn", "all"],
    "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
    "@typescript-eslint/explicit-member-accessibility": "off"/*
      Configuration currently unavailable https://github.com/typescript-eslint/typescript-eslint/issues/422
      ["warn", { accessibility: "no-public" }]*/,
    "eol-last": ["error", "always"],
    "@typescript-eslint/indent": ["error", 2, { SwitchCase: 1 }],
    "@typescript-eslint/interface-name-prefix": ["warn", "always"],
    "linebreak-style": ["error", "unix"],
    "max-len": ["error", {
      code: 100,
      tabWidth: 2,
      ignoreTrailingComments: true
    }],
    "@typescript-eslint/member-delimiter-style": ["error", {
      multiline: { delimiter: "semi", requireLast: true },
      singleline: { delimiter: "semi", requireLast: false }
    }],
    "multiline-ternary": ["error", "always-multiline"],
    "no-console": ["off"],
    "@typescript-eslint/no-non-null-assertion": ["off"],
    "no-trailing-spaces": ["error"],
    "no-undef": ["error"],
    "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
    "@typescript-eslint/no-use-before-define": ["off"],
    "object-curly-spacing": ["warn", "always", {
      objectsInObjects: false,
      arraysInObjects: false
    }],
    "@typescript-eslint/prefer-function-type": ["error"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "@typescript-eslint/type-annotation-spacing": ["error"],
  },
};
