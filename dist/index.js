#! /usr/bin/env node
'use strict';

var shell = require('shelljs');
var fs = require('fs');

const logSymbols = {
	info: 'ℹ️',
	success: '✅',
	warning: '⚠️',
	error: '❌️',
};

// import inquirer from "inquirer";
const initAction = name => {
  console.log(name);
  if (!shell.which("git")) {
    console.log(logSymbols.error, "git 命令不可用");
    shell.exit(1);
  }
  // 验证name输入是否合法
  if (name.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) {
    console.log(logSymbols.error, "项目名称存在非法字符！");
    shell.exit(1);
  }
  if (fs.existsSync(name)) {
    console.log(logSymbols.error, "项目名已存在，请重新命名");
    shell.exit(1);
  }
};

//@ts-ignore
const {
  program
} = require("commander"); // 处理用户输入的命令
// 创建项目命令
program.command("create <name>") // 定义create子命令，<name>为必需参数，可在action的function中接收；如果需要设置为非必需参数，可使用[]
.description("使用自定义模板快速搭建项目") // 命令描述说明
.action(initAction); // 执行函数
// 利用commander解析命令行输入，必须写在所有内容最后面
program.parse(process.argv);
