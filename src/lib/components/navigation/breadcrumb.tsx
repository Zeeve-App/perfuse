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

"use client";
import React from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { Breadcrumb as ZeeveBreadcrumb, BreadcrumbItem } from "../Breadcrumb";

/** breadcrumb props */
interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
    onClick?: () => void;
    isActive?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: React.ElementType<any>;
  }[];
}

/** breadcrumb component */
const Breadcrumb = (props: BreadcrumbProps) => {
  const { items } = props;

  const pathname = usePathname();

  return (
    <ZeeveBreadcrumb className="flex-wrap gap-3" activeLink={pathname}>
      {items.length
        ? items.map((item) => {
            const Component = item.as ?? NextLink;
            return (
              <BreadcrumbItem
                key={item.label}
                as={Component}
                href={item.href}
                onClick={item.onClick}
                isActive={item.isActive}
              >
                {item.label}
              </BreadcrumbItem>
            );
          })
        : null}
    </ZeeveBreadcrumb>
  );
};

export type { BreadcrumbProps };
export { Breadcrumb };
