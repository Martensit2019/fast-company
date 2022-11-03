module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "react/no-unknown-property": ["error", { ignore: ["label"] }],
    // indent: ["error", 2],
    indent: "off",
    semi: [2, "always"],
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" }
    ],
    "multiline-ternary": ["off"],
    quotes: [
      "error",
      "double",
      { allowTemplateLiterals: true, avoidEscape: true }
    ],
    "no-unused-expressions": "off"
  }
};
