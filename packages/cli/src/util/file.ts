export function excludeFiles(files: string[], excludes: string[]): string[] {
  return files.filter(path => !excludes.some(exclude => path.includes(exclude)))
}
