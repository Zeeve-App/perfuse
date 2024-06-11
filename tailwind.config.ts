import type { Config } from "tailwindcss";
import tailwindForms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)"], // default font
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [
    tailwindForms({
      strategy: "base",
    }),
    require("./plugin"),
  ],
};
export default config;
