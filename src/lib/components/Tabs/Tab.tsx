import React, { forwardRef, useMemo } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { useTabsContext } from "./TabsContext";
import { tx } from "@/utils/shared";

const styles = cva("flex flex-row items-center p-4 font-poppins text-sm font-medium", {
  variants: {
    orientation: {
      horizontal: "w-max border-b-2 border-transparent",
      vertical: "w-full min-w-max",
    },
  },
});

interface TabProps extends React.ComponentPropsWithRef<"button">, VariantProps<typeof styles> {
  index?: number;
}

const Tab = forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  const { className, index = 0, onClick, children, ...rest } = props;

  const { orientation, activeIndex, setActiveIndex, activeTabClassName } = useTabsContext();

  const isActive = useMemo(() => activeIndex === index, [activeIndex, index]);

  return (
    <button
      onClick={(e) => {
        setActiveIndex(index);
        if (onClick) onClick(e);
      }}
      role="tab"
      className={tx(
        styles({ orientation, className }),
        {
          [activeTabClassName ?? "border-brand-primary text-brand-primary"]: isActive && orientation === "horizontal",
        },
        {
          [activeTabClassName ?? "text-brand-primary"]: isActive && orientation === "vertical",
        },
      )}
      ref={ref}
      {...rest}
      data-active={isActive}
      data-tab-index={index}
    >
      {children}
    </button>
  );
});

Tab.displayName = "Tab";
export type { TabProps };
export { Tab };
