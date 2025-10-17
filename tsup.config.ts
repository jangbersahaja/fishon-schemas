import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  dts: {
    entry: "src/index.ts",
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  target: "es2020",
  // Keep file names aligned with package.json
  // ESM will output index.mjs, CJS will output index.cjs.js
  outExtension({ format }: { format: "esm" | "cjs" }) {
    if (format === "esm") return { js: ".mjs" };
    return { js: ".cjs.js" };
  },
});
