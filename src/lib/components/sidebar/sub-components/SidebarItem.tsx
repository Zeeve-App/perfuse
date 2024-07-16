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
import React from "react";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../../core";
import { tx } from "@/utils/shared";

type SidebarItemProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    title: string;
    isActive: boolean;
    iconLeft?: React.ReactElement;
    badge?: React.ReactElement;
    isChild?: boolean;
  }
>;

type SidebarItemComponent = <C extends React.ElementType = "a">(props: SidebarItemProps<C>) => React.ReactNode;

const SidebarItem: SidebarItemComponent = React.forwardRef(
  <C extends React.ElementType>(
    { as, title, isActive, iconLeft, badge, isChild, className, ...rest }: SidebarItemProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || "a";

    return (
      <Component
        className={tx(
          "group relative flex max-h-14 cursor-pointer items-center justify-start gap-3 px-6 py-4 text-brand-gray transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-brand-cyan/10 hover:to-brand-teal/5",
          {
            "px-10": isChild,
            "bg-gradient-to-r from-brand-cyan/10 to-brand-teal/5": isActive,
            "text-brand-blue ": isActive,
          },
          className,
        )}
        ref={ref}
        {...rest}
      >
        {iconLeft ? iconLeft : null}
        <span className="flex flex-col gap-y-1 text-base font-normal leading-4 ">
          {title}
          {badge ? badge : null}
        </span>
        <div
          className={`absolute right-0 w-[4px] rounded-l-full bg-brand-blue py-4 group-hover:block ${
            isActive ? "block" : "hidden"
          }`}
        />
      </Component>
    );
  },
);

export type { SidebarItemProps };
export { SidebarItem };
