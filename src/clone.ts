import { simpleGit, SimpleGit, CleanOptions } from "simple-git";
import path from "path";
const git: SimpleGit = simpleGit();

export default function (remote: string, name: string) {
  return git.clone(remote, path.resolve(__dirname, `../../${name}`));
}
