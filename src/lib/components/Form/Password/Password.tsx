// import { IconEye, IconEyeSlash } from "@zeeve-platform/icons/security/outline";
import React, { forwardRef, useState } from "react";
import { Input, InputProps } from "../Input";
import { IconButton } from "../../Button";
import { RemoveProperties } from "../../core";

interface PasswordProps extends RemoveProperties<InputProps, "type"> {
  shouldToggleMask: boolean;
}

const Password = forwardRef<HTMLInputElement, PasswordProps>((props, ref) => {
  const { shouldToggleMask, isDisabled, ...rest } = props;
  const [passwordType, setPasswordType] = useState<"text" | "password">("password");

  const togglePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <Input
      type={passwordType}
      isDisabled={isDisabled}
      iconRight={
        shouldToggleMask ? (
          <IconButton
            colorScheme="dark"
            className="mx-4 border-0 hover:border-0 hover:ring-0 focus:border-0 focus:ring-zinc-200 disabled:opacity-100"
            type="button"
            variant="text"
            isDisabled={isDisabled}
            onClick={togglePasswordType}
          >
            {/* {passwordType === "password" ? <IconEye className="text-xl" /> : <IconEyeSlash className="text-xl" />} */}
          </IconButton>
        ) : undefined
      }
      ref={ref}
      {...rest}
    />
  );
});

Password.displayName = "Password";
export type { PasswordProps };
export { Password };
