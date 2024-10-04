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
const SvgCreateConfig = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}

    <circle cx="16.9775" cy="16.2635" r="15.5" fill="white" stroke="#D9D9D9" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.2916 10.9294H25.8462C26.1223 10.9294 26.3462 11.1533 26.3462 11.4294C26.3462 11.7056 26.1223 11.9294 25.8462 11.9294H14.2916C14.0805 12.5865 13.4643 13.062 12.7371 13.062C12.0098 13.062 11.3936 12.5865 11.1825 11.9294H8.10938C7.83323 11.9294 7.60938 11.7056 7.60938 11.4294C7.60938 11.1533 7.83323 10.9294 8.10938 10.9294H11.1825C11.3936 10.2724 12.0098 9.79688 12.7371 9.79688C13.4643 9.79688 14.0805 10.2724 14.2916 10.9294ZM8.10938 15.6702C7.83323 15.6702 7.60938 15.894 7.60938 16.1702C7.60938 16.4463 7.83323 16.6702 8.10938 16.6702H20.7489C20.9601 17.3272 21.5762 17.8027 22.3035 17.8027C23.0307 17.8027 23.6469 17.3272 23.858 16.6702H25.8462C26.1223 16.6702 26.3462 16.4463 26.3462 16.1702C26.3462 15.894 26.1223 15.6702 25.8462 15.6702H23.858C23.6469 15.0131 23.0307 14.5376 22.3035 14.5376C21.5762 14.5376 20.9601 15.0131 20.7489 15.6702H8.10938ZM7.60938 20.9109C7.60938 20.6347 7.83323 20.4109 8.10938 20.4109H11.1824C11.3936 19.7538 12.0098 19.2782 12.7371 19.2782C13.4643 19.2782 14.0806 19.7538 14.2917 20.4109H25.8462C26.1223 20.4109 26.3462 20.6347 26.3462 20.9109C26.3462 21.187 26.1223 21.4109 25.8462 21.4109H14.2916C14.0804 22.0679 13.4643 22.5433 12.7371 22.5433C12.0099 22.5433 11.3937 22.0679 11.1825 21.4109H8.10938C7.83323 21.4109 7.60938 21.187 7.60938 20.9109Z"
      fill="black"
    />
  </svg>
);
SvgCreateConfig.displayName = "IconCreateConfig";
export default SvgCreateConfig;
