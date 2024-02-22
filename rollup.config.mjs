// rollup.config.mjs
import typescript from "rollup-plugin-typescript2";
export default {
  input: "src/cli.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  plugin: [
    typescript({
      tsconfig: "tsconfig.json",
    }),
  ],
};
