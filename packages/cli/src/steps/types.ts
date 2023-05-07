import type { QuestionCollection } from 'inquirer'

export interface IProjectConf {
  projectName: string
  description: string
  npm: string
  templateSource: string
  template: string
}
export type Prompts = QuestionCollection<IProjectConf>[]

export interface AskMethods {
  (): unknown
}
