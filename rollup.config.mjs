// rollup.config.mjs
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/cli.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
  plugins: [
    commonjs({
      include: "node_modules/**",
    }),
    resolve(),
    typescript({
      tsconfig: "tsconfig.json",
    }),
    babel({
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      include: ["src/**/*"],
    }),
  ],
  external: ["shelljs"],
};
