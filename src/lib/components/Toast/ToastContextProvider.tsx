import { createContext } from "react";
import { ToastPosition, ToastStatus, ToastOptions, Toasts } from "./types";

const DEFAULT_TOAST_POSITION: ToastPosition = "bottom-right";
const DEFAULT_TOAST_STATUS: ToastStatus = "info";
const DEFAULT_TOAST_DURATION = 5000; // in ms, 1000ms = 1sec
const DEFAULT_TOAST_ID_LENGTH = 10;
const DEFAULT_TOAST_AUTOCLOSE = true;

const DEFAULT = {
  DEFAULT_TOAST_POSITION,
  DEFAULT_TOAST_STATUS,
  DEFAULT_TOAST_DURATION,
  DEFAULT_TOAST_ID_LENGTH,
  DEFAULT_TOAST_AUTOCLOSE,
};

interface ToastContextProps {
  toasts: Toasts;
  setToasts: (arg0: Toasts | ((prevState: Toasts) => Toasts)) => void;
  options?: ToastOptions;
}

const ToastContext = createContext<ToastContextProps | null>(null);

export type { ToastContextProps };
export { DEFAULT, ToastContext };
