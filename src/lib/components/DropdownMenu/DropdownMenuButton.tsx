/* eslint-disable react/display-name */
import React from "react";
import { Button } from "../Button";
import { usePopoverContext } from "../Popover";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { useMergeRefs } from "@/hooks";

type DropdownMenuButtonProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C>;

type DropdownMenuButtonComponent = <C extends React.ElementType = typeof Button>(
  props: DropdownMenuButtonProps<C>,
) => React.ReactNode;

const DropdownMenuButton: DropdownMenuButtonComponent = React.forwardRef(
  <C extends React.ElementType>({ as, children, ...rest }: DropdownMenuButtonProps<C>, ref?: PolymorphicRef<C>) => {
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

export type { DropdownMenuButtonProps };
export { DropdownMenuButton };
