import React, { ComponentPropsWithRef, MutableRefObject, forwardRef, useMemo, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { Placement, PositioningStrategy } from "@popperjs/core";
import { PopoverContextProps, PopoverContextProvider } from "../Popover";
import { useOnClickOutside } from "@/hooks";

interface DropdownMenuProps extends ComponentPropsWithRef<"div"> {
  /** is dropdown menu open? */
  isOpen: boolean;
  /** action to perform on close */
  onClose: () => void;
  /** dropdown menu placement
   * @default "bottom-end"
   */
  placement?: Placement;
  /** positioning strategy */
  strategy?: PositioningStrategy;
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>((props, ref) => {
  const { isOpen, onClose, placement = "bottom-end", strategy, children, ...rest } = props;

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy,
  });

  const localRef = useRef(null);
  const dropdownMenuRef = ref ?? localRef;
  useOnClickOutside(dropdownMenuRef as MutableRefObject<HTMLDivElement>, onClose);

  const values: PopoverContextProps = useMemo(() => {
    return {
      isOpen,
      setReferenceElement,
      setPopperElement,
      styles,
      attributes,
    };
  }, [isOpen, setReferenceElement, setPopperElement, styles, attributes]);

  return (
    <PopoverContextProvider value={values}>
      <div ref={dropdownMenuRef} {...rest}>
        {children}
      </div>
    </PopoverContextProvider>
  );
});

DropdownMenu.displayName = "DropdownMenu";
export type { DropdownMenuProps };
export { DropdownMenu };
