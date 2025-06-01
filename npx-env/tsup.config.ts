import type { Options } from "tsup"

const env = process.env.NODE_ENV

export const tsup: Options = {
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ["cjs"],
  minify: env === "production",
  bundle: env === "production",
  skipNodeModulesBundle: true,
  watch: env === "development",
  target: "es2020",
  outDir: env === "production" ? "dist" : "lib",
  entry: ["src/index.ts"],
  shims: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
}