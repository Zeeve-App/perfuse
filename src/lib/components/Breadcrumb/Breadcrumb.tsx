import React, { forwardRef, useMemo, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { BreadcrumbContextProps, BreadcrumbContext, Separator } from "./BreadcrumbContextProvider";
import { DEFAULT_SEPARATOR } from "./useBreadcrumb";
import { tx } from "@/utils/shared";

interface BreadcrumbProps extends HTMLMotionProps<"nav"> {
  separator?: Separator;
  activeLink?: string;
  activeLinkClassName?: string;
}

const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>((props, ref) => {
  const { separator = DEFAULT_SEPARATOR, activeLink = "/", className, activeLinkClassName, children, ...rest } = props;

  const [_activeLink, _setActiveLink] = useState<string>(activeLink);
  const [_separator, _setSeparator] = useState<Separator>(separator);

  const contextValues: BreadcrumbContextProps = useMemo(
    () => ({
      activeLink: _activeLink,
      separator: _separator,
      setActiveLink: _setActiveLink,
      setSeparator: _setSeparator,
      activeLinkClassName,
    }),
    [activeLink, separator, activeLinkClassName],
  );

  return (
    <BreadcrumbContext.Provider value={contextValues}>
      <motion.nav
        className={tx("flex flex-row items-center gap-2 font-poppins text-sm font-medium text-brand-dark", className)}
        aria-label="Breadcrumb"
        ref={ref}
        {...rest}
      >
        {children}
      </motion.nav>
    </BreadcrumbContext.Provider>
  );
});

Breadcrumb.displayName = "Breadcrumb";
export type { BreadcrumbProps };
export { Breadcrumb };
