/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { tx } from "@/utils/shared";

type CardProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C>;

type CardComponent = <C extends React.ElementType = "div">(props: CardProps<C>) => React.ReactNode;

const Card: CardComponent = forwardRef(
  <C extends React.ElementType>({ as, className, children, ...rest }: CardProps<C>, ref?: PolymorphicRef<C>) => {
    const Component = as ?? "div";

    return (
      <Component
        className={tx(
          "flex flex-col gap-3 rounded-lg border border-brand-outline bg-white p-3 text-brand-dark lg:gap-6 lg:p-6",
          className,
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </Component>
    );
  },
);

export type { CardProps };
export { Card };
