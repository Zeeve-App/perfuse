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

import React, { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLMotionProps, motion } from "framer-motion";
import { RemoveProperties } from "../../core";
import { tx } from "@/utils/shared";

const styles = cva(
  "w-full appearance-none rounded-lg border border-brand-outline bg-brand-light p-4 text-sm font-medium leading-5 text-brand-dark invalid:text-brand-dark/60 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-brand-dark/60 disabled:opacity-50",
  {
    variants: {
      size: {
        small: "h-[50px] text-sm placeholder:text-sm",
        medium: "h-[60px] text-base placeholder:text-base",
        large: "h-[70px] text-xl placeholder:text-xl",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

interface SelectProps
  extends RemoveProperties<HTMLMotionProps<"select">, "size" | "disabled" | "required">,
    VariantProps<typeof styles> {
  isDisabled?: boolean;
  isRequired?: boolean;
}

/**
 * @deprecated Please use `<ReactSelect />` from `@zeeve-platform/ui-common-components` having multiselect, autocomplete, async and creatable support.
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { className, children, size, isDisabled, isRequired = true, ...rest } = props;

  return (
    <motion.select
      required={isRequired}
      className={tx(styles({ size, className }))}
      disabled={isDisabled}
      ref={ref}
      {...rest}
    >
      {children}
    </motion.select>
  );
});

Select.displayName = "Select";
export type { SelectProps };
export { Select };
