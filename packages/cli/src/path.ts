import { relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const projectRoot: string = resolve(
  fileURLToPath(import.meta.url),
  '..',
  '..',
)
export const pkgRoot: string = resolve(projectRoot, 'packages')
// 可能需要判断
export const cacheRoot: string = relative(projectRoot, 'cache')
export const templateRoot: string = resolve(projectRoot, 'templates')
