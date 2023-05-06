import { basename, resolve } from 'node:path'

export function getProjectName(targetDir: string): string {
  return targetDir === '.' ? basename(resolve()) : targetDir
}
