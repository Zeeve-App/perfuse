"use server";
import chProcess from "child_process";
import Logger from "./logger";
import { createTaskHandler } from "./task-handler";
import { updateTask } from "@/db-queries";

const logger = new Logger(module, "jobShellExecutor");

const jobShellExecutor = (
  command: string,
  cwdPath: string,
  timeout?: number,
  regex?: RegExp | string,
): Promise<string[]> => {
  logger.debug("jobShellExecutor:", command, `cwdPath: ${cwdPath}`);
  return new Promise((resolve, reject) => {
    const result: string[] = [];
    const resSpawn = chProcess.spawn(command, [], {
      cwd: cwdPath,
      shell: "/bin/bash",
    });
    resSpawn.on("error", (error) => reject(error));
    resSpawn.stderr.on("data", (data) => {
      logger.debug(data.toString());
      if (regex && data.toString().match(regex)) {
        result.push(data.toString().match(regex)[0]);
      }
    });
    resSpawn.stdout.on("data", (data) => {
      logger.debug(data.toString());
      if (regex && data.toString().match(regex)) {
        result.push(data.toString().match(regex)[0]);
      }
    });
    let killScript: NodeJS.Timeout;
    if (typeof timeout === "number") {
      killScript = setTimeout(() => {
        resSpawn.kill();
        logger.error(`Script exited : path-${cwdPath} cmd-${command}`);
      }, timeout);
    }

    resSpawn.on("close", (code) => {
      logger.debug(`child process exited with code ${code}`);
      clearTimeout(killScript);
      if (code === 0) {
        logger.info(`Successfully executed cmd -> ${command}`);
        return resolve(result);
      }
      return reject(result);
    });
  });
};

const jobShellExecutorBG = async (
  command: string,
  cwdPath: string,
  taskId?: string,
  timeout?: number,
  regex?: RegExp | string,
) => {
  try {
    await jobShellExecutor(command, cwdPath, timeout, regex);
    taskId && (await updateTask({ task_status: "completed" }, taskId));
    await createTaskHandler();
  } catch (error) {
    taskId && (await updateTask({ task_status: "failed" }, taskId));
  }
};

export { jobShellExecutor, jobShellExecutorBG };
