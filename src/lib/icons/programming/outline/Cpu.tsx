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
const SvgCpu = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 19 19"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    {/* <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
    <g clipPath="url(#clip0_983_12398)">
      <mask
        id="mask0_983_12398"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="19"
        height="19"
      >
        <path d="M0.5 0.229738H18.5V18.2297H0.5V0.229738Z" fill="white" />
      </mask>
      <g mask="url(#mask0_983_12398)">
        <path
          d="M14.7734 15.5579H4.22656C3.64409 15.5579 3.17188 15.0856 3.17188 14.5032V3.9563C3.17188 3.37383 3.64409 2.90161 4.22656 2.90161H14.7734C15.3559 2.90161 15.8281 3.37383 15.8281 3.9563V14.5032C15.8281 15.0856 15.3559 15.5579 14.7734 15.5579Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.8401 9.22974C12.8401 8.99974 12.8167 8.77524 12.7725 8.55836L13.6811 8.03376L12.6264 6.20697L11.714 6.73375C11.3802 6.43745 10.9879 6.20676 10.5549 6.06258V5.01099H8.44553V6.06258C8.01252 6.20676 7.62024 6.43745 7.2864 6.73375L6.37402 6.20697L5.31934 8.03376L6.22798 8.55836C6.18372 8.77524 6.16038 8.99974 6.16038 9.22974C6.16038 9.45973 6.18372 9.68424 6.22798 9.90112L5.31934 10.4257L6.37402 12.2525L7.2864 11.7257C7.62024 12.022 8.01252 12.2527 8.44553 12.3969V13.4485H10.5549V12.3969C10.9879 12.2527 11.3802 12.022 11.714 11.7257L12.6264 12.2525L13.6811 10.4257L12.7725 9.90112C12.8167 9.68424 12.8401 9.45973 12.8401 9.22974Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.9062 9.22974C10.9062 10.0064 10.2766 10.636 9.5 10.636C8.72336 10.636 8.09375 10.0064 8.09375 9.22974C8.09375 8.4531 8.72336 7.82349 9.5 7.82349C10.2766 7.82349 10.9062 8.4531 10.9062 9.22974Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.7734 2.90161V0.75708"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.1367 2.90161V0.75708"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 2.90161V0.75708"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.86328 2.90161V0.75708"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.22656 2.90161V0.75708"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.7734 17.7024V15.5579"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.1367 17.7024V15.5579"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 17.7024V15.5579"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.86328 17.7024V15.5579"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.22656 17.7024V15.5579"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.17187 3.9563H1.02734"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.17187 6.59302H1.02734"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.17187 9.22974H1.02734"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.17187 11.8665H1.02734"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.17187 14.5032H1.02734"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.9727 3.9563H15.8281"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.9727 6.59302H15.8281"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.9727 9.22974H15.8281"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.9727 11.8665H15.8281"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.9727 14.5032H15.8281"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.4219 4.83521C14.4219 5.12644 14.1858 5.36255 13.8945 5.36255C13.6033 5.36255 13.3672 5.12644 13.3672 4.83521C13.3672 4.54397 13.6033 4.30786 13.8945 4.30786C14.1858 4.30786 14.4219 4.54397 14.4219 4.83521Z"
          fill="currentColor"
        />
        <path
          d="M4.57812 4.83521C4.57812 5.12644 4.81423 5.36255 5.10547 5.36255C5.3967 5.36255 5.63281 5.12644 5.63281 4.83521C5.63281 4.54397 5.3967 4.30786 5.10547 4.30786C4.81423 4.30786 4.57812 4.54397 4.57812 4.83521Z"
          fill="currentColor"
        />
        <path
          d="M14.4219 13.6243C14.4219 13.333 14.1858 13.0969 13.8945 13.0969C13.6033 13.0969 13.3672 13.333 13.3672 13.6243C13.3672 13.9155 13.6033 14.1516 13.8945 14.1516C14.1858 14.1516 14.4219 13.9155 14.4219 13.6243Z"
          fill="currentColor"
        />
        <path
          d="M4.57812 13.6243C4.57812 13.333 4.81423 13.0969 5.10547 13.0969C5.3967 13.0969 5.63281 13.333 5.63281 13.6243C5.63281 13.9155 5.3967 14.1516 5.10547 14.1516C4.81423 14.1516 4.57812 13.9155 4.57812 13.6243Z"
          fill="currentColor"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_983_12398">
        <rect width="18" height="18" fill="white" transform="translate(0.5 0.229736)" />
      </clipPath>
    </defs>
  </svg>
);
SvgCpu.displayName = "IconCpu";
export default SvgCpu;
