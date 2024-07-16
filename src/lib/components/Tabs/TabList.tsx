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

import React, { Children, cloneElement, forwardRef } from "react";
import { cva } from "class-variance-authority";
import { useTabsContext } from "./TabsContext";
import { tx } from "@/utils/shared";

const styles = cva("flex text-brand-dark", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center justify-start border-b border-brand-outline",
      vertical: "flex-col items-start justify-start divide-y divide-brand-outline border-r border-brand-outline",
    },
  },
});

interface TabListProps extends React.ComponentPropsWithRef<"div"> {
  children: React.ReactElement | React.ReactElement[];
}

const TabList = forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const { orientation } = useTabsContext();

  return (
    <div
      className={tx(styles({ orientation, className }))}
      role="tablist"
      aria-orientation={orientation}
      ref={ref}
      {...rest}
    >
      {Children.map(children, (child, index) => {
        return cloneElement(child, {
          index: index,
        });
      })}
    </div>
  );
});

TabList.displayName = "TabList";
export type { TabListProps };
export { TabList };
