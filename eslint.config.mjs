import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// The import rules from docs/ARCHITECTURE.md: code may only depend on layers below it, so a shared
// component can never come to rely on one page. Each folder lists the layers it may not reach.
const layerRule = (files, ...banned) => ({
  files,
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          { group: ["../*"], message: 'Import across folders with "@/", not "../".' },
          ...banned.map((layer) => ({
            group: [`@/${layer}/*`],
            message: `This layer can't depend on src/${layer}. See docs/ARCHITECTURE.md.`,
          })),
        ],
      },
    ],
  },
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  layerRule(["src/app/**"]),
  layerRule(["src/views/**"], "app"),
  layerRule(["src/features/**"], "app", "views"),
  layerRule(["src/components/**"], "app", "views", "features"),
  layerRule(["src/hooks/**", "src/lib/**", "src/config/**"], "app", "views", "features", "components"),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The motion graphics scene build (npm run motion).
    ".motion-build/**",
    // Installed design skill and its tooling output, not site code.
    ".agents/**",
    ".taste-skill/**",
    "design-reference/**",
    // Runs inside Google Apps Script, not on the site.
    "infra/google-apps-script/**",
  ]),
]);

export default eslintConfig;
