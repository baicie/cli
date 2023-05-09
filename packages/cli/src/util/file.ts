export function excludeFiles(files: string[], excludes: string[]) {
  return files.filter(
    path => !excludes.some(exclude => path.includes(exclude)),
  )
}
