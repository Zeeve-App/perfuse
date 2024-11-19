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

import React, { PropsWithChildren } from "react";
import { Heading } from "../Heading";
import { Breadcrumb, BreadcrumbProps } from "./breadcrumb";

interface NavigationProps extends PropsWithChildren {
  heading: string | React.ReactElement;
  logo?: React.ReactElement;
  breadcrumb?: BreadcrumbProps;
}

const Navigation = ({ heading, logo, breadcrumb, children }: NavigationProps) => {
  return (
    <div className=" flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <div className="flex flex-row items-center gap-3">
        {/* It can be icon or image */}
        {logo ? (
          <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-brand-outline p-2">
            {logo}
          </div>
        ) : null}
        {/* heading with breadcrumbs */}
        <div className="flex flex-col gap-1">
          <Heading as="h4">{heading}</Heading>
          {breadcrumb ? <Breadcrumb {...breadcrumb} /> : null}
        </div>
      </div>
      {/* children element to be rendered on left side */}
      {children}
    </div>
  );
};

export { Navigation };
