import { Logger } from "../util/logger";

export interface IProjectConf {
  projectName: string;
  description: string;
  npm: "yarn" | "pnpm" | "cnpm" | "npm";
  templateSource: string;
  template: string;
  autoInstall?: boolean;
  sourcePath?: string;
  targetPath?: string;
  gitInit?: boolean;
  gitRemote?: string;
  debug: boolean;
  logger: Logger;
}

export interface AskMethods {
  (): unknown;
}
