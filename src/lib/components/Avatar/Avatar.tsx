/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { tx } from "@/utils/shared";

type AvatarProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    className?: string;
  }
>;

type AvatarComponent = <C extends React.ElementType = "img">(props: AvatarProps<C>) => React.ReactNode;

const Avatar: AvatarComponent = forwardRef(
  <C extends React.ElementType>({ as, className, ...rest }: AvatarProps<C>, ref?: PolymorphicRef<C>) => {
    const Component = as ?? "img";

    return (
      <Component
        className={tx(
          "h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-brand-cyan to-brand-teal object-cover",
          className,
        )}
        role="img"
        ref={ref}
        {...rest}
      />
    );
  },
);

export type { AvatarProps };
export { Avatar };
