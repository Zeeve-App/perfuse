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
const SvgLaunch = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
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
    <g clipPath="url(#launch_svg__clip0_2360_121049)">
      <path
        stroke="currentColor"
        strokeWidth={1.5}
        d="M8.5 8.019h.117l.07-.093C12.045 3.533 17.028 1 20.702 1h2.3v2.3c0 3.673-2.532 8.657-6.926 12.013l-.092.071v2.927c0 1.886-1.4 2.992-2.988 3.786L11.189 23v-4.786l-.069-.069-2.632-2.632-2.632-2.632-.069-.069H1l.905-1.805C2.7 9.417 3.805 8.02 5.69 8.02H8.5ZM2.627 21.513c-.056.01-.108.02-.155.027l.036-.178c.064-.307.163-.73.301-1.191.28-.936.705-1.982 1.293-2.57l.711-.71 2.3 2.298-.712.711c-.66.66-1.707 1.085-2.619 1.345-.451.129-.86.215-1.155.268Zm15-15.137a1.99 1.99 0 1 0-2.816 2.815 1.99 1.99 0 0 0 2.815-2.815Z"
      />
    </g>
  </svg>
);
SvgLaunch.displayName = "IconLaunch";
export default SvgLaunch;
