"use client";

import ZeeveSidebarItemProps from "../type";
import SvgElement3 from "@/lib/icons/grid/outline/Element3";
import SvgNodes from "@/lib/icons/programming/outline/Nodes";
import SvgBubbles from "@/lib/icons/essential/outline/Bubbles";
import SvgEndpoints1 from "@/lib/icons/programming/outline/Endpoints1";

const ITEMS: {
  title?: string;
  items: {
    icon: React.ReactElement;
    title?: string;
    path: string;
    badge?: React.ReactElement;
    children?: ZeeveSidebarItemProps[];
    className?: string;
    shouldOpenInNewTab?: boolean;
  }[];
}[] = [
  {
    items: [
      {
        title: "Dashboard",
        icon: <SvgElement3 />,
        path: `/`,
      },
      {
        title: "My Parachain",
        icon: <SvgNodes />,
        path: `/my-parachains`,
      },
      {
        title: "Deploy",
        icon: <SvgBubbles />,
        path: `/create`,
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
