#! /usr/bin/env node
import shell from "shelljs";
import log from "log-symbols";
import fs from "fs";
import ora from "ora";
import { red } from "chalk";
import inquirer from "inquirer";
import path from "path";
import chalk from "chalk";
import clone from "./clone";
import config from "./config";

async function initAction(name: string) {
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
  console.log(config.templateGitRemoteLink);
  try {
    // console.log(getProjectPath(name));
    const prompt = generatePrompt(name);
    const answer = await inquirer.prompt(prompt);
    const cloneSpinner = ora("正在克隆项目...").start();
    await clone(config.templateGitRemoteLink, name);
    cloneSpinner.succeed(chalk.green("拉取成功"));
    generatePackageJson(name, answer);
    console.log(log.success, chalk.green("写入package.json"));

    // 自动安装依赖
    const installSpinner = ora("正在安装依赖…").start();
    installDepended(name);
    installSpinner.succeed(chalk.green("依赖安装完成"));
    installSpinner.succeed(chalk.green("项目创建完成"));
    console.log(answer);
    shell.exit(1);
  } catch (error) {
    console.log(log.error, red(error));
  }
}
function generatePrompt(projectName: string) {
  const formatPrompt = {
    type: "input",
    name: "name",
    message: `Please enter your project name?(${projectName})`,
    default: `${projectName}`,
  };

  return [formatPrompt, ...config.prompt];
}

function generatePackageJson(projectName: string, answer: any) {
  const projectPath = getProjectPath(`${projectName}/package.json`);
  let packageJson = fs.readFileSync(projectPath, "utf-8");
  packageJson = JSON.parse(packageJson);
  for (const key in answer) {
    if (isValidKey(key, answer)) {
      packageJson[key] = answer[key];
    }
  }
  fs.writeFileSync(projectPath, JSON.stringify(packageJson, null, 2));
}

function getProjectPath(projectName: string) {
  return path.resolve(__dirname, `../../${projectName}`);
}

function installDepended(projectName: string) {
  const projectPath = getProjectPath(projectName);
  if (shell.exec(`cd ${projectPath} && npm install -D`).code !== 0) {
    console.log(log.error, chalk.red("自动安装依赖失败，请手动安装"));
    shell.exit(1);
  }
}

function isValidKey(
  key: string | number | symbol,
  obj: Object
): key is keyof Object {
  return key in obj;
}

export default initAction;
