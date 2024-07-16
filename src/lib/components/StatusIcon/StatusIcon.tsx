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

import React, { forwardRef, SVGProps } from "react";
// import {
//     IconXMarkSquare,
//     IconInfoSquare,
//     IconCheckSquare,
//     IconExclamationSquare,
// } from "@zeeve-platform/icons/essential/outline";
// import { tx } from "../../utilities/shared";
import { tx } from "@/utils/shared";
import SvgInfoCircle from "@/lib/icons/essential/outline/InfoCircle";
import SvgExclamationTriangle from "@/lib/icons/essential/outline/ExclamationTriangle";
import SvgCheckCircle from "@/lib/icons/essential/outline/CheckCircle";
import SvgXMarkSquare from "@/lib/icons/essential/outline/XMarkSquare";

interface SVGRProps {
  title?: string;
  titleId?: string;
}

interface StatusIconProps extends SVGProps<SVGSVGElement>, SVGRProps {
  status: "info" | "warning" | "success" | "error" | "neutral";
}

const StatusIcon = forwardRef<SVGSVGElement, StatusIconProps>((props: StatusIconProps, ref) => {
  const { status, className, ...rest } = props;

  if (status === "info")
    return <SvgInfoCircle className={tx("shrink-0 text-4xl text-brand-blue", className)} ref={ref} {...rest} />;

  if (status === "warning")
    return (
      <SvgExclamationTriangle className={tx("shrink-0 text-4xl text-brand-yellow", className)} ref={ref} {...rest} />
    );

  if (status === "success")
    return <SvgCheckCircle className={tx("shrink-0 text-4xl text-brand-green", className)} ref={ref} {...rest} />;

  return <SvgXMarkSquare className={tx("shrink-0 text-4xl text-brand-red", className)} ref={ref} {...rest} />;
});

StatusIcon.displayName = "StatusIcon";
export type { StatusIconProps };
export { StatusIcon };
