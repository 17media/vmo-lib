module.exports = {
  extends: ["airbnb", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    jsx: true,
    useJSXTextNode: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    "prettier/prettier": 2,
    "no-param-reassign": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "react/prop-types": 0,
    "@typescript-eslint/no-use-before-define": "off",
    "react/jsx-filename-extension": 0,
    "no-console": 0,
    "import/no-named-as-default": 0,
    "consistent-return": 0,
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
