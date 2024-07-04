/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { tx } from "@/utils/shared";

type HeadingProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    className?: string;
  }
>;

type HeadingComponent = <C extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h2">(
  props: HeadingProps<C>,
) => React.ReactNode;

const Heading: HeadingComponent = forwardRef(
  <C extends React.ElementType>({ as, className, children, ...rest }: HeadingProps<C>, ref?: PolymorphicRef<C>) => {
    const Component = as ?? "h2";

    return (
      <Component
        className={tx("font-poppins font-semibold text-brand-darker-blue", className)}
        ref={ref}
        role="heading"
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

export type { HeadingProps };
export { Heading };
