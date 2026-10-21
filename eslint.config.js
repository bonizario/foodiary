import eslintReact from "@eslint-react/eslint-plugin";
import eslintJs from "@eslint/js";
import tanstackPluginQuery from "@tanstack/eslint-plugin-query";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { importX } from "eslint-plugin-import-x";
import perfectionist from "eslint-plugin-perfectionist";
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
  plugins: {
    perfectionist,
  },
  settings: {
    "import-x/resolver-next": [createTypeScriptImportResolver({ project: "./tsconfig.json" })],
  },
  rules: {
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-redeclare": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "lines-between-class-members": ["error", "always"],
    // sort-imports orders the statements (lines) into groups
    "perfectionist/sort-imports": [
      "error",
      {
        type: "alphabetical",
        ignoreCase: true,
        newlinesBetween: 1,
        internalPattern: ["^@/.*"],
        groups: [
          "builtin",
          "external",
          "app",
          "ui",
          "shared",
          ["internal", "parent", "sibling", "index"],
        ],
        customGroups: [
          { groupName: "app", elementNamePattern: "^@/app/.*" },
          { groupName: "ui", elementNamePattern: "^@/ui/.*" },
          { groupName: "shared", elementNamePattern: "^@/shared/.*" },
        ],
      },
    ],
    // sort-named-imports orders the names inside each import's braces, with type members sorted after value members
    "perfectionist/sort-named-imports": [
      "error",
      { type: "alphabetical", ignoreCase: true, groups: ["value-import", "type-import"] },
    ],
    "import-x/newline-after-import": ["error", { count: 1 }],
    "import-x/no-duplicates": ["error", { "prefer-inline": true }],
  },
  ignores: ["dist/*", ".expo/*"],
});
