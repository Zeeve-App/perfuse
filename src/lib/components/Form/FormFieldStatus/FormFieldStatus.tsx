/* eslint-disable react/display-name */
// import {
//   IconCheckCircle,
//   IconExclamationCircle,
//   IconExclamationTriangle,
//   IconInfoCircle,
// } from "@zeeve-platform/icons/essential/outline";
import React, { forwardRef, useMemo } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { Status } from "../../types";
import { tx } from "@/utils/shared";

const styles = cva("inline-flex items-center gap-x-1 text-sm", {
  variants: {
    status: {
      neutral: "text-brand-gray",
      info: "text-brand-blue",
      warning: "text-brand-yellow",
      success: "text-brand-green",
      error: "text-brand-red",
    },
  },
});

interface FormFieldStatusProps extends React.ComponentPropsWithRef<"p">, VariantProps<typeof styles> {
  status: Status;
}

const FormFieldStatus = forwardRef<HTMLParagraphElement, FormFieldStatusProps>((props, ref) => {
  const { children, className, status, ...rest } = props;

  const icon = useMemo(() => {
    switch (status) {
      //   case "info":
      //     return <IconInfoCircle />;
      //   case "warning":
      //     return <IconExclamationTriangle />;
      //   case "success":
      //     return <IconCheckCircle />;
      //   case "error":
      //     return <IconExclamationCircle />;
      default: {
        return null;
      }
    }
  }, [status]);

  return (
    <p className={tx(styles({ status, className }))} ref={ref} {...rest}>
      {icon}
      {children}
    </p>
  );
});

export type { FormFieldStatusProps };
export { FormFieldStatus };
