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
import { tx } from "@/utils/shared";

interface TheadProps extends ComponentPropsWithRef<"thead"> {}

const Thead = forwardRef<HTMLTableSectionElement, TheadProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <thead
      className={tx("h-[50px] rounded-e-lg rounded-s-lg bg-brand-light text-brand-dark", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </thead>
  );
});

Thead.displayName = "Thead";
export type { TheadProps };
export { Thead };
