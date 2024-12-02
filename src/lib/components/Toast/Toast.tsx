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

import React, { forwardRef, useCallback, useMemo } from "react";
import { cva } from "class-variance-authority";
import { HTMLMotionProps, motion } from "framer-motion";
import { CloseButton } from "../Button";
import { StatusIcon } from "../StatusIcon";
import { ToastInstance } from "./types";
import { DEFAULT } from "./ToastContextProvider";
import { useToastHandler } from "./useToastHandler";
import { tx } from "@/utils/shared";

const styles = cva(
  "visible z-toast flex min-h-[3.7rem] w-full max-w-xs grow select-none items-start rounded-lg px-4 py-3 text-center text-white md:max-w-md",
  {
    variants: {
      position: {
        "top-left": "",
        "top-right": "",
        "bottom-right": "",
        "bottom-left": "",
      },
      stage: {
        entry: "",
        exit: "",
        destroyed: "invisible",
      },
      type: {
        info: "bg-blue-500",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        error: "bg-red-500",
        neutral: "bg-neutral-500",
      },
    },
    compoundVariants: [
      {
        position: ["top-left", "bottom-left"],
        stage: "entry",
        className: "animate-toast-entry-left",
      },
      {
        position: ["top-left", "bottom-left"],
        stage: "exit",
        className: "animate-toast-exit-left",
      },
      {
        position: ["top-right", "bottom-right"],
        stage: "entry",
        className: "animate-toast-entry-right",
      },
      {
        position: ["top-right", "bottom-right"],
        stage: "exit",
        className: "animate-toast-exit-right",
      },
    ],
  },
);

interface ToastProps extends HTMLMotionProps<"div"> {
  toast: ToastInstance;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const { className, toast, ...rest } = props;

  const { hideToastOnTimeout, updateToast, removeToast, defaultOptions } = useToastHandler();

  const shouldAutoClose = useMemo(() => {
    if (toast.options?.shouldAutoClose !== undefined) return toast.options.shouldAutoClose;
    return defaultOptions?.shouldAutoClose !== undefined
      ? defaultOptions.shouldAutoClose
      : DEFAULT.DEFAULT_TOAST_AUTOCLOSE;
  }, [toast]);

  const shouldHideCloseButton = useMemo(() => {
    if (toast.options?.shouldHideCloseButton !== undefined) return toast.options.shouldHideCloseButton;
    else return false;
  }, [toast]);

  const onHoverEnter = useCallback(() => {
    if (toast.callbackRefs) clearTimeout(toast.callbackRefs);
  }, [toast]);

  const onHoverExit = useCallback(() => {
    if (toast.callbackRefs) clearTimeout(toast.callbackRefs);

    if (!shouldAutoClose) {
      return;
    }

    const duration = toast.options?.duration || defaultOptions?.duration || DEFAULT.DEFAULT_TOAST_DURATION;
    const position = toast.options?.position || defaultOptions?.position || DEFAULT.DEFAULT_TOAST_POSITION;

    const cbRef = hideToastOnTimeout({
      id: toast.id,
      timeout: duration,
      position,
    });

    updateToast({
      ...toast,
      callbackRefs: cbRef,
    });
  }, [toast]);

  return (
    <motion.div
      {...toast.options?.toastProps}
      className={tx(
        styles({
          position: toast.options?.position,
          type: toast.options?.status,
          className: [className, toast.options?.toastProps?.className],
        }),
      )}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverExit}
      ref={ref}
      {...rest}
    >
      {toast.options?.icon ??
        (toast.options?.status && <StatusIcon className="text-3xl text-white" status={toast.options.status} />)}
      <motion.div className="grow px-2 text-start">
        {typeof toast.title === "string" ? (
          <>
            <p className="font-poppins text-base font-semibold">{toast.title}</p>
            <p className="break-words text-sm font-medium text-white">{toast.options?.message}</p>
          </>
        ) : (
          toast.title
        )}
      </motion.div>
      {!shouldHideCloseButton ? (
        <CloseButton
          className="mt-0.5 text-white"
          onClick={() => {
            if (toast.callbackRefs) clearTimeout(toast.callbackRefs);

            const position = toast.options?.position || defaultOptions?.position || DEFAULT.DEFAULT_TOAST_POSITION;

            removeToast({
              id: toast.id,
              position,
            });
          }}
        />
      ) : null}
    </motion.div>
  );
});

Toast.displayName = "Toast";
export type { ToastProps };
export { Toast };
