import { consola } from "consola";
import pc from "picocolors";

export interface LoggerOptions {
  debug: boolean;
}

export class Logger {
  private _debug = false;

  constructor(options: LoggerOptions) {
    this._debug = options.debug;
  }

  info(message: string, ...args: any[]) {
    if (this._debug) {
      consola.info(pc.blue(message), ...args);
    }
  }

  success(message: string, ...args: any[]) {
    if (this._debug) {
      consola.success(pc.green(message), ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (this._debug) {
      consola.warn(pc.yellow(message), ...args);
    }
  }

  error(message: string, ...args: any[]) {
    if (this._debug) {
      consola.error(pc.red(message), ...args);
    }
  }

  debug(message: string, ...args: any[]) {
    if (this._debug) {
      consola.debug(pc.gray(message), ...args);
    }
  }

  log(message: string, ...args: any[]) {
    if (this._debug) {
      consola.log(message, ...args);
    }
  }
}

export const createLogger = (options: LoggerOptions) => new Logger(options);
