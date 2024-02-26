// rollup.config.mjs
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/cli.ts",
  output: {
    file: "dist/index.cjs",
    format: "cjs",
  },
  plugins: [
    json(),
    commonjs({
      include: "node_modules/**",
    }),
    resolve({
      browser: false,
      preferBuiltins: true,
    }),
    typescript({
      tsconfig: "tsconfig.json",
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".ts", ".js"],
      include: ["src/**/*"],
    }),
  ],
  external: ["shelljs"],
};
