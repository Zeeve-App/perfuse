import { useCallback, useContext } from "react";
import { useToastHandler } from "./useToastHandler";
import { ToastInstance } from "./types";
import { ToastContext } from "./ToastContextProvider";

const useToast = () => {
  const context = useContext(ToastContext);

  if (context === null) throw new Error("useToast can only be used within the <ToastContainer />.");

  const { addToast } = useToastHandler();

  const toast = useCallback((title: ToastInstance["title"], options?: ToastInstance["options"]) => {
    return addToast({
      title,
      options,
    });
  }, []);

  return toast;
};

export { useToast };
