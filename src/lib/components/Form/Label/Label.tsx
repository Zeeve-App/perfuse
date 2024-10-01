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
import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

interface LabelProps extends React.ComponentPropsWithRef<"label"> {
  isRequired?: boolean;
  isDisabled?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { children, className, isRequired, isDisabled, ...rest } = props;

  return (
    <label
      className={tx(
        "inline-flex items-center font-poppins text-base tracking-[0.1px] text-theme-primary-content",
        { "after:text-brand-red after:content-['*']": isRequired },
        className,
        { "cursor-not-allowed opacity-50": isDisabled },
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </label>
  );
});

export type { LabelProps };
export { Label };
