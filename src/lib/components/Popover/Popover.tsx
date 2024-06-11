import React, { useMemo, useState } from "react";
import { Modifier, usePopper } from "react-popper";
import { Placement, PositioningStrategy } from "@popperjs/core";
import { PopoverContextProps, PopoverContextProvider } from "./PopoverContext";

interface PopoverProps {
  children: React.ReactNode;
  isOpen: boolean;
  /** popover placement */
  placement?: Placement;
  /** positioning strategy */
  strategy?: PositioningStrategy;
  /** modifiers */
  modifiers?: Array<Partial<Modifier<string, object>>>;
}

const Popover = (props: PopoverProps) => {
  const { isOpen, placement = "auto", strategy = "fixed", modifiers, children } = props;

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy,
    modifiers,
  });

  const values: PopoverContextProps = useMemo(() => {
    return {
      isOpen,
      setReferenceElement,
      setPopperElement,
      styles,
      attributes,
    };
  }, [isOpen, setReferenceElement, setPopperElement, styles, attributes]);

  return <PopoverContextProvider value={values}>{children}</PopoverContextProvider>;
};

export type { PopoverProps };
export { Popover };
