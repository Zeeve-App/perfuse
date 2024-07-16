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

interface TableProps extends ComponentPropsWithRef<"table"> {}

const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <table
      className={tx(
        "w-full table-auto border-separate rounded-lg border border-brand-outline text-left text-sm text-gray-500",
        className,
      )}
      ref={ref}
      role="table"
      {...rest}
    >
      {children}
    </table>
  );
});

Table.displayName = "Table";
export type { TableProps };
export { Table };
