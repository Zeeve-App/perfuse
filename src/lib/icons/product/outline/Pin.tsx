import * as React from "react";
import type { SVGProps } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPin = ({
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
            strokeWidth={1.5}
            d="m6.33 17.615 4.223 4.267a1 1 0 0 0 1.65-.359l2.263-6.156a1 1 0 0 1 .517-.562l5.405-2.509a2 2 0 0 0 .563-3.237l-6.165-6.09a2 2 0 0 0-3.207.555l-2.69 5.585a1 1 0 0 1-.565.508l-5.843 2.084a1 1 0 0 0-.375 1.646l4.224 4.268Zm0 0L1.454 23"
        />
    </svg>
);
SvgPin.displayName = "IconPin";
export default SvgPin;
