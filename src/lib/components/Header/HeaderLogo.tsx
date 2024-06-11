import React from "react";
import { tx } from "@/utils/shared";

interface HeaderLogoProps {
  logoImgSrc: string;
  logoImgAlt: string;
  logoHref: string;
  className?: string;
  logoImgClassName?: string;
}

const HeaderLogo: React.FC<HeaderLogoProps> = (props) => {
  const { logoImgSrc, logoImgAlt, logoHref, className, logoImgClassName } = props;

  return (
    <a className={tx("flex shrink-0 flex-row items-center gap-x-2", className)} href={logoHref}>
      <img src={logoImgSrc} alt={logoImgAlt} className={tx("h-14 w-14", logoImgClassName)} />
    </a>
  );
};

HeaderLogo.displayName = "HeaderLogo";
export type { HeaderLogoProps };
export { HeaderLogo };
