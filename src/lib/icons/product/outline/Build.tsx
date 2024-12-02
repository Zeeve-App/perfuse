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
const SvgBuild = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
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
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.588 20.65c.51-.088 1.016-.2 1.352-.52a2.763 2.763 0 0 1-.789 1.598c-.252.253-.701.468-1.27.642a12.26 12.26 0 0 1-1.82.38A22.743 22.743 0 0 1 1 22.943a22.767 22.767 0 0 1 .191-2.062 12.3 12.3 0 0 1 .38-1.822c.174-.568.389-1.017.641-1.27.43-.43.987-.706 1.587-.788a1.166 1.166 0 0 0-.142.224c-.05.099-.147.339-.147.339s-.179.535-.223.782c-.243 1.37.953 2.535 2.301 2.306Z"
    />
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m22.888 1.123-.001-.005-.002-.002-.002-.001c-.69-.17-1.628-.15-2.72.045-1.089.193-2.312.556-3.562 1.056-2.502 1.002-5.09 2.548-6.9 4.36a15.672 15.672 0 0 0-1.76 2.081l-.079.11-.134-.011c-1.112-.099-2.202-.014-3.12.386-1.298.572-2.145 1.608-2.696 2.68-.551 1.072-.8 2.166-.908 2.827v.002a.25.25 0 0 0 .273.29l4.378-.484.257-.028.003.259c.003.322.022.644.058.965v.003a.749.749 0 0 0 .219.46l1.695 1.693h.001a.748.748 0 0 0 .459.219h.003c.318.036.638.055.959.058l.258.003-.028.257-.48 4.377a.25.25 0 0 0 .29.274h.001c.66-.107 1.753-.354 2.825-.905 1.07-.551 2.104-1.398 2.673-2.698.4-.919.487-2.005.391-3.112l-.011-.134.11-.078a15.697 15.697 0 0 0 2.086-1.763c1.817-1.81 3.36-4.36 4.36-6.843.5-1.241.861-2.46 1.055-3.555.194-1.098.216-2.057.049-2.786Z"
    />
  </svg>
);
SvgBuild.displayName = "IconBuild";
export default SvgBuild;
