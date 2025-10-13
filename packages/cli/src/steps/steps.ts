import fs from "fs-extra";
import { confirm, input, select } from "@inquirer/prompts";
import chalk from "chalk";
import {
  DEFAULT_TEMPLATE_SRC,
  DEFAULT_TEMPLATE_SRC_GITEE,
  isEmpty,
  isValidPackageName,
} from "../util";

import type { ITemplates } from "../download";

const defaultTargetDir = "my-project";

export async function askProjectName() {
  const projectName = await input({
    message: "项目名称?",
    default: defaultTargetDir,
    validate: (value) => {
      return isValidPackageName(value);
    },
  });

  // 存在且不为空
  if (fs.existsSync(projectName) && !isEmpty(projectName)) {
    const overwrite = await confirm({
      message: `当前目录${projectName}已经存在同名项目，是否覆写?`,
    });

    if (overwrite) {
      // 清除操作
      fs.removeSync(projectName);
    } else {
      throw new Error(chalk.red("取消创建"));
    }
  }

  return projectName;
}

export async function askDescription() {
  // description
  return await input({
    message: "请输入项目介绍",
  });
}

export async function askNpm() {
  const choices = [
    {
      name: "pnpm",
      value: "pnpm",
    },
    {
      name: "yarn",
      value: "yarn",
    },
    {
      name: "npm",
      value: "npm",
    },
    {
      name: "cnpm",
      value: "cnpm",
    },
  ];
  return await select({
    message: "请选择包管理工具",
    choices,
  });
}

export async function askSelfInputTemplateSource() {
  return input({
    message: "请输入github地址",
  });
}

export async function askGitInit() {
  return confirm({
    message: "是否需要初始化 Git 仓库?",
    default: true,
  });
}

export async function askGitRemote() {
  return input({
    message: "请输入远程仓库地址 (例如: https://github.com/username/repo.git)",
    validate: (value) => {
      if (!value) return "请输入有效的仓库地址";
      if (
        !(
          value.endsWith(".git") ||
          value.includes("github.com") ||
          value.includes("gitlab") ||
          value.includes("gitee.com")
        )
      ) {
        return "请输入有效的 Git 仓库地址";
      }
      return true;
    },
  });
}

export async function askTemplateSource() {
  const choices = [
    {
      name: "Gitee（最快）",
      value: DEFAULT_TEMPLATE_SRC_GITEE,
    },
    {
      name: "Github（最新）",
      value: DEFAULT_TEMPLATE_SRC,
    },
    {
      name: "CLI 内置默认模板",
      value: "default-template",
    },
    {
      name: "自定义",
      value: "self-input",
    },
  ];

  return await select({
    message: "请选择模板源",
    choices,
  });
}

export async function askTemplate(list: ITemplates[]) {
  const choices = [
    {
      name: "默认模板",
      value: "default",
    },
    ...list.map((item) => ({
      name: item.desc ? `${item.name}（${item.desc}）` : item.name,
      value: item.name,
    })),
  ];
  return await select({
    message: "请选择模板",
    choices,
  });
}
