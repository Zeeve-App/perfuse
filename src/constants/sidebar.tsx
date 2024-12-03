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

import ZeeveSidebarItemProps from "../lib/components/sidebar/type";
import SvgElement3 from "@/lib/icons/grid/outline/Element3";
import SvgBook2 from "@/lib/icons/school/outline/Book2";
import SvgBubbles from "@/lib/icons/essential/outline/Bubbles";
import Svg4Square from "@/lib/icons/grid/outline/4Square";
import Svg3dBlock from "@/lib/icons/grid/outline/3dBlock";
import SvgCpu from "@/lib/icons/programming/outline/Cpu";

const ITEMS: {
  title?: string;
  items: ZeeveSidebarItemProps[];
}[] = [
  {
    items: [
      {
        title: "Dashboard",
        icon: <Svg4Square className="size-5" />,
        path: `/`,
        activePaths: ["/overview", "/blockchain-config", "/collator-nodes", "/rpc-nodes"],
      },
      {
        title: "Deploy Parachain",
        icon: <Svg3dBlock className="size-5" />,
        path: `/deploy`,
        activePaths: ["/deploy"],
      },
      {
        title: "Coretime",
        icon: <SvgCpu className="size-5" />,
        path: `/coretime-page`,
      },
      // {
      //   title: "Settings",
      //   icon: <SvgSidebarSetting />,
      //   path: `#`,
      // },

      {
        title: "Support",
        icon: <SvgBook2 className="size-5" />,
        path: `/document`,
      },
    ],
  },
];

export { ITEMS };
