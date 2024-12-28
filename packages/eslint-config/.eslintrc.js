const internalPaths = ["@/*"];

// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    "plugin:perfectionist/recommended-natural-legacy",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "eslint:recommended",
  ],
  overrides: [
    {
      files: ["*.json"],
      rules: {
        "@typescript-eslint/no-unused-expressions": "off",
      },
    },
    {
      extends: ["plugin:package-json/recommended"],
      files: ["package.json"],
      parser: "jsonc-eslint-parser",
      plugins: ["package-json"],
      rules: {
        "package-json/valid-package-def": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["tailwindcss", "perfectionist"],
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "_",
        varsIgnorePattern: "^_",
      },
    ],
    camelcase: [0],
    "import/no-unresolved": [
      2,
      {
        ignore: [...internalPaths, "@env"],
      },
    ],
    "import/order": [
      "error",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        "newlines-between": "always",
        pathGroups: [
          {
            group: "builtin",
            pattern: "@env",
          },
          {
            group: "builtin",
            pattern: "react",
          },
          {
            group: "builtin",
            pattern: "react-dom",
          },
          { group: "internal", pattern: "./*" },
          ...internalPaths.map((path) => ({
            group: "internal",
            pattern: path,
          })),
        ],
        pathGroupsExcludedImportTypes: ["react", "react-dom"],
      },
    ],
    "no-console": [
      "error",
      {
        allow: ["error"],
      },
    ],
    "no-shadow": "off",
    "no-unused-vars": "off",
    "perfectionist/sort-imports": "off",
    "perfectionist/sort-objects": [
      "error",
      {
        type: "natural",
      },
    ],
    quotes: ["warn", "double", "avoid-escape"],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
    "sort-keys": "off",
    "tailwindcss/no-custom-classname": 0,
  },
};
