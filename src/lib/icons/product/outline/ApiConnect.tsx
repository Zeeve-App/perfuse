import * as React from "react";
import type { SVGProps } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgApiConnect = ({
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
        <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={1.5}
            clipPath="url(#api-connect_svg__clip0_283_65859)"
        >
            <path d="m8.085 11.979-1.532-1.532L3.99 13.01a5 5 0 0 0 0 7.071l.056.056m4.04-8.16 2.546-2.548M8.085 11.98l4.144 4.144m0 0 1.507 1.507-2.564 2.564a5 5 0 0 1-7.07 0l-.057-.056m8.184-4.015 2.547-2.548m-10.73 6.563-2.314 2.313M20.279 3.905l.055.056a5 5 0 0 1 0 7.07l-2.564 2.565-1.507-1.507-4.144-4.144-1.532-1.532 2.564-2.564a5 5 0 0 1 7.071 0l.056.056Zm0 0 2.313-2.313" />
        </g>
    </svg>
);
SvgApiConnect.displayName = "IconApiConnect";
export default SvgApiConnect;
