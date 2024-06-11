/* eslint-disable react/display-name */
import React, { forwardRef, useMemo } from "react";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { useBreadcrumb } from "./useBreadcrumb";
import { tx } from "@/utils/shared";

type BreadcrumbItemProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    isActive?: boolean;
    separator?: React.ReactElement | string;
    breadcrumbSeparatorProps?: React.ComponentPropsWithRef<"div">;
  }
>;

type BreadcrumbItemComponent = <C extends React.ElementType = "a">(props: BreadcrumbItemProps<C>) => React.ReactNode;

const BreadcrumbItem: BreadcrumbItemComponent = forwardRef(
  <C extends React.ElementType>(
    { as, href, isActive, separator, className, children, breadcrumbSeparatorProps, ...rest }: BreadcrumbItemProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const { activeLink, setActiveLink, activeLinkClassName, separator: defaultSeparator } = useBreadcrumb();

    const Component = as ?? "a";

    const _isActive = useMemo(() => isActive ?? activeLink === href, [isActive, activeLink, href]);

    React.useEffect(() => {
      if (isActive !== null && isActive !== undefined && isActive && href) {
        setActiveLink(href);
      }
    }, [isActive, href]);

    return (
      <>
        <Component
          className={tx({ [activeLinkClassName ?? "text-brand-gradient"]: _isActive }, className)}
          role="link"
          aria-current={_isActive ? "page" : "false"}
          href={href}
          ref={ref}
          {...rest}
          data-active={_isActive}
        >
          {children}
        </Component>
        <div
          {...breadcrumbSeparatorProps}
          className={tx("inline-block align-middle last:hidden", breadcrumbSeparatorProps?.className)}
        >
          {separator ?? defaultSeparator}
        </div>
      </>
    );
  },
);

export type { BreadcrumbItemProps };
export { BreadcrumbItem };
