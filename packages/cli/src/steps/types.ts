export interface IProjectConf {
  projectName: string;
  description: string;
  npm: "yarn" | "pnpm" | "cnpm" | "npm";
  templateSource: string;
  template: string;
  autoInstall?: boolean;
  sourcePath?: string;
  targetPath?: string;
  gitRemote?: string;
}

export interface AskMethods {
  (): unknown;
}
