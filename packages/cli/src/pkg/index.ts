import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import type { Logger } from '../util/logger'
import {
  type PackageJson,
  createPackageJson,
  formatPackageJson,
} from '@baicie/pkg'
import {
  askPackageDescription,
  askPackageName,
  askPackagePreset,
  askPackageVersion,
} from './step'

export interface IPkgOptions {
  create?: boolean
  format?: boolean
  name?: string
  version?: string
  description?: string
  debug?: boolean
  preset?: 'basic' | 'library'
}

export async function pkg(
  options: IPkgOptions,
  logger: Logger,
  pkgPath: string,
): Promise<void> {
  if (options.create) {
    if (existsSync(pkgPath)) {
      logger.warn(`package.json already exists at ${pkgPath}`)
      return
    }

    // 如果缺少必要参数，使用交互式步骤询问
    let name = options.name
    let version = options.version
    let description = options.description
    let preset = options.preset

    if (!name) {
      name = await askPackageName()
    }
    if (!version) {
      version = await askPackageVersion()
    }
    if (!description) {
      description = await askPackageDescription()
    }
    if (!preset) {
      preset = await askPackagePreset(options.preset)
    }

    const pkgJson = createPackageJson({
      name,
      version,
      description,
      preset,
    })

    writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2) + '\n')
    logger.success(`✓ Created package.json at ${pkgPath}`)
  } else {
    if (!existsSync(pkgPath)) {
      logger.error(`package.json not found at ${pkgPath}`)
      return
    }

    const pkgContent = readFileSync(pkgPath, 'utf-8')
    const pkgJson = JSON.parse(pkgContent) as PackageJson
    const formatted = formatPackageJson(pkgJson)

    writeFileSync(pkgPath, formatted)
    logger.success(`✓ Formatted package.json at ${pkgPath}`)
  }
}
