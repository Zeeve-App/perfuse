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

import React, { forwardRef, useMemo } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { useTabsContext } from "./TabsContext";
import { tx } from "@/utils/shared";

const styles = cva("flex flex-row items-center p-4 font-poppins text-sm font-medium", {
  variants: {
    orientation: {
      horizontal: "w-max border-b-2 border-transparent",
      vertical: "w-full min-w-max",
    },
  },
});

interface TabProps extends React.ComponentPropsWithRef<"button">, VariantProps<typeof styles> {
  index?: number;
}

const Tab = forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  const { className, index = 0, onClick, children, ...rest } = props;

  const { orientation, activeIndex, setActiveIndex, activeTabClassName } = useTabsContext();

  const isActive = useMemo(() => activeIndex === index, [activeIndex, index]);

  return (
    <button
      onClick={(e) => {
        setActiveIndex(index);
        if (onClick) onClick(e);
      }}
      role="tab"
      className={tx(
        styles({ orientation, className }),
        {
          [activeTabClassName ?? "border-theme-secondary text-theme-secondary"]:
            isActive && orientation === "horizontal",
        },
        {
          [activeTabClassName ?? "text-theme-secondary"]: isActive && orientation === "vertical",
        },
      )}
      ref={ref}
      {...rest}
      data-active={isActive}
      data-tab-index={index}
    >
      {children}
    </button>
  );
});

Tab.displayName = "Tab";
export type { TabProps };
export { Tab };
