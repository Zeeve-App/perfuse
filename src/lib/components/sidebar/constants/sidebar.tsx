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
        path: `#`,
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "Github",
        icon: <SvgGithub />,
        path: `#`,
      },
    ],
  },
];

export { ITEMS };
