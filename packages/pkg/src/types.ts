/**
 * Package.json 类型定义
 */

export interface Person {
  name: string;
  email?: string;
  url?: string;
}

export interface Repository {
  type: string;
  url: string;
  directory?: string;
}

export interface Bugs {
  url?: string;
  email?: string;
}

export interface PackageJson {
  name?: string;
  version?: string;
  description?: string;
  keywords?: string[];
  homepage?: string;
  bugs?: string | Bugs;
  license?: string;
  author?: string | Person;
  contributors?: (string | Person)[];
  funding?:
    | string
    | { type?: string; url: string }
    | Array<string | { type?: string; url: string }>;
  files?: string[];
  main?: string;
  browser?: string;
  bin?: string | Record<string, string>;
  man?: string | string[];
  directories?: {
    lib?: string;
    bin?: string;
    man?: string;
    doc?: string;
    example?: string;
    test?: string;
  };
  repository?: string | Repository;
  scripts?: Record<string, string>;
  config?: Record<string, any>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
  optionalDependencies?: Record<string, string>;
  bundledDependencies?: string[];
  engines?: Record<string, string>;
  os?: string[];
  cpu?: string[];
  private?: boolean;
  publishConfig?: Record<string, any>;
  workspaces?: string[] | { packages?: string[]; nohoist?: string[] };
  type?: "module" | "commonjs";
  exports?: string | Record<string, any>;
  imports?: Record<string, any>;
  module?: string;
  types?: string;
  typings?: string;
  sideEffects?: boolean | string[];
  packageManager?: string;
  [key: string]: any;
}

export interface FormatOptions {
  /**
   * 缩进空格数，默认 2
   */
  indent?: number;
  /**
   * 是否在文件末尾添加换行符，默认 true
   */
  endOfLine?: boolean;
  /**
   * 字段排序规则
   */
  sortFields?: boolean | string[];
  /**
   * 是否对 scripts 排序，默认 false
   */
  sortScripts?: boolean;
  /**
   * 是否对依赖排序，默认 true
   */
  sortDependencies?: boolean;
}

export interface CreateOptions {
  /**
   * 包名
   */
  name?: string;
  /**
   * 版本号，默认 '0.1.0'
   */
  version?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 作者
   */
  author?: string | Person;
  /**
   * 许可证，默认 'MIT'
   */
  license?: string;
  /**
   * 模块类型，默认 'module'
   */
  type?: "module" | "commonjs";
  /**
   * 是否为私有包
   */
  private?: boolean;
  /**
   * 预设模板
   */
  preset?: "basic" | "library" | "cli" | "monorepo" | "typescript";
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings?: ValidationError[];
}

export interface SortOptions {
  /**
   * 字段排序顺序
   */
  fieldsOrder?: string[];
  /**
   * 是否对依赖排序
   */
  sortDependencies?: boolean;
  /**
   * 是否对 scripts 排序
   */
  sortScripts?: boolean;
}
