"use server";
/** import package [start] */
import { inspect } from "util";
import path from "path";
import { createLogger, format, transports } from "winston";
/** import package [end] */

const myFormat = format.printf(
  ({ level, message, fileName, label, timestamp }) => `${timestamp} | ${label}[${fileName}] | ${level} : ${message}`,
);

// Make the LEVEL capitalize in logs
const capitalizeLevel = format((info) => {
  // eslint-disable-next-line no-param-reassign
  info.level = info.level.toUpperCase();
  return info;
})();

// Transports to save the logs to
const errorLogs = new transports.File({ filename: "logs/error.log", level: "error" });
const combinedLogs = new transports.File({ filename: "logs/combined.log" });

const logger = createLogger({
  level: "debug",
  format: format.combine(capitalizeLevel, format.timestamp(), myFormat, format.colorize()),
  defaultMeta: { service: "user-service" },
  transports: [errorLogs, combinedLogs],
  exitOnError: false,
});

/*
 * If not production environment remove the creation of log files
 * if (config.get('NodeEnv') !== 'production') {
 *     logger.clear(); // Remove all transports
 * }
 */

logger.add(
  new transports.Console({
    format: myFormat,
    handleExceptions: true,
    level: "debug",
  }),
);

interface MetaArgs {
  fileName: string;
  label: string;
}

/**
 * Class `Logger` for application logging service.
 */
class Logger {
  private meta: MetaArgs;

  // eslint-disable-next-line no-undef
  constructor(module: NodeModule, moduleName: string) {
    const fileName = path.relative(module.path ?? "/default", module.filename ?? "default");
    this.meta = {
      fileName,
      label: moduleName,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  private createMessage(...args: unknown[]): string {
    let message = "";
    for (let index = 0; index < args.length; index += 1) {
      const logElement = args[index];
      message += typeof logElement === "string" ? logElement : inspect(logElement, false, 10, false);
      message += " ";
    }
    return message;
  }

  private log(logLevel: string, ...args: unknown[]): void {
    const message = this.createMessage(...args);
    logger.log(logLevel, message, this.meta);
  }

  public debug(...args: unknown[]): void {
    this.log("debug", ...args);
  }

  public error(...args: unknown[]): void {
    this.log("error", ...args);
  }

  public warn(...args: unknown[]): void {
    this.log("warn", ...args);
  }

  public info(...args: unknown[]): void {
    this.log("info", ...args);
  }

  public verbose(...args: unknown[]): void {
    this.log("verbose", ...args);
  }

  public silly(...args: unknown[]): void {
    this.log("silly", ...args);
  }
}

export default Logger;
