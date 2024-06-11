import * as React from "react";
import type { SVGProps } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgNetwork = ({
    title,
    titleId,
    ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
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
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="m6.917 14.854 2.993-3.89 3.414 2.68 2.929-3.78"
        />
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M19.5 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 1 1 0-5Z"
            clipRule="evenodd"
        />
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M20.756 9.269c.133.895.194 1.903.194 3.034 0 6.938-2.313 9.25-9.25 9.25-6.938 0-9.25-2.312-9.25-9.25 0-6.937 2.312-9.25 9.25-9.25 1.11 0 2.1.059 2.982.187"
        />
    </svg>
);
SvgNetwork.displayName = "IconNetwork";
export default SvgNetwork;
