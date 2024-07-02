/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = plugin(
  function ({ addBase, theme, addUtilities, addComponents }) {
    addBase({
      h1: {
        fontSize: "2.5rem",
        lineHeight: "3.125rem",
        fontWeight: theme("fontWeight.bold"),
      },
      h2: {
        fontSize: "2rem",
        lineHeight: "2.5rem",
        fontWeight: theme("fontWeight.bold"),
      },
      h3: {
        fontSize: theme("fontSize.2xl"),
        lineHeight: "1.875rem",
        fontWeight: theme("fontWeight.bold"),
      },
      h4: {
        fontSize: theme("fontSize.xl"),
        lineHeight: "1.625rem",
        fontWeight: theme("fontWeight.bold"),
      },
      h5: {
        fontSize: theme("fontSize.base"),
        lineHeight: "1.375rem",
        fontWeight: theme("fontWeight.bold"),
      },
      h6: {
        fontSize: theme("fontSize.sm"),
        fontWeight: theme("fontWeight.bold"),
      },
    });
    addUtilities({
      ".bg-brand-gradient-10": {
        background: "linear-gradient(131deg, rgba(50, 184, 178, 0.10) 0%, rgba(8, 141, 178, 0.10) 100%)",
      },
      ".bg-brand-gradient-20": {
        background: "linear-gradient(131deg, rgba(50, 184, 178, 0.20) 0%, rgba(8, 141, 178, 0.20) 100%)",
      },
      ".bg-brand-gradient-40": {
        background: "linear-gradient(131deg, rgba(50, 184, 178, 0.40) 0%, rgba(8, 141, 178, 0.40) 100%)",
      },
      ".bg-brand-gradient-60": {
        background: "linear-gradient(131deg, rgba(50, 184, 178, 0.60) 0%, rgba(8, 141, 178, 0.60) 100%)",
      },
      ".bg-brand-gradient-80": {
        background: "linear-gradient(131deg, rgba(50, 184, 178, 0.80) 0%, rgba(8, 141, 178, 0.80) 100%)",
      },
      ".bg-brand-gradient": {
        background: "linear-gradient(130deg, #32B8B2 0%, #088DB2 100%)",
      },
      ".bg-brand-gradient-blue-48": {
        background: "linear-gradient(108deg, #868cff 6%, #4318ff 48%)",
      },
      ".bg-brand-gradient-blue": {
        background: "linear-gradient(107deg, #868cff 0%, #4318ff)",
      },
      ".text-brand-gradient": {
        background: "linear-gradient(130deg, #32B8B2 0%, #088DB2 100%)",
        "-webkit-background-clip": "text",
        "background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        "text-fill-color": "transparent",
      },
      ".scrollbar-hide": {
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      },
      ".scrollbar-hide::-webkit-scrollbar": {
        display: "none",
      },
      ".shadow-brand-shadow":{
        "box-shadow": "0 18px 40px 0 rgba(112, 144, 176, 0.12)",
      }
    });
    addComponents({
      select: {
        "background-image": `url("data:image/svg+xml,%3Csvg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 6h2.67c3.31 0 4.67 2.35 3.01 5.22l-1.34 2.31L15 15.84c-1.66 2.87-4.37 2.87-6.03 0l-1.34-2.31-1.34-2.31C4.66 8.35 6.01 6 9.33 6H12Z' stroke='currentColor' strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' /%3E%3C/svg%3E")`,
      },
    });
  },
  {
    darkMode: "class",
    /** https://tailwindcss.com/docs/theme#extending-the-default-theme */
    theme: {
      extend: {
        /** https://tailwindcss.com/docs/font-family */
        fontFamily: {
          sans: ["'DM Sans'", "sans-serif", ...defaultTheme.fontFamily.sans],
          poppins: ["Poppins", "sans-serif"],
        },
        /** https://tailwindcss.com/docs/customizing-colors */
        colors: {
          dark: {
            50: "#e6e7e7",
            100: "#cecfd0",
            200: "#b5b7b8",
            300: "#9c9fa0",
            400: "#838788",
            500: "#6b6e71",
            600: "#525659",
            700: "#393e41",
            800: "#21262a",
            900: "#080e12",
          },
          brand: {
            primary: "#4054B2",
            blue: "#4054B2",
            red: "#C12C2C",
            green: "#2EC589",
            yellow: "#F0AC00",
            gray: "#57647D",
            dark: "#080E12",
            cyan: "#32B8B2",
            teal: "#088DB2",
            light: "#f4f7fe",
            outline: "#080E121A",
            purple: "#5E35B5",
            pink: "#B53563",
            shadow:"rgba(112, 144, 176, 0.12)",
          },
        },
        /** do not use until required */
        zIndex: {
          dropdown: 500,
          sidebar: 600,
          toast: 700,
        },
        gridTemplateColumns: (theme) => {
          const spacing = theme("spacing");

          return Object.keys(spacing).reduce((accumulator, spacingKey) => {
            return {
              ...accumulator,
              [`fill-${spacingKey}`]: `repeat(auto-fill, minmax(${spacing[spacingKey]}, 1fr))`,
              [`fit-${spacingKey}`]: `repeat(auto-fit, minmax(${spacing[spacingKey]}, 1fr))`,
            };
          }, {});
        },
        gridTemplateRows: (theme) => {
          const spacing = theme("spacing");

          return Object.keys(spacing).reduce((accumulator, spacingKey) => {
            return {
              ...accumulator,
              [`fill-${spacingKey}`]: `repeat(auto-fill, minmax(${spacing[spacingKey]}, 1fr))`,
              [`fit-${spacingKey}`]: `repeat(auto-fit, minmax(${spacing[spacingKey]}, 1fr))`,
            };
          }, {});
        },
      },
    },
  },
);
