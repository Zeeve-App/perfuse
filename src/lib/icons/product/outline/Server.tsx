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
const SvgServer = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
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
    <g stroke="currentColor" clipPath="url(#server_svg__clip0_283_65825)">
      <rect width={22.5} height={5.82} x={0.75} y={0.69} strokeWidth={1.5} rx={2.91} />
      <ellipse cx={3.5} cy={3.552} rx={0.5} ry={0.48} />
      <ellipse cx={6.5} cy={3.552} rx={0.5} ry={0.48} />
      <ellipse cx={9.5} cy={3.552} rx={0.5} ry={0.48} />
      <rect width={22.5} height={5.82} x={0.75} y={9.05} strokeWidth={1.5} rx={2.91} />
      <ellipse cx={3.5} cy={11.912} rx={0.5} ry={0.48} />
      <ellipse cx={6.5} cy={11.912} rx={0.5} ry={0.48} />
      <ellipse cx={9.5} cy={11.912} rx={0.5} ry={0.48} />
      <rect width={22.5} height={5.82} x={0.75} y={17.43} strokeWidth={1.5} rx={2.91} />
      <ellipse cx={3.5} cy={20.292} rx={0.5} ry={0.48} />
      <ellipse cx={6.5} cy={20.292} rx={0.5} ry={0.48} />
      <ellipse cx={9.5} cy={20.292} rx={0.5} ry={0.48} />
    </g>
  </svg>
);
SvgServer.displayName = "IconServer";
export default SvgServer;
