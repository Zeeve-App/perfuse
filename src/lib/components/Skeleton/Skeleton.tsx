/* eslint-disable react/display-name */
import React from "react";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { tx } from "@/utils/shared";

type SkeletonProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C>;

type SkeletonComponent = <C extends React.ElementType = "div">(props: SkeletonProps<C>) => React.ReactNode;

const Skeleton: SkeletonComponent = React.forwardRef(
  <C extends React.ElementType>({ as, className, children, ...rest }: SkeletonProps<C>, ref?: PolymorphicRef<C>) => {
    const Component = as ?? "div";

    return (
      <Component role="status" className={tx("animate-pulse", className)} ref={ref} {...rest}>
        {children}
      </Component>
    );
  },
);

export type { SkeletonProps };
export { Skeleton };
