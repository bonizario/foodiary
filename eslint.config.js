import eslintReact from "@eslint-react/eslint-plugin";
import eslintJs from "@eslint/js";
import tanstackPluginQuery from "@tanstack/eslint-plugin-query";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { importX } from "eslint-plugin-import-x";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig({
  files: ["**/*.ts", "**/*.tsx", "**/*.d.ts"],
  extends: [
    eslintJs.configs.recommended,
    tseslint.configs.recommended,
    importX.flatConfigs.recommended,
    importX.flatConfigs.typescript,
    eslintReact.configs["recommended-typescript"],
    eslintReact.configs["strict-type-checked"],
    eslintReact.configs["disable-web-api"],
    tanstackPluginQuery.configs["flat/recommended"],
    eslintConfigPrettier,
  ],
  languageOptions: {
    parser: tseslint.parser,
    ecmaVersion: "latest",
    sourceType: "module",
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-redeclare": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "lines-between-class-members": ["error", "always"],
    "import-x/newline-after-import": ["error", { count: 1 }],
    "import-x/no-duplicates": ["error", { "prefer-inline": true }],
    "import-x/order": [
      "error",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
          orderImportKind: "asc",
        },
        groups: ["builtin", "external", ["internal", "parent", "sibling", "index"]],
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
          {
            pattern: "@/shared/**",
            group: "internal",
            position: "before",
          },
        ],
        distinctGroup: true,
        pathGroupsExcludedImportTypes: ["object", "type"],
      },
    ],
  },
  ignores: ["dist/*", ".expo/*"],
});
