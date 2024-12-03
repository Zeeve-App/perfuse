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
const SvgCheck = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 17 17"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M3.49827 8.32388L3.49808 8.32369C3.40432 8.22992 3.27714 8.17725 3.14453 8.17725C3.01192 8.17725 2.88475 8.22992 2.79098 8.32369C2.69721 8.41746 2.64453 8.54464 2.64453 8.67725C2.64453 8.68526 2.64472 8.69326 2.64511 8.70126C2.65108 8.82542 2.70308 8.9429 2.79098 9.0308L2.79117 9.03099L6.29098 12.5308C6.48624 12.7261 6.80282 12.7261 6.99808 12.5308L13.9981 5.5308C14.0919 5.43703 14.1445 5.30985 14.1445 5.17725C14.1445 5.04464 14.0919 4.91746 13.9981 4.82369C13.9043 4.72992 13.7771 4.67725 13.6445 4.67725C13.5119 4.67725 13.3847 4.72992 13.291 4.82369L6.64453 11.4701L3.49827 8.32388Z"
      fill="currentColor"
    />
  </svg>
);
SvgCheck.displayName = "IconCheck";
export default SvgCheck;
