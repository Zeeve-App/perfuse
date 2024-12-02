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

import * as React from "react";
import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBars = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    {/* <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 1.85449C0 1.30221 0.447715 0.854492 1 0.854492H19.5687C20.121 0.854492 20.5687 1.30221 20.5687 1.85449C20.5687 2.40678 20.121 2.85449 19.5687 2.85449H1C0.447715 2.85449 0 2.40678 0 1.85449ZM0 7.83105C0 7.27877 0.447715 6.83105 1 6.83105H12.8376C13.3899 6.83105 13.8376 7.27877 13.8376 7.83105C13.8376 8.38334 13.3899 8.83105 12.8376 8.83105H1C0.447716 8.83105 0 8.38334 0 7.83105ZM1 12.8074C0.447715 12.8074 0 13.2551 0 13.8074C0 14.3597 0.447715 14.8074 1 14.8074H17.0313C17.5835 14.8074 18.0313 14.3597 18.0313 13.8074C18.0313 13.2551 17.5835 12.8074 17.0313 12.8074H1Z"
      fill="url(#paint0_linear_1168_4275)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1168_4275"
        x1="3.84176"
        y1="-1.27007"
        x2="12.9159"
        y2="14.8074"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5E18F8" />
        <stop offset="1" stopColor="#D52DC7" />
      </linearGradient>
    </defs>
  </svg>
);
SvgBars.displayName = "IconBars";
export default SvgBars;
