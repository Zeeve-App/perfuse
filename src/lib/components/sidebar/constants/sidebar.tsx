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

"use client";

import ZeeveSidebarItemProps from "../type";
import SvgElement3 from "@/lib/icons/grid/outline/Element3";
import SvgBook2 from "@/lib/icons/school/outline/Book2";
import SvgBubbles from "@/lib/icons/essential/outline/Bubbles";
import SvgGithub from "@/lib/icons/programming/outline/github-mark-white";
import SvgSidebarSetting from "@/lib/icons/custom/sidebar-setting";

const ITEMS: {
  title?: string;
  items: ZeeveSidebarItemProps[];
}[] = [
  {
    items: [
      {
        title: "Dashboard",
        icon: <SvgElement3 />,
        path: `/`,
        activePaths: ["/overview", "/blockchain-config", "/collator-nodes", "/rpc-nodes", "/create"],
      },
      {
        title: "Coretime",
        icon: <SvgBubbles />,
        path: `/coretime-page`,
      },
      {
        title: "Settings",
        icon: <SvgSidebarSetting />,
        path: `#`,
      },

      {
        title: "Documents",
        icon: <SvgBook2 />,
        path: `/document`,
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "Github",
        icon: <SvgGithub />,
        path: `https://github.com/Zeeve-App/perfuse`,
        shouldOpenInNewTab: true,
      },
    ],
  },
];

export { ITEMS };
