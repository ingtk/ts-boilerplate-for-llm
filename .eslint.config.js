import tseslint from "typescript-eslint"
import nextPlugin from "@next/eslint-plugin-next"

const nextCoreRules = nextPlugin.configs["core-web-vitals"]?.rules ?? {}

const tsConfigs = tseslint.configs.recommended.map((config) => ({
  ...config,
  files: ["**/*.{ts,tsx}"],
}))

export default [
  {
    ignores: [".next/**", "dist/**", "node_modules/**"],
  },
  ...tsConfigs,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextCoreRules,
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportExpression",
          message: "動的 import() は禁止されています",
        },
        { selector: "TSEnumDeclaration", message: "enum の使用は禁止" },
        { selector: "ClassDeclaration", message: "class の使用は禁止" },
        { selector: "ClassExpression", message: "class の使用は禁止" },
      ],
    },
  },
]