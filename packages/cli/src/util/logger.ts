import { consola } from 'consola'
import pc from 'picocolors'

export interface LoggerOptions {
  debug: boolean
  prefix?: string
}

export class Logger {
  private _debug = false
  private _prefix = ''
  constructor(options: LoggerOptions) {
    this._debug = options.debug
    this._prefix = options.prefix || ''
  }

  info(message: string, ...args: any[]): void {
    consola.info(pc.blue(`${this._prefix} ${message}`), ...args)
  }

  success(message: string, ...args: any[]): void {
    consola.success(pc.green(`${this._prefix} ${message}`), ...args)
  }

  warn(message: string, ...args: any[]): void {
    consola.warn(pc.yellow(`${this._prefix} ${message}`), ...args)
  }

  error(message: string, ...args: any[]): void {
    consola.error(pc.red(`${this._prefix} ${message}`), ...args)
  }

  debug(message: string, ...args: any[]): void {
    if (this._debug) {
      consola.debug(pc.gray(`${this._prefix} ${message}`), ...args)
    }
  }

  log(message: string, ...args: any[]): void {
    consola.log(`${this._prefix} ${message}`, ...args)
  }
}

export const createLogger = (options: LoggerOptions): Logger =>
  new Logger({ ...options, prefix: options.prefix || '' })
