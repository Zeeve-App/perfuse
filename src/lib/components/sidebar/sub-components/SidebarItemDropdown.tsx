import React, { forwardRef } from "react";
import { AnimatePresence, motion, HTMLMotionProps } from "framer-motion";
// import {  IconArrow2Up } from "@zeeve-platform/icons/arrow/outline";
import { tx } from "@/utils/shared";
import { useToggle } from "@/hooks";
import SvgArrow2Down from "@/lib/icons/arrows/outline/Arrow2Down";
import SvgArrow2Up from "@/lib/icons/arrows/outline/Arrow2Up";

interface SidebarItemDropdownProps extends HTMLMotionProps<"button"> {
  title: string;
  iconLeft?: React.ReactElement;
  badge?: React.ReactElement;
  iconDropdownExpanded?: React.ReactElement;
  iconDropdownCollapsed?: React.ReactElement;
  isActive?: boolean;
}

const SidebarItemDropdown = forwardRef<HTMLButtonElement, SidebarItemDropdownProps>((props, ref) => {
  const {
    title,
    iconLeft,
    badge,
    iconDropdownExpanded,
    iconDropdownCollapsed,
    isActive,
    children,
    className,
    ...rest
  } = props;

  const { isOpen: isExpanded, handleToggle } = useToggle(isActive);
  const _iconDropdownCollapsed = iconDropdownCollapsed ? iconDropdownCollapsed : <SvgArrow2Down className="text-2xl" />;
  const _iconDropdownExpanded = iconDropdownExpanded ? iconDropdownExpanded : <SvgArrow2Up className="text-2xl" />;

  return (
    <>
      <motion.button
        className={tx(
          "group relative flex max-h-14 cursor-pointer items-center justify-start gap-3 px-6 py-4 text-white transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-brand-cyan/10 hover:to-brand-teal/5",
          className,
        )}
        ref={ref}
        {...rest}
        onClick={handleToggle}
      >
        <div
          className={`absolute left-0 w-[4px] rounded-r-full py-4 bg-brand-gradient group-hover:block ${
            isActive ? "block" : "hidden"
          }`}
        />
        {iconLeft ? iconLeft : null}
        <span className="flex flex-col gap-y-1 text-base font-normal leading-4">
          {title}
          {badge ? badge : null}
        </span>
        {isExpanded ? (
          <motion.div className="ml-auto">{_iconDropdownExpanded}</motion.div>
        ) : (
          <motion.div className="ml-auto">{_iconDropdownCollapsed}</motion.div>
        )}
      </motion.button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            className="flex flex-col font-medium"
            variants={{
              animate: { opacity: 1, height: "auto" },
              initial: { opacity: 0, height: 0 },
            }}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

SidebarItemDropdown.displayName = "SidebarItemDropdown";
export type { SidebarItemDropdownProps };
export { SidebarItemDropdown };
