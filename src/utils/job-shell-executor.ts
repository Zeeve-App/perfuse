/**
* SPDX-License-Identifier: AGPL-3.0-or-later
* Copyright (C) 2024 [Perfuse]
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
* This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
    taskId && (await updateTask({ task_status: "completed", task_updated_at: new Date().toISOString() }, taskId));
    await createTaskHandler();
  } catch (error) {
    taskId && (await updateTask({ task_status: "failed", task_updated_at: new Date().toISOString() }, taskId));
  }
  return;
};

export { jobShellExecutor, jobShellExecutorBG };
