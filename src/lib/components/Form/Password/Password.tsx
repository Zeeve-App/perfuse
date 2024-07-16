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
