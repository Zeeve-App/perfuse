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
const SvgEndpoints1 = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
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
      fill="currentColor"
      fillRule="evenodd"
      d="M6.923 6C6.413 6 6 6.448 6 7s.413 1 .923 1h3.692c.51 0 .924.448.924 1v6c0 .552-.414 1-.924 1H6.923c-.51 0-.923.448-.923 1s.413 1 .923 1h3.692c1.53 0 2.77-1.343 2.77-3v-2h3.692c.51 0 .923-.448.923-1s-.413-1-.923-1h-3.692V9c0-1.657-1.24-3-2.77-3H6.923Z"
      clipRule="evenodd"
    />
    <path
      stroke="currentColor"
      strokeWidth={2}
      d="M7 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
  </svg>
);
SvgEndpoints1.displayName = "IconEndpoints1";
export default SvgEndpoints1;
