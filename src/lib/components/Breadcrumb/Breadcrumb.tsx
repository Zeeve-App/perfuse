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

import React, { forwardRef, useMemo, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { BreadcrumbContextProps, BreadcrumbContext, Separator } from "./BreadcrumbContextProvider";
import { DEFAULT_SEPARATOR } from "./useBreadcrumb";
import { tx } from "@/utils/shared";

interface BreadcrumbProps extends HTMLMotionProps<"nav"> {
  separator?: Separator;
  activeLink?: string;
  activeLinkClassName?: string;
}

const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>((props, ref) => {
  const { separator = DEFAULT_SEPARATOR, activeLink = "/", className, activeLinkClassName, children, ...rest } = props;

  const [_activeLink, _setActiveLink] = useState<string>(activeLink);
  const [_separator, _setSeparator] = useState<Separator>(separator);

  const contextValues: BreadcrumbContextProps = useMemo(
    () => ({
      activeLink: _activeLink,
      separator: _separator,
      setActiveLink: _setActiveLink,
      setSeparator: _setSeparator,
      activeLinkClassName,
    }),
    [activeLink, separator, activeLinkClassName],
  );

  return (
    <BreadcrumbContext.Provider value={contextValues}>
      <motion.nav
        className={tx("flex flex-row items-center gap-2 font-poppins text-sm font-medium text-brand-dark", className)}
        aria-label="Breadcrumb"
        ref={ref}
        {...rest}
      >
        {children}
      </motion.nav>
    </BreadcrumbContext.Provider>
  );
});

Breadcrumb.displayName = "Breadcrumb";
export type { BreadcrumbProps };
export { Breadcrumb };
