import { relative, resolve } from 'node:path'

export const projectRoot = resolve(__dirname, '..', '..', '..', '..')
export const pkgRoot = resolve(projectRoot, 'packages')
// 可能需要判断
export const cacheRoot = relative(projectRoot, 'cache')
