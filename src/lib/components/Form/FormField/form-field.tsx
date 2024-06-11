"use client";
import React, { PropsWithChildren } from "react";
// import { IconInfoCircle } from "@zeeve-platform/icons/essential/outline";
import { IconButton } from "../../Button";
import { TooltipProps, Tooltip } from "../../Tooltip";
import { Status } from "../../types";
import { FormFieldStatus } from "../FormFieldStatus";
import { Label } from "../Label";
import { tx } from "@/utils/shared";

interface FormFieldProps extends PropsWithChildren {
  /** css classes for container `div` */
  className?: string;
  /** field label, if you are passing floatingLabel to input field then ignore this */
  label?: {
    /** label text */
    text: string;
    /** show required asterisk */
    isRequired?: boolean;
    /** label css classes */
    className?: string;
    /** tooltip shown after label text */
    tooltip?: {
      /** tooltip text */
      text: string;
      /** tooltip placement */
      placement?: TooltipProps["placement"];
      /** tooltip css classes */
      className?: string;
      /** tooltip text css classes */
      textClassName?: string;
    };
  };
  /** field helper */
  helper?: {
    /** helper text status */
    status: Status;
    /** helper text */
    text?: string;
    /** helper text css classes */
    className?: string;
  };
}

const FormField = (props: FormFieldProps) => {
  const { children, className, label, helper } = props;

  return (
    // container
    <div className={tx("flex flex-col gap-1", className)}>
      {/* label with tooltip */}
      {label?.text ? (
        <Label isRequired={label.isRequired} className={tx("flex flex-row items-center gap-1", label.className)}>
          {label.text}
          {label?.tooltip?.text ? (
            <Tooltip
              text={label.tooltip.text}
              placement={label.tooltip.placement}
              className={label.tooltip.className}
              textClassName={label.tooltip.textClassName}
            >
              <IconButton variant="text" colorScheme="gray">
                {/* <IconInfoCircle className="text-base" /> */}
              </IconButton>
            </Tooltip>
          ) : null}
        </Label>
      ) : null}
      {/* input and helper text */}
      <div className="flex flex-col gap-1">
        {children}
        {helper?.text ? (
          <FormFieldStatus className={tx("text-xs lg:text-sm", helper.className)} status={helper.status}>
            {helper.text}
          </FormFieldStatus>
        ) : null}
      </div>
    </div>
  );
};

export type { FormFieldProps };
export { FormField };
