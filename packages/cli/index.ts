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
  DEFAULT_TEMPLATE_SRC,
  fetchTemplates,
} from "./src";
import { cac } from "cac";
import { createLogger, Logger } from "./src/util/logger";
import { readFileSync } from "node:fs";

const { version } = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url)).toString()
);

const cli = cac("bca");

cli.option("-d, --debug [feat]", `[string | boolean] show debug logs`);

cli
  .command("[root]", "start a new project")
  .option("-des, --description <description>", "description of the project")
  .option("-n, --npm <npm>", "npm of the project", { default: "pnpm" })
  .option(
    "-ts, --template-source <template-source>",
    "template source of the project",
    {
      default: DEFAULT_TEMPLATE_SRC,
    }
  )
  .option("-t, --template <template>", "template of the project")
  .option("-i, --auto-install [auto-install]", "auto install of the project", {
    default: false,
  })
  .option("-gi, --git-init [git-init]", "git init of the project", {
    default: false,
  })
  .option("-gr, --git-remote <git-remote>", "git remote of the project")
  .action(async (root: string, options: IProjectConf) => {
    const logger = createLogger({ debug: options.debug });
    logger.success(`start a new project ${root}`);
    logger.success(`options is ${JSON.stringify(options)}`);
    try {
      const answers = await ask({ ...options, projectName: root }, logger);
      await write(answers);
    } catch (error) {
      logger.error(chalk.red(`创建项目失败：${error}`));
    }
  });

async function ask(options: IProjectConf, logger: Logger) {
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

async function write(conf: IProjectConf) {
  await createApp(conf);
}

cli.help();
cli.version(version);

cli.parse();
