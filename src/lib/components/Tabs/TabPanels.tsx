import React, { Children, forwardRef, useMemo } from "react";
import { useTabsContext } from "./TabsContext";
import { tx } from "@/utils/shared";

interface TabPanelsProps extends React.ComponentPropsWithRef<"div"> {
  children?: React.ReactElement | React.ReactElement[];
}

const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>((props, ref) => {
  const { children, className, ...rest } = props;

  const { activeIndex } = useTabsContext();

  const activeTab = useMemo(
    () => Children.map(children, (child, index) => (index === activeIndex ? child : null)),
    [children, activeIndex],
  );

  return (
    <div className={tx("w-full", className)} ref={ref} {...rest}>
      {activeTab}
    </div>
  );
});

TabPanels.displayName = "TabPanels";
export type { TabPanelsProps };
export { TabPanels };
