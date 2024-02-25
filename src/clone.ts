import { simpleGit, SimpleGit, CleanOptions } from "simple-git";
import path from "path";
const git: SimpleGit = simpleGit();

export default function (remote: string, name: string) {
  // const cloneSpinner = ora("正在拉取项目…").start();
  return git.clone(remote, path.resolve(__dirname, `../../${name}`));
}
