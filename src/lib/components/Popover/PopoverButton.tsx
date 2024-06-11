/* eslint-disable react/display-name */
import React from "react";
import { Button } from "../Button";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { usePopoverContext } from "./PopoverContext";
import { useMergeRefs } from "@/hooks";

type PopoverButtonProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C>;

type PopoverButtonComponent = <C extends React.ElementType = typeof Button>(
  props: PopoverButtonProps<C>,
) => React.ReactNode;

const PopoverButton: PopoverButtonComponent = React.forwardRef(
  <C extends React.ElementType>({ as, children, ...rest }: PopoverButtonProps<C>, ref?: PolymorphicRef<C>) => {
    const { setReferenceElement } = usePopoverContext();
    const refs = useMergeRefs(ref, setReferenceElement);

    const Component = as ?? Button;

    return (
      <Component ref={refs} {...rest}>
        {children}
      </Component>
    );
  },
);

export type { PopoverButtonProps };
export { PopoverButton };
