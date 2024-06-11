import { useContext } from "react";
import { nanoid } from "nanoid";
// import { RemoveProperties } from "../../core";
import { RemoveProperties } from "../core";
import { DEFAULT, ToastContext } from "./ToastContextProvider";
import { ToastPosition, ToastInstance } from "./types";

const useToastHandler = () => {
  const context = useContext(ToastContext);

  if (context === null) throw new Error("useToastHandler can only be used within the <ToastContainer />.");

  const { setToasts, options: defaultOptions, toasts } = context;

  const removeToast = ({ id, position }: { id: ToastInstance["id"]; position: ToastPosition }) => {
    setToasts((prev) => {
      return { ...prev, [position]: prev[position].filter((toast) => toast.id !== id) };
    });
  };

  const updateToast = (payload: ToastInstance) => {
    const position = payload.options?.position || DEFAULT.DEFAULT_TOAST_POSITION;

    setToasts((prev) => {
      return {
        ...prev,
        [position]: prev[position].map((toast) => {
          if (toast.id === payload.id) return { ...toast, ...payload };
          else return toast;
        }),
      };
    });
  };

  const hideToastOnTimeout = (payload: { id: ToastInstance["id"]; timeout: number; position: ToastPosition }) => {
    return setTimeout(() => {
      removeToast({ id: payload.id, position: payload.position });
    }, payload.timeout);
  };

  const addToast = (payload: RemoveProperties<ToastInstance, "id" | "createdAt" | "callbackRefs">) => {
    const toastId = payload.options?.toastProps?.id || nanoid(DEFAULT.DEFAULT_TOAST_ID_LENGTH);
    const position = payload.options?.position || defaultOptions?.position || DEFAULT.DEFAULT_TOAST_POSITION;
    const duration = payload.options?.duration || defaultOptions?.duration || DEFAULT.DEFAULT_TOAST_DURATION;
    const status = payload.options?.status || defaultOptions?.status || DEFAULT.DEFAULT_TOAST_STATUS;
    const autoclose = (() => {
      if (payload.options?.shouldAutoClose !== undefined) return payload.options.shouldAutoClose;
      else if (defaultOptions?.shouldAutoClose !== undefined) return defaultOptions.shouldAutoClose;
      else return DEFAULT.DEFAULT_TOAST_AUTOCLOSE;
    })();

    let cbRef: ToastInstance["callbackRefs"] = null;

    if (autoclose) {
      cbRef = hideToastOnTimeout({
        id: toastId,
        timeout: duration,
        position,
      });
    }

    const newToast: ToastInstance = {
      ...payload,
      options: {
        ...payload.options,
        position,
        status,
        duration,
        shouldAutoClose: payload.options?.shouldAutoClose,
        shouldHideCloseButton: payload.options?.shouldHideCloseButton,
      },
      id: toastId,
      createdAt: Date.now(),
      callbackRefs: cbRef,
    };

    setToasts((prev) => ({ ...prev, [position]: [...prev[position], newToast] }));

    return toastId;
  };

  return {
    toasts,
    setToasts,
    defaultOptions,
    hideToastOnTimeout,
    updateToast,
    removeToast,
    addToast,
  };
};

export { useToastHandler };
