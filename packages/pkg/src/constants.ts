/**
 * 常量定义
 */

/**
 * package.json 字段的标准排序顺序
 */
export const STANDARD_FIELDS_ORDER: string[] = [
  'name',
  'private',
  'version',
  'packageManager',
  'type',
  'description',
  'keywords',
  'homepage',
  'bugs',
  'license',
  'author',
  'contributors',
  'funding',
  'files',
  'main',
  'module',
  'browser',
  'bin',
  'man',
  'types',
  'typings',
  'unpkg',
  'jsdelivr',
  'exports',
  'imports',
  'directories',
  'sideEffects',
  'repository',
  'scripts',
  'engines',
  'config',
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'peerDependenciesMeta',
  'optionalDependencies',
  'bundledDependencies',
  'os',
  'cpu',
  'publishConfig',
  'workspaces',
]

/**
 * 必需字段
 */
export const REQUIRED_FIELDS: string[] = ['name', 'version']

/**
 * 依赖字段
 */
export const DEPENDENCY_FIELDS: string[] = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
]

/**
 * 有效的 license 列表（常用的）
 */
export const VALID_LICENSES: string[] = [
  'MIT',
  'ISC',
  'Apache-2.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'GPL-3.0',
  'LGPL-3.0',
  'MPL-2.0',
  'UNLICENSED',
]

/**
 * 预设模板
 */
export const PRESETS: Record<string, any> = {
  basic: {
    private: true,
    version: '3.5.22',
    packageManager: 'pnpm@10.20.0',
    type: 'module',
    scripts: {
      dev: 'echo dev',
      build: 'echo build',
      clean: 'rimraf --glob packages/*/dist temp .eslintcache',
      check: 'tsc --incremental --noEmit',
      lint: 'eslint --cache .',
      format: 'prettier --write --cache .',
      'format-check': 'prettier --check --cache .',
      test: 'vitest',
      'test-unit': 'vitest --project unit*',
      'test-e2e':
        'node scripts/build.js zeus -f global -d && vitest --project e2e',
      'test-coverage': 'vitest run --project unit* --coverage',
      preinstall: 'npx only-allow pnpm',
      postinstall: 'simple-git-hooks',
    },
    'simple-git-hooks': {
      'pre-commit': 'pnpm lint-staged && pnpm check',
      'commit-msg': 'node scripts/verify-commit.js',
    },
    'lint-staged': {
      '*.{js,json}': ['prettier --write'],
      '*.ts?(x)': ['eslint --fix', 'prettier --parser=typescript --write'],
    },
    engines: {
      node: '>=18.12.0',
    },
    devDependencies: {
      '@types/node': '^24.9.1',
      '@vitest/eslint-plugin': '^1.3.23',
      eslint: '^9.38.0',
      'eslint-plugin-import-x': '^4.16.1',
      jsdom: '^27.0.1',
      'lint-staged': '^16.2.6',
      picocolors: '^1.1.1',
      prettier: '^3.6.2',
      'simple-git-hooks': '^2.13.1',
      typescript: '^5.9.3',
      'typescript-eslint': '^8.46.2',
      vitest: '^4.0.1',
    },
  },
  library: {
    name: '',
    version: '0.1.0',
    description: '',
    main: 'index.js',
    module: 'dist/default.esm-bundler.js',
    types: 'dist/default.d.ts',
    unpkg: 'dist/default.global.js',
    jsdelivr: 'dist/default.global.js',
    files: ['index.js', 'dist'],
    exports: {
      '.': {
        types: './dist/default.d.ts',
        node: {
          production: './dist/default.cjs.prod.js',
          development: './dist/default.cjs.js',
          default: './index.js',
        },
        module: './dist/default.esm-bundler.js',
        import: './dist/default.esm-bundler.js',
        require: './index.js',
      },
      './*': './*',
    },
    sideEffects: false,
    repository: {
      type: 'git',
      url: '',
      directory: '',
    },
    buildOptions: {
      name: 'default',
      formats: ['esm-bundler', 'esm-browser', 'cjs', 'global'],
    },
    keywords: ['default'],
    author: '',
    license: 'MIT',
    bugs: {
      url: '',
    },
    homepage: '',
    dependencies: {},
  },
} as const
