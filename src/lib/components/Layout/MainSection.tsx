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

// import { tx } from "@zeeve-platform/ui";
import React from "react";
import { tx } from "@/utils/shared";

/** layout section props */
interface LayoutMainSectionProps extends React.ComponentPropsWithRef<"main"> {}

/** layout main section */
const LayoutMainSection = (props: LayoutMainSectionProps) => {
  const { children, className, ...rest } = props;

  return (
    <main
      className={tx("max-h-full flex-1 overflow-hidden overflow-y-auto bg-theme-background p-3 lg:p-6", className)}
      {...rest}
    >
      {children}
    </main>
  );
};

export { LayoutMainSection };
