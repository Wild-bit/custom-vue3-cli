#! /usr/bin/env node
// import inquirer from "inquirer";
import shell from "shelljs";
import log from "log-symbols";
import fs from "fs";
import clone from "./clone";
import config from "./config";

const initAction = async (name: string) => {
  console.log(name);

  if (!shell.which("git")) {
    console.log(log.error, "git 命令不可用");
    shell.exit(1);
  }
  // 验证name输入是否合法
  if (name.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) {
    console.log(log.error, "项目名称存在非法字符！");
    shell.exit(1);
  }
  if (fs.existsSync(name)) {
    console.log(log.error, "项目名已存在，请重新命名");
    shell.exit(1);
  }

  try {
    await clone(`direct:${config.templateGitRemoteLink}`, name);
  } catch (error) {
    console.log(log.error, "下载失败!");
    shell.exit(1);
  }
};

export default initAction;
