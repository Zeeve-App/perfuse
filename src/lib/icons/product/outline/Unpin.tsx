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
const SvgUnpin = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
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
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9.843 8.118 2.225-4.589a2 2 0 0 1 3.214-.541l5.706 5.706a2 2 0 0 1-.563 3.224l-4.758 2.239M1 2.294l7.118 7.118M21.706 23l-7.333-7.333m0 0-1.824 4.809a1 1 0 0 1-1.643.352l-3.975-3.975m7.442-1.186L8.117 9.412m0 0-4.81 1.824a1 1 0 0 0-.352 1.642l3.975 3.975m0 0-4.637 5.069"
    />
  </svg>
);
SvgUnpin.displayName = "IconUnpin";
export default SvgUnpin;
