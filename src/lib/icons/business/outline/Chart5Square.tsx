import * as React from "react";
import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgChart5Square = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="1em"
  //   height="1em"
  //   fill="none"
  //   viewBox="0 0 24 24"
  //   aria-labelledby={titleId}
  //   {...props}
  // >
  //   {title ? <title id={titleId}>{title}</title> : null}
  //   <path
  //     stroke="currentColor"
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     strokeMiterlimit={10}
  //     strokeWidth={1.5}
  //     d="M10.11 11.15H7.46c-.63 0-1.14.51-1.14 1.14v5.12h3.79v-6.26 0Z"
  //   />
  //   <path
  //     stroke="currentColor"
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     strokeMiterlimit={10}
  //     strokeWidth={1.5}
  //     d="M12.761 6.6h-1.52c-.63 0-1.14.51-1.14 1.14v9.66h3.79V7.74c0-.63-.5-1.14-1.13-1.14ZM16.548 12.85h-2.65v4.55h3.79v-3.41c-.01-.63-.52-1.14-1.14-1.14Z"
  //   />
  //   <path
  //     stroke="currentColor"
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     strokeWidth={1.5}
  //     d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z"
  //   />
  // </svg>

  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.5 18.5c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2s-2 .9-2 2v9a2 2 0 0 0 2 2zM8.5 18.5c1.1 0 2-.9 2-2V13c0-1.1-.9-2-2-2s-2 .9-2 2v3.5a2 2 0 0 0 2 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
SvgChart5Square.displayName = "IconChart5Square";
export default SvgChart5Square;
