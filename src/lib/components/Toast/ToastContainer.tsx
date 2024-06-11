import React, { useMemo, useState } from "react";
import { Portal } from "../Portal";
import { ToastContext, ToastContextProps } from "./ToastContextProvider";
import { ToastOptions, Toasts } from "./types";
import { ToastList } from "./ToastList";

interface ToastContainerProps extends React.ComponentPropsWithRef<"div"> {
  options?: ToastOptions;
}

const ToastContainer: React.FC<ToastContainerProps> = (props) => {
  const { children, options } = props;
  const [list, setList] = useState<Toasts>({
    "bottom-left": [],
    "bottom-right": [],
    "top-left": [],
    "top-right": [],
  });

  const contextValues: ToastContextProps = useMemo(
    () => ({
      toasts: list,
      setToasts: setList,
      options,
    }),
    [list, options],
  );

  return (
    <ToastContext.Provider value={contextValues}>
      {children}
      <Portal>
        <ToastList />
      </Portal>
    </ToastContext.Provider>
  );
};

ToastContainer.displayName = "ToastContainer";
export type { ToastContainerProps };
export { ToastContainer };
