import { ReactElement } from "react";
import { HTMLMotionProps } from "framer-motion";

type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type ToastStatus = "info" | "warning" | "success" | "error" | "neutral";

type ToastOptions = {
  status?: ToastStatus;
  position?: ToastPosition;
  duration?: number;
  shouldAutoClose?: boolean;
  shouldHideCloseButton?: boolean;
};

type ToastInstance = {
  title: string | ReactElement;
  options?: {
    message?: string;
    icon?: ReactElement;
    toastProps?: HTMLMotionProps<"div">;
  } & ToastOptions;
  id: string;
  createdAt: number;
  callbackRefs: NodeJS.Timeout | null;
};

type Toasts = {
  [position in ToastPosition]: ToastInstance[];
};

export type { ToastPosition, ToastStatus, ToastOptions, ToastInstance, Toasts };
