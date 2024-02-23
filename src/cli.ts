#! /usr/bin/env node
//@ts-ignore
import initAction from "./init.ts";
const { program } = require("commander"); // 处理用户输入的命令

// 创建项目命令
program
  .command("create <name>") // 定义create子命令，<name>为必需参数，可在action的function中接收；如果需要设置为非必需参数，可使用[]
  .description("使用自定义模板快速搭建项目") // 命令描述说明
  .action(initAction); // 执行函数

// 利用commander解析命令行输入，必须写在所有内容最后面
program.parse(process.argv);
