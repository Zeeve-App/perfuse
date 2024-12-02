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
const SvgArrowUpFromBucket = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
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
    {/* <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
    <g clip-path="url(#clip0_1168_17538)">
      <path
        d="M16.1445 16.9595L12.1445 12.9595L8.14453 16.9595"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.535 19.3495C21.5103 18.8177 22.2808 17.9763 22.7249 16.9581C23.1689 15.9398 23.2612 14.8027 22.9872 13.7261C22.7132 12.6496 22.0885 11.695 21.2116 11.0129C20.3348 10.3308 19.2558 9.96019 18.145 9.95946H16.885C16.5823 8.7887 16.0181 7.70179 15.2349 6.78045C14.4517 5.85911 13.4698 5.12731 12.3631 4.64006C11.2563 4.15282 10.0535 3.92282 8.8451 3.96734C7.63666 4.01186 6.45405 4.32976 5.38616 4.89712C4.31827 5.46449 3.39289 6.26656 2.6796 7.24304C1.96631 8.21952 1.48367 9.34499 1.26796 10.5349C1.05225 11.7247 1.10908 12.948 1.43419 14.1127C1.7593 15.2774 2.34422 16.3533 3.14498 17.2595"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1445 11.9595C12.6968 11.9595 13.1445 12.4072 13.1445 12.9595V21.9595C13.1445 22.5118 12.6968 22.9595 12.1445 22.9595C11.5922 22.9595 11.1445 22.5118 11.1445 21.9595V12.9595C11.1445 12.4072 11.5922 11.9595 12.1445 11.9595Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4374 12.2524C11.8279 11.8618 12.4611 11.8618 12.8516 12.2524L16.8516 16.2524C17.2422 16.6429 17.2422 17.2761 16.8516 17.6666C16.4611 18.0571 15.8279 18.0571 15.4374 17.6666L12.1445 14.3737L8.85164 17.6666C8.46111 18.0571 7.82795 18.0571 7.43742 17.6666C7.0469 17.2761 7.0469 16.6429 7.43742 16.2524L11.4374 12.2524Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_1168_17538">
        <rect width="24" height="24" fill="white" transform="translate(0.144531 0.959473)" />
      </clipPath>
    </defs>
  </svg>
);
SvgArrowUpFromBucket.displayName = "IconArrowUpFromBucket";
export default SvgArrowUpFromBucket;
