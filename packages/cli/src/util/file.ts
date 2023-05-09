import { TEMPLATE_CREATOR } from './contance'

export function excludeFiles(files: string[]) {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist', '.git/', TEMPLATE_CREATOR]
  return files.filter(
    path => !excludes.some(exclude => path.includes(exclude)),
  )
}
