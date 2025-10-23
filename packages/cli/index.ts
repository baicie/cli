import { consola } from "consola";
import chalk from "picocolors";
import type { IProjectConf } from "./src";
import {
  askAutoInstall,
  askDescription,
  askGitInit,
  askGitRemote,
  askNpm,
  askProjectName,
  askSelfInputTemplateSource,
  askTemplate,
  askTemplateSource,
  createApp,
  fetchTemplates,
} from "./src";
import { Command } from "commander";
import { createLogger } from "./src/util/logger";

const program = new Command();

program.option("-d, --debug", "enable debug mode").parse(process.argv);

export interface IOptions {
  debug: boolean;
}

const options = program.opts<IOptions>();
export const logger = createLogger({ debug: options.debug });

async function ask(options: IOptions) {
  const conf: IProjectConf = {
    projectName: "",
    description: "",
    npm: "pnpm",
    templateSource: "",
    template: "",
  };

  conf.projectName = await askProjectName();
  conf.description = await askDescription();
  conf.npm = (await askNpm()) as IProjectConf["npm"];
  conf.templateSource = await askTemplateSource();

  if (conf.templateSource === "self-input")
    conf.templateSource = await askSelfInputTemplateSource();

  // 下载模板并返回列表
  const templates = await fetchTemplates(conf, options);
  conf.template = await askTemplate(templates);

  // 询问是否需要初始化 Git 仓库
  conf.gitInit = await askGitInit();
  conf.autoInstall = await askAutoInstall();

  // 如果需要初始化 Git，则询问远程仓库地址
  if (conf.gitInit) {
    conf.gitRemote = await askGitRemote();
  }

  return conf;
}

async function write(conf: IProjectConf) {
  await createApp(conf);
}

async function main(options: IOptions) {
  logger.debug("start");
  try {
    const answers = await ask(options);

    await write(answers);
  } catch (error) {
    consola.log(chalk.red(`创建项目失败：${error}`));
  }
}

main(options).catch((e) => {
  console.error(e);
});
