/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import { RemoveProperties } from "../core";
import { Radio } from "../Form";
import { tx } from "@/utils/shared";
import SvgApiConnect from "@/lib/icons/product/outline/ApiConnect";

interface RadioCardProps
  extends RemoveProperties<
    React.ComponentPropsWithRef<"input">,
    "disabled" | "type" | "checked" | "size" | "required"
  > {
  isDisabled?: boolean;
  isRequired?: boolean;
  isChecked?: boolean;
  colorScheme?:
    | "blue"
    | "dark"
    | "red"
    | "green"
    | "yellow"
    | "gray"
    | "teal"
    | "cyan"
    | "light"
    | "purple"
    | "pink"
    | "gradient"
    | null;
  size?: "small" | "medium" | "large";
  hideRadioCircle?: boolean;
}

const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>((props, ref) => {
  const { children, className, colorScheme, size, isRequired, isDisabled, isChecked, hideRadioCircle, ...rest } = props;

  return (
    <Radio
      radioLabelProps={{
        className: tx(
          "flex shrink h-[60px] w-full select-none  items-center justify-between rounded-lg border border-brand-outline  px-4 py-2 focus-within:border-brand-teal hover:border-brand-teal transition ease-in-out duration-200",
          className,
          { "bg-brand-gradient-10 border-brand-teal": isChecked },
          { "border-brand-outline hover:border-brand-outline": isDisabled },
        ),
      }}
      isChecked={isChecked}
      isDisabled={isDisabled}
      isRequired={isRequired}
      colorScheme={colorScheme}
      size={size}
      hideRadioCircle={hideRadioCircle}
      ref={ref}
      {...rest}
    >
      <span
        className={tx({
          "inline-flex after:pl-1 after:text-brand-red after:content-['*']": isRequired,
          "flex items-center justify-center w-full gap-2": true,
        })}
      >
        {children}
      </span>
    </Radio>
  );
});

export type { RadioCardProps };
export { RadioCard };
