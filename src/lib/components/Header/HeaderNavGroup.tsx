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
import { tx } from "@/utils/shared";

/** header nav group props */
interface HeaderNavGroupProps extends React.ComponentPropsWithRef<"div"> {}

/** header nav group component */
const HeaderNavGroup = forwardRef<HTMLDivElement, HeaderNavGroupProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div
      className={tx("flex h-full items-center gap-x-2 px-2 md:gap-x-4 md:px-4 lg:px-8", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

HeaderNavGroup.displayName = "HeaderNavGroup";
export type { HeaderNavGroupProps };
export { HeaderNavGroup };
