/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useRef } from "react";
import { RemoveProperties } from "../../core";
import { UsePinInputProps, usePinInput } from "./usePinInput";
import { tx } from "@/utils/shared";

interface PinInputFieldProps extends RemoveProperties<React.ComponentPropsWithRef<"input">, "disabled" | "required"> {
  isDisabled?: boolean;
  isRequired?: boolean;
}

interface PinInputProps extends RemoveProperties<React.ComponentPropsWithoutRef<"div">, "onChange">, UsePinInputProps {
  isDisabled?: boolean;
  isRequired?: boolean;
  isSecure?: boolean;
  placeholder?: string;
  pinInputFieldProps?: PinInputFieldProps;
}

const PinInput = forwardRef<HTMLDivElement, PinInputProps>((props, ref) => {
  const {
    length = 6,
    pin,
    onChange,
    isSecure,
    className,
    placeholder,
    isDisabled,
    isRequired,
    pinInputFieldProps,
    ...rest
  } = props;
  const { handleOnChange, handleOnFocus, handleOnKeyDown, pinItems } = usePinInput({
    length,
    pin,
    onChange,
  });

  // FIXME
  const inputRefs = useRef<HTMLInputElement[]>([]);
  useEffect(() => {
    if (inputRefs.current && inputRefs.current.length) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className={tx("flex flex-row gap-2", { "cursor-not-allowed": isDisabled }, className)} ref={ref} {...rest}>
      {pinItems.map((val, index) => {
        return (
          <PinInputField
            placeholder={placeholder ? placeholder : ""}
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el as HTMLInputElement;
            }}
            value={val}
            type={isSecure ? "password" : "text"}
            onChange={(e) => handleOnChange(e, index)}
            onKeyDown={handleOnKeyDown}
            onFocus={handleOnFocus}
            isDisabled={isDisabled}
            isRequired={isRequired}
            {...pinInputFieldProps}
          />
        );
      })}
    </div>
  );
});

const PinInputField = forwardRef<HTMLInputElement, PinInputFieldProps>((props, ref) => {
  const { className, isRequired, isDisabled, ...rest } = props;

  return (
    <input
      ref={ref}
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern="\d{1}"
      required={isRequired}
      disabled={isDisabled}
      className={tx(
        "h-14 w-14 rounded-lg border border-brand-outline bg-brand-light text-center text-base font-medium outline-none placeholder:text-brand-dark/60 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...rest}
    />
  );
});

PinInputField.displayName = "PinInputField";
export type { PinInputFieldProps, PinInputProps };
export { PinInput, PinInputField };
