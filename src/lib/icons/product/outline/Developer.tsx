import * as React from "react";
import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDeveloper = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
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
    <g clipPath="url(#developer_svg__clip0_2360_121050)">
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19.471 4.601 6.177 16.105l-4.82-1.977-.005-.002a.528.528 0 0 1-.251-.18.582.582 0 0 1-.1-.305.579.579 0 0 1 .06-.31.54.54 0 0 1 .222-.211l.003-.002L22.149 1.082l.003-.003A.533.533 0 0 1 22.433 1c.12 0 .223.032.316.095.108.08.174.164.211.25.037.088.051.194.032.325l-3.21 19.255c-.029.17-.118.3-.288.401a.535.535 0 0 1-.485.023L13.33 19.03l-.16-.065-.11.134-3.034 3.698-.003.004a.505.505 0 0 1-.43.199.45.45 0 0 1-.18-.03l-.008-.003-.007-.003a.553.553 0 0 1-.271-.209.549.549 0 0 1-.102-.323v-4.293l10.78-13.213-.335-.325Z"
      />
    </g>
  </svg>
);
SvgDeveloper.displayName = "IconDeveloper";
export default SvgDeveloper;
