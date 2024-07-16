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

import React, { ComponentPropsWithRef, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
// import { IconInfoCircle } from "@zeeve-platform/icons/essential/outline";
import { Label } from "../Label";
import { IconButton } from "../../Button";
import { Tooltip } from "../../Tooltip";
import { RemoveProperties } from "../../core";
import { useID } from "@/hooks";
import { tx } from "@/utils/shared";

const styles = cva(
  "peer w-full appearance-none rounded-lg border border-brand-outline bg-brand-light p-4 text-sm font-medium leading-5 text-brand-dark placeholder:truncate placeholder:text-brand-dark/60 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        medium: "min-h-[60px] text-base placeholder:text-base",
      },
      iconLeft: {
        true: "pl-12",
      },
      iconRight: {
        true: "pr-12",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

type FloatingLabel = {
  labelText: string;
  floatingLabelProps?: ComponentPropsWithRef<"label">;
};

interface TextAreaProps
  extends RemoveProperties<ComponentPropsWithRef<"textarea">, "disabled" | "required">,
    RemoveProperties<VariantProps<typeof styles>, "iconRight" | "iconLeft"> {
  textareaContainerProps?: React.ComponentPropsWithRef<"div">;
  iconLeft?: React.ReactElement;
  iconLeftContainerProps?: React.ComponentPropsWithRef<"div">;
  iconRight?: React.ReactElement;
  iconRightContainerProps?: React.ComponentPropsWithRef<"div">;
  floatingLabel?: FloatingLabel;
  isDisabled?: boolean;
  isRequired?: boolean;
  tooltip?: string | React.ReactElement;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const {
    className,
    iconLeft,
    iconRight,
    textareaContainerProps,
    iconLeftContainerProps,
    iconRightContainerProps,
    placeholder,
    floatingLabel,
    isDisabled,
    isRequired,
    id,
    size,
    tooltip,
    ...rest
  } = props;

  const [_id] = useID(id, "textarea");

  return (
    // text area container
    <div
      {...textareaContainerProps}
      className={tx(
        "relative flex h-max w-full",
        { "cursor-not-allowed": isDisabled },
        textareaContainerProps?.className,
      )}
    >
      {/* left icon */}
      {iconLeft && (
        <div
          {...iconLeftContainerProps}
          className={tx(
            "absolute inset-y-0 left-0 flex items-start pt-5",
            { "cursor-not-allowed opacity-50": isDisabled },
            iconLeftContainerProps?.className,
          )}
        >
          {iconLeft}
        </div>
      )}

      {/* textarea */}
      <textarea
        id={_id}
        className={tx(
          styles({
            size,
            iconLeft: iconLeft ? true : false,
            iconRight: iconRight ? true : false,
            className,
          }),
        )}
        required={isRequired}
        disabled={isDisabled}
        placeholder={floatingLabel === undefined ? placeholder : " "}
        ref={ref}
        rows={1}
        {...rest}
      />

      {/* label */}
      {floatingLabel && (
        <Label
          htmlFor={_id}
          {...floatingLabel.floatingLabelProps}
          isDisabled={isDisabled}
          isRequired={isRequired}
          className={tx(
            "absolute left-4 right-4 top-4 origin-[0] -translate-y-4 scale-75 transform cursor-text gap-1 font-sans text-sm font-medium text-brand-dark/60 transition-all duration-300 peer-placeholder-shown:top-[30px] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-focus:left-4 peer-focus:top-4 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-sm",
            { "peer-placeholder-shown:left-12": iconLeft },
            { "right-12": iconRight },
            floatingLabel.floatingLabelProps?.className,
          )}
        >
          <span className="line-clamp-1">{floatingLabel.labelText}</span>
          {/* tooltip */}
          {typeof tooltip === "string" && tooltip ? (
            <Tooltip text={tooltip} placement="bottom-start">
              <IconButton variant="text" colorScheme="gray" isDisabled={isDisabled}>
                {/* <IconInfoCircle className="text-sm" /> */}
              </IconButton>
            </Tooltip>
          ) : (
            tooltip
          )}
        </Label>
      )}

      {/* right icon */}
      {iconRight && (
        <div
          {...iconRightContainerProps}
          className={tx(
            "absolute inset-y-0 right-0 flex items-start rounded-br-3xl pt-5",
            { "cursor-not-allowed opacity-50": isDisabled },
            iconRightContainerProps?.className,
          )}
        >
          {iconRight}
        </div>
      )}
    </div>
  );
});

TextArea.displayName = "TextArea";
export type { TextAreaProps };
export { TextArea };
