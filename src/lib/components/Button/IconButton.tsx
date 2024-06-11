import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";
import { Spinner } from "../Spinner";
import { tx } from "@/utils/shared";

const styles = cva(
  "inline-flex shrink-0 select-none items-center justify-center rounded-lg border border-transparent text-center align-middle font-poppins font-medium outline-none transition-all duration-300 focus:ring-2 focus:ring-zinc-300 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "hover:text-opacity-100 hover:opacity-90",
        outline: "border-current bg-transparent",
        ghost:
          "border-brand-outline bg-transparent hover:border-current focus:border-current disabled:hover:border-brand-outline",
        text: "bg-transparent",
      },
      size: {
        small: "size-9 text-sm",
        medium: "size-10 text-base",
        large: "size-12 text-lg",
      },
      colorScheme: {
        primary: "bg-brand-primary text-brand-primary",
        blue: "bg-brand-blue text-brand-blue",
        dark: "bg-brand-dark text-brand-dark",
        red: "bg-brand-red text-brand-red",
        green: "bg-brand-green text-brand-green",
        yellow: "bg-brand-yellow text-brand-yellow",
        gray: "bg-brand-gray text-brand-gray",
        teal: "bg-brand-teal text-brand-teal",
        cyan: "bg-brand-cyan text-brand-cyan",
        light: "bg-brand-light text-brand-light",
        purple: "bg-brand-purple text-brand-purple",
        pink: "bg-brand-pink text-brand-pink",
        gradient: "bg-brand-gradient text-brand-gradient",
      },
      isRounded: {
        true: "rounded-full",
      },
    },
    compoundVariants: [
      {
        colorScheme: [
          "primary",
          "blue",
          "dark",
          "red",
          "green",
          "gray",
          "teal",
          "cyan",
          "purple",
          "pink",
          "gradient",
          "yellow",
        ],
        variant: "solid",
        className: "text-white",
      },
      {
        colorScheme: ["light"],
        variant: "solid",
        className: "text-brand-dark",
      },
      {
        variant: ["outline", "ghost", "text"],
        className: "bg-transparent",
      },
      {
        colorScheme: "gradient",
        variant: ["ghost", "text"],
        className: "bg-transparent",
      },
      {
        colorScheme: "gradient",
        variant: ["outline"],
        className: "border-brand-teal bg-transparent",
      },
      {
        variant: "text",
        className: "size-max p-0",
      },
    ],
    defaultVariants: {
      variant: "solid",
      colorScheme: "primary",
      size: "medium",
    },
  },
);

interface IconButtonProps extends Omit<React.ComponentPropsWithRef<"button">, "disabled">, VariantProps<typeof styles> {
  isDisabled?: boolean;
  isLoading?: boolean;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const {
    colorScheme,
    variant,
    size,
    isRounded,
    isDisabled,
    isLoading = false,
    children,
    className,
    type = "button",
    ...rest
  } = props;

  return (
    <button
      className={tx(styles({ colorScheme, variant, size, isRounded, className }))}
      type={type}
      ref={ref}
      disabled={isLoading || isDisabled}
      data-state={isLoading ? "loading" : undefined}
      {...rest}
    >
      {isLoading ? (
        <Spinner className="size-max p-2" colorScheme={colorScheme === "gradient" ? "teal" : colorScheme} />
      ) : (
        children
      )}
    </button>
  );
});

IconButton.displayName = "IconButton";
export type { IconButtonProps };
export { IconButton };
