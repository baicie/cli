import { createApp } from "./create";
import {
  IProjectConf,
  askAutoInstall,
  askDescription,
  askGitInit,
  askGitRemote,
  askNpm,
  askProjectName,
  askSelfInputTemplateSource,
  askTemplate,
  askTemplateSource,
  fetchTemplates,
} from "./steps";
import { Logger } from "./util/logger";

export async function ask(options: IProjectConf, logger: Logger) {
  if (!options.projectName) {
    options.projectName = await askProjectName();
  }
  options.description = await askDescription();
  options.npm = (await askNpm()) as IProjectConf["npm"];
  options.templateSource = await askTemplateSource();

  if (options.templateSource === "self-input")
    options.templateSource = await askSelfInputTemplateSource();

  // 下载模板并返回列表
  const templates = await fetchTemplates(options, options);
  options.template = await askTemplate(templates);

  // 询问是否需要初始化 Git 仓库
  options.gitInit = await askGitInit();
  options.autoInstall = await askAutoInstall();

  // 如果需要初始化 Git，则询问远程仓库地址
  if (options.gitInit) {
    options.gitRemote = await askGitRemote();
  }

  return options;
}

export async function write(conf: IProjectConf) {
  await createApp(conf);
}
