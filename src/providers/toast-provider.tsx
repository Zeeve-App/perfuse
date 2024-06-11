"use client";

import { ToastContainer } from "@/lib/components/Toast";

interface ToastProviderProps extends React.PropsWithChildren {}

/**
 * Setup toast notifications for the application.
 */
const ToastProvider = (props: ToastProviderProps) => {
  const { children } = props;

  return (
    <ToastContainer
      options={{
        position: "top-right",
      }}
    >
      {children}
    </ToastContainer>
  );
};

export default ToastProvider;
