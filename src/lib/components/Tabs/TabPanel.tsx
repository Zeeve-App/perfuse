import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface TabPanelProps extends HTMLMotionProps<"div"> {}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <motion.div role="tabpanel" className={className} ref={ref} {...rest}>
      {children}
    </motion.div>
  );
});

TabPanel.displayName = "TabPanel";
export type { TabPanelProps };
export { TabPanel };
