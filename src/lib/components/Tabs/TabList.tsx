import React, { Children, cloneElement, forwardRef } from "react";
import { cva } from "class-variance-authority";
import { useTabsContext } from "./TabsContext";
import { tx } from "@/utils/shared";

const styles = cva("flex text-brand-dark", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center justify-start border-b border-brand-outline",
      vertical: "flex-col items-start justify-start divide-y divide-brand-outline border-r border-brand-outline",
    },
  },
});

interface TabListProps extends React.ComponentPropsWithRef<"div"> {
  children: React.ReactElement | React.ReactElement[];
}

const TabList = forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const { orientation } = useTabsContext();

  return (
    <div
      className={tx(styles({ orientation, className }))}
      role="tablist"
      aria-orientation={orientation}
      ref={ref}
      {...rest}
    >
      {Children.map(children, (child, index) => {
        return cloneElement(child, {
          index: index,
        });
      })}
    </div>
  );
});

TabList.displayName = "TabList";
export type { TabListProps };
export { TabList };
