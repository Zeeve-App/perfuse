/* eslint-disable @typescript-eslint/no-explicit-any */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line @typescript-eslint/ban-types
type Arguments<F extends Function> = F extends (...args: infer A) => any ? A : never;

const callMultipleHandlers = <T extends (event: any) => void>(...fns: (T | undefined)[]) => {
  return function func(event: Arguments<T>[0]) {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
};

/** twMerge + clsx */
const tx = (...values: ClassValue[]) => {
  return twMerge(clsx(values));
};

export { callMultipleHandlers, tx };
