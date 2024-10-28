/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Copyright (C) 2024 [Perfuse]
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { forwardRef, useMemo } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Spinner } from "../Spinner";
import { tx } from "@/utils/shared";

const styles = cva(
  "inline-flex select-none items-center justify-center gap-1 rounded-lg border border-transparent text-center align-middle font-poppins font-semibold tracking-wide outline-none transition-all duration-300 focus:ring-2 focus:ring-zinc-300 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
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
        small: "h-9 px-4 py-2 text-sm",
        medium: "h-10 px-4 py-2 text-base",
        large: "h-12 px-6 py-4 text-lg",
      },
      colorScheme: {
        primary: "bg-brand-primary text-brand-primary",
        accent: "bg-theme-accent text-theme-accent",
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
        gradient: "bg-theme-gradient text-white",
      },
      isFullWidth: {
        true: "w-full",
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
    ],
    defaultVariants: {
      variant: "solid",
      colorScheme: "primary",
      size: "medium",
    },
  },
);

interface ButtonProps extends Omit<React.ComponentPropsWithRef<"button">, "disabled">, VariantProps<typeof styles> {
  isDisabled?: boolean;
  isLoading?: boolean;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    colorScheme,
    variant,
    size,
    isFullWidth,
    isDisabled,
    isLoading = false,
    children,
    className,
    iconLeft,
    iconRight,
    type = "button",
    ...rest
  } = props;

  const { icon, iconPlacement } = useMemo(() => {
    let icon = iconLeft ? iconLeft : iconRight;

    if (isLoading) {
      icon = <Spinner className="size-5" colorScheme={colorScheme === "gradient" ? "teal" : colorScheme} />;
    }

    return {
      icon,
      iconPlacement: iconRight ? ("right" as const) : ("left" as const),
    };
  }, [isLoading, iconLeft, iconRight]);

  return (
    <button
      className={tx(styles({ colorScheme, variant, size, isFullWidth, className }))}
      type={type}
      ref={ref}
      disabled={isLoading || isDisabled}
      data-state={isLoading ? "loading" : undefined}
      {...rest}
    >
      {icon && iconPlacement === "left" ? icon : null}
      {children}
      {icon && iconPlacement === "right" ? icon : null}
    </button>
  );
});

Button.displayName = "Button";
export type { ButtonProps };
export { Button };
