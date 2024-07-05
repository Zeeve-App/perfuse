"use client";

import ZeeveSidebarItemProps from "../type";
import SvgElement3 from "@/lib/icons/grid/outline/Element3";
import SvgNodes from "@/lib/icons/programming/outline/Nodes";
import SvgEndpoints1 from "@/lib/icons/programming/outline/Endpoints1";
import SvgBook2 from "@/lib/icons/school/outline/Book2";
import SvgBubbles from "@/lib/icons/essential/outline/Bubbles";

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
        path: `/Coretime`,
      },
      {
        title: "Settings",
        icon: <SvgNodes />,
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
        icon: <SvgEndpoints1 />,
        path: `#`,
      },
    ],
  },
];

export { ITEMS };
