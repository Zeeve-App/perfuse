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

interface HeaderLogoProps {
  logoImgSrc: string;
  logoImgAlt: string;
  logoHref: string;
  className?: string;
  logoImgClassName?: string;
}

const HeaderLogo: React.FC<HeaderLogoProps> = (props) => {
  const { logoImgSrc, logoImgAlt, logoHref, className, logoImgClassName } = props;

  return (
    <a className={tx("flex shrink-0 flex-row items-center gap-x-2", className)} href={logoHref}>
      <img src={logoImgSrc} alt={logoImgAlt} className={tx("h-14 w-14", logoImgClassName)} />
    </a>
  );
};

HeaderLogo.displayName = "HeaderLogo";
export type { HeaderLogoProps };
export { HeaderLogo };
