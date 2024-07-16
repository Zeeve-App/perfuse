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
const SvgCopy = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
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
      d="M12.75 10.05V12.3C12.75 15.3 11.55 16.5 8.55 16.5H5.7C2.7 16.5 1.5 15.3 1.5 12.3V9.45C1.5 6.45 2.7 5.25 5.7 5.25H7.95"
      stroke="#868686"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.75 10.05H10.35C8.54995 10.05 7.94995 9.45 7.94995 7.65V5.25L12.75 10.05Z"
      stroke="#868686"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8.69995 1.5H11.7" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M5.25 3.75C5.25 2.505 6.255 1.5 7.5 1.5H9.465"
      stroke="#868686"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5001 6V10.6425C16.5001 11.805 15.5551 12.75 14.3926 12.75"
      stroke="#868686"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 6H14.25C12.5625 6 12 5.4375 12 3.75V1.5L16.5 6Z"
      stroke="#868686"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
SvgCopy.displayName = "IconCopy";
export default SvgCopy;
