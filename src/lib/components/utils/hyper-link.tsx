import Link, { LinkProps } from "next/link";
import { FC, HTMLProps } from "react";
import { tx } from "@/utils/shared";

const HyperLink: FC<LinkProps & HTMLProps<HTMLAnchorElement>> = (props) => {
  return (
    <Link {...props} className={tx("cursor-pointer text-brand-blue", props.className)}>
      {props.children}
    </Link>
  );
};

export default HyperLink;
