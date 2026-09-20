const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.d.ts"],
    rules: {
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-redeclare": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "lines-between-class-members": ["error", "always"],
      "import/newline-after-import": ["error", { count: 1 }],
      "import/no-duplicates": ["error", { "prefer-inline": true }],
      "import/order": [
        "error",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
            orderImportKind: "asc",
          },
          groups: [
            "builtin",
            "external",
            ["internal", "parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@/app/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/ui/**",
              group: "internal",
              position: "before",
            },
          ],
          distinctGroup: true,
          pathGroupsExcludedImportTypes: ["object", "type"],
        },
      ],
    },
  },
  {
    ignores: ["dist/*", ".expo/*"],
  },
]);
