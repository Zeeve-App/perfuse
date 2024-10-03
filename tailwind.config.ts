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
      colors: {
        theme: {
          background: "var(--background)",
          foreground: "var(--foreground)",
          accent: "var(--accent)",
          "accent-foreground": "var(--accent-foreground)",
          "accent-content": "var(--accent-content)",
          primary: "var(--primary)",
          "primary-content": "var(--primary-content)",
          secondary: "var(--secondary)",
        },
      },
      backgroundImage: {
        "theme-gradient": "linear-gradient(284.76deg, #6619F5 33.64%, #CE2CCA 125.73%)",
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
