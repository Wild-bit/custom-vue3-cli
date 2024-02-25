// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead",
        modules: false, // 设置为 false，以便 Babel 不会在模块中生成 import/export 语句
      },
      "@babel/preset-typescript",
    ],
  ],
};
