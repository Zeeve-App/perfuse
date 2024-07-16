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
