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

import React from "react";
import { tx } from "@/utils/shared";

interface LayoutProps extends React.ComponentPropsWithRef<"div"> {}

const Layout = (props: LayoutProps) => {
  const { className, children, ...rest } = props;

  return (
    <div className={tx("flex h-screen overflow-y-hidden", className)} {...rest}>
      {children}
    </div>
  );
};

export { Layout };
