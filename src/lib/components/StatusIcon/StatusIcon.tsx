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
