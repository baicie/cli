import chalk from "picocolors";
import { existsSync, writeFileSync, readFileSync } from "node:fs";
import { Logger } from "./util/logger";
import { createPackageJson, PackageJson, formatPackageJson } from "@baicie/pkg";

export interface IPkgOptions {
  create?: boolean;
  format?: boolean;
  name?: string;
  version?: string;
  description?: string;
  debug?: boolean;
}

export function pkg(options: IPkgOptions, logger: Logger, pkgPath: string) {
  if (options.create) {
    // 创建 package.json
    if (existsSync(pkgPath)) {
      logger.warn(chalk.yellow(`package.json already exists at ${pkgPath}`));
      return;
    }

    const pkgJson = createPackageJson({
      name: options.name || "my-package",
      version: options.version || "1.0.0",
      description: options.description || "",
    });

    writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2) + "\n");
    logger.success(chalk.green(`✓ Created package.json at ${pkgPath}`));
  } else {
    // 格式化 package.json
    if (!existsSync(pkgPath)) {
      logger.error(chalk.red(`package.json not found at ${pkgPath}`));
      return;
    }

    const pkgContent = readFileSync(pkgPath, "utf-8");
    const pkgJson = JSON.parse(pkgContent) as PackageJson;
    const formatted = formatPackageJson(pkgJson);

    writeFileSync(pkgPath, JSON.stringify(formatted, null, 2) + "\n");
    logger.success(chalk.green(`✓ Formatted package.json at ${pkgPath}`));
  }
}
