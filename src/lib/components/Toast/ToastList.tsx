import React, { forwardRef, useCallback } from "react";
import { motion, AnimatePresence, Variants, Reorder, HTMLMotionProps } from "framer-motion";
import { cva } from "class-variance-authority";
import { ToastPosition, ToastInstance } from "./types";
import { Toast } from "./Toast";
import { useToastHandler } from "./useToastHandler";
import { tx } from "@/utils/shared";

const motionVariants: Variants = {
  leftHidden: {
    x: -500,
  },
  Show: {
    x: 0,
  },
  rightHidden: {
    x: 500,
  },
};

const styles = cva("invisible absolute min-w-[22rem] py-1", {
  variants: {
    position: {
      "top-left": "left-0 top-0",
      "top-right": "right-0 top-0",
      "bottom-left": "bottom-0 left-0",
      "bottom-right": "bottom-0 right-0",
    },
  },
});

interface ToastListProps extends HTMLMotionProps<"div"> {}

const ToastList = forwardRef<HTMLDivElement, ToastListProps>((props, ref) => {
  const { className, ...rest } = props;

  const { toasts, setToasts } = useToastHandler();

  const reorderToasts = useCallback((position: ToastPosition, newOrder: ToastInstance[]) => {
    switch (position) {
      case "top-left":
        setToasts((prev) => ({
          ...prev,
          "top-left": newOrder,
        }));
        break;
      case "top-right":
        setToasts((prev) => ({
          ...prev,
          "top-right": newOrder,
        }));
        break;
      case "bottom-left":
        setToasts((prev) => ({
          ...prev,
          "bottom-left": newOrder,
        }));
        break;
      case "bottom-right":
      default:
        setToasts((prev) => ({
          ...prev,
          "bottom-right": newOrder,
        }));
        break;
    }
  }, []);

  return (
    <motion.div className={tx("invisible fixed inset-0 z-toast", className)} ref={ref} {...rest}>
      {toasts["top-left"].length > 0 && (
        <motion.div
          className={styles({
            position: "top-left",
          })}
        >
          <Reorder.Group values={toasts["top-left"]} onReorder={(newOrder) => reorderToasts("top-left", newOrder)}>
            <AnimatePresence>
              {toasts["top-left"].map((toast) => {
                return (
                  <Reorder.Item
                    variants={motionVariants}
                    initial="leftHidden"
                    animate="Show"
                    exit="leftHidden"
                    key={toast.id}
                    value={toast}
                    className="m-2"
                  >
                    <Toast toast={toast} />
                  </Reorder.Item>
                );
              })}
            </AnimatePresence>
          </Reorder.Group>
        </motion.div>
      )}
      {toasts["top-right"].length > 0 && (
        <motion.div
          className={styles({
            position: "top-right",
          })}
        >
          <Reorder.Group values={toasts["top-right"]} onReorder={(newOrder) => reorderToasts("top-right", newOrder)}>
            <AnimatePresence>
              {toasts["top-right"].map((toast) => {
                return (
                  <Reorder.Item
                    variants={motionVariants}
                    initial="rightHidden"
                    animate="Show"
                    exit="rightHidden"
                    key={toast.id}
                    value={toast}
                    className="m-2"
                  >
                    <Toast toast={toast} />
                  </Reorder.Item>
                );
              })}
            </AnimatePresence>
          </Reorder.Group>
        </motion.div>
      )}
      {toasts["bottom-left"].length > 0 && (
        <motion.div
          className={styles({
            position: "bottom-left",
          })}
        >
          <Reorder.Group
            values={toasts["bottom-left"]}
            onReorder={(newOrder) => reorderToasts("bottom-left", newOrder)}
          >
            <AnimatePresence>
              {toasts["bottom-left"].map((toast) => {
                return (
                  <Reorder.Item
                    variants={motionVariants}
                    initial="leftHidden"
                    animate="Show"
                    exit="leftHidden"
                    key={toast.id}
                    value={toast}
                    className="m-2"
                  >
                    <Toast toast={toast} />
                  </Reorder.Item>
                );
              })}
            </AnimatePresence>
          </Reorder.Group>
        </motion.div>
      )}
      {toasts["bottom-right"].length > 0 && (
        <motion.div
          className={styles({
            position: "bottom-right",
          })}
        >
          <Reorder.Group
            values={toasts["bottom-right"]}
            onReorder={(newOrder) => reorderToasts("bottom-right", newOrder)}
          >
            <AnimatePresence>
              {toasts["bottom-right"].map((toast) => {
                return (
                  <Reorder.Item
                    variants={motionVariants}
                    initial="rightHidden"
                    animate="Show"
                    exit="rightHidden"
                    key={toast.id}
                    value={toast}
                    className="m-2"
                  >
                    <Toast toast={toast} />
                  </Reorder.Item>
                );
              })}
            </AnimatePresence>
          </Reorder.Group>
        </motion.div>
      )}
    </motion.div>
  );
});

ToastList.displayName = "ToastList";
export type { ToastListProps };
export { ToastList };
