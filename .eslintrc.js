module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      "next/core-web-vitals", // Next.js recommended rules
      "eslint:recommended",  // ESLint recommended rules
      "plugin:react/recommended", // React specific linting
      "plugin:react-hooks/recommended", // React hooks linting
      "plugin:import/recommended", // Import/export rules
      "plugin:import/typescript", // TypeScript import rules
    ],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ["react", "react-hooks", "import"],
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed for Next.js
      "react/prop-types": "off", // Turn off prop-types for TypeScript projects
      "import/order": [
        "error",
        {
          "groups": [["builtin", "external", "internal"]],
          "newlines-between": "always",
          "alphabetize": { order: "asc", caseInsensitive: true },
        },
      ],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Ignore unused args starting with _
      "no-console": "warn", // Warn on console logs
      "no-debugger": "warn", // Warn on debugger usage
      "prettier/prettier": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {}, // Ensure TypeScript imports are resolved
      },
    },
  };
  