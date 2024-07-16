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
import React, { forwardRef, useMemo } from "react";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { useBreadcrumb } from "./useBreadcrumb";
import { tx } from "@/utils/shared";

type BreadcrumbItemProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    isActive?: boolean;
    separator?: React.ReactElement | string;
    breadcrumbSeparatorProps?: React.ComponentPropsWithRef<"div">;
  }
>;

type BreadcrumbItemComponent = <C extends React.ElementType = "a">(props: BreadcrumbItemProps<C>) => React.ReactNode;

const BreadcrumbItem: BreadcrumbItemComponent = forwardRef(
  <C extends React.ElementType>(
    { as, href, isActive, separator, className, children, breadcrumbSeparatorProps, ...rest }: BreadcrumbItemProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const { activeLink, setActiveLink, activeLinkClassName, separator: defaultSeparator } = useBreadcrumb();

    const Component = as ?? "a";

    const _isActive = useMemo(() => isActive ?? activeLink === href, [isActive, activeLink, href]);

    React.useEffect(() => {
      if (isActive !== null && isActive !== undefined && isActive && href) {
        setActiveLink(href);
      }
    }, [isActive, href]);

    return (
      <>
        <Component
          className={tx({ [activeLinkClassName ?? "text-brand-gradient"]: _isActive }, className)}
          role="link"
          aria-current={_isActive ? "page" : "false"}
          href={href}
          ref={ref}
          {...rest}
          data-active={_isActive}
        >
          {children}
        </Component>
        <div
          {...breadcrumbSeparatorProps}
          className={tx("inline-block align-middle last:hidden", breadcrumbSeparatorProps?.className)}
        >
          {separator ?? defaultSeparator}
        </div>
      </>
    );
  },
);

export type { BreadcrumbItemProps };
export { BreadcrumbItem };
