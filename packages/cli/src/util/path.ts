import { relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const projectRoot = resolve(fileURLToPath(import.meta.url), '..', '..')
export const pkgRoot = resolve(projectRoot, 'packages')
// 可能需要判断
export const cacheRoot = relative(projectRoot, 'cache')
export const templateRoot = resolve(projectRoot, 'templates')
