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
const SvgProfile = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="15"
    viewBox="0 0 13 15"
    fill="none"
    // viewBox="0 0 24 24"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M6.27788 7.49727V7.50091C6.28434 7.50091 6.29 7.49909 6.29626 7.49909C6.30253 7.49909 6.30839 7.50091 6.31465 7.50091V7.49727C8.25223 7.47706 9.81762 5.9036 9.81762 3.96117C9.81762 2.01894 8.25203 0.445475 6.31465 0.425268V0.421631C6.30839 0.421631 6.30253 0.42345 6.29626 0.42345C6.2902 0.42345 6.28434 0.421631 6.27808 0.421631V0.425268C4.3405 0.445475 2.77512 2.01894 2.77512 3.96117C2.77512 5.9036 4.3403 7.47706 6.27788 7.49727ZM6.56582 8.02445H6.02691C2.83028 8.04102 0.234375 10.5213 0.234375 13.5699C0.234375 13.8285 0.438661 14.0378 0.691037 14.0378H11.9015C12.1539 14.0378 12.3582 13.8287 12.3582 13.5699C12.3582 10.5213 9.76225 8.04102 6.56582 8.02445ZM6.29626 0.421833C4.34151 0.421833 2.75673 2.00661 2.75673 3.96137C2.75673 5.91613 4.34151 7.50091 6.29626 7.50091C8.25102 7.50091 9.8358 5.91613 9.8358 3.96137C9.836 2.00661 8.25122 0.421833 6.29626 0.421833Z"
      fill="currentColor"
    />

    {/* <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.16 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 0 1-4.27-4.43C7.56 3.99 9.54 2 12 2a4.435 4.435 0 0 1 .16 8.87ZM7.16 14.56c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.74-1.83-7.25-1.83-10.01 0Z"
    /> */}
  </svg>
);
SvgProfile.displayName = "IconProfile";
export default SvgProfile;
