"use client";

import ZeeveSidebarItemProps from "../type";
import SvgBook2 from "@/lib/icons/school/outline/Book2";
import SvgMail from "@/lib/icons/communication/outline/Mail";
import SvgElement3 from "@/lib/icons/grid/outline/Element3";
import SvgNodes from "@/lib/icons/programming/outline/Nodes";
import SvgBubbles from "@/lib/icons/essential/outline/Bubbles";
import SvgSetting1 from "@/lib/icons/setting/outline/Setting1";

// const HOST = process.env.NEXT_PUBLIC_HOST ?? "https://app.zeeve.io";

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
    title: "Main Menu",
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
    title: "Others",
    items: [
      {
        title: "Documentation",
        icon: <SvgBook2 />,
        path: `#`,
      },
      {
        title: "Email",
        icon: <SvgMail />,
        path: "https://help.zeeve.io/hc/en-us/signin?return_to=https://help.zeeve.io",
        shouldOpenInNewTab: true,
      },
      {
        title: "Settings",
        icon: <SvgSetting1 />,
        path: `#`,
      },
    ],
  },
];

export { ITEMS };
