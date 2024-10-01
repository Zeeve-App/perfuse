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
const SvgMoon = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
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
    {/* <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
    <path
      d="M10.4952 19.1551C12.9314 19.1551 15.3676 18.2349 17.2275 16.3947C19.0522 14.588 20.0609 12.1805 20.0674 9.61562C20.0739 7.05178 19.0784 4.64177 17.2652 2.8284C16.0594 1.62258 14.5556 0.75975 12.9176 0.334142C12.5566 0.239184 12.1939 0.368524 11.9704 0.668966C11.7437 0.976777 11.7265 1.38608 11.9279 1.71353C13.5749 4.39032 13.1714 7.81546 10.9447 10.0421C8.71976 12.2679 5.29461 12.6724 2.61614 11.0253C2.28788 10.8239 1.87776 10.8411 1.57158 11.0687C1.27197 11.2905 1.14344 11.6532 1.23758 12.0141C1.66325 13.653 2.52607 15.1568 3.73183 16.3626C5.59255 18.2234 8.04349 19.1551 10.4952 19.1551ZM12.6858 1.02927C12.7014 1.02927 12.7177 1.03173 12.7357 1.03582C14.2494 1.42876 15.6386 2.2261 16.7535 3.34021C18.4293 5.01592 19.3486 7.24338 19.3427 9.61253C19.337 11.9831 18.4046 14.2083 16.7183 15.8781C13.2703 19.2918 7.67346 19.2771 4.24496 15.8487C3.13082 14.7337 2.33348 13.3446 1.94057 11.8309C1.91683 11.7392 1.96185 11.6819 2.0036 11.6508C2.02979 11.6311 2.12557 11.5746 2.23773 11.6426C5.20036 13.4673 8.99204 13.0203 11.4578 10.5546C13.9227 8.08972 14.3703 4.2972 12.5457 1.33289C12.477 1.22074 12.5343 1.1266 12.5539 1.1004C12.5793 1.06602 12.6219 1.02927 12.6858 1.02927Z"
      fill="#696969"
      stroke="currentColor"
      stroke-width="0.6"
    />
  </svg>
);
SvgMoon.displayName = "IconMoon";
export default SvgMoon;
