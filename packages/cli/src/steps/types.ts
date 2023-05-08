import type { QuestionCollection } from 'inquirer'

export interface IProjectConf {
  projectName: string
  description: string
  npm: 'yarn' | 'pnpm' | 'cnpm' | 'npm'
  templateSource: string
  template: string
  autoInstall?: boolean
  sourcePath?: string
  targetPath?: string
}
export type Prompts = QuestionCollection<IProjectConf>[]

export interface AskMethods {
  (): unknown
}
