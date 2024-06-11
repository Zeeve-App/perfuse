"use client";

import ZeeveSidebarItemProps from "../type";
import SvgBook2 from "@/lib/icons/school/outline/Book2";
import SvgMail from "@/lib/icons/communication/outline/Mail";
import SvgArrow2Up from "@/lib/icons/arrows/outline/Arrow2Up";
import SvgElement3 from "@/lib/icons/grid/outline/Element3";
import SvgNodes from "@/lib/icons/programming/outline/Nodes";
import SvgBubbles from "@/lib/icons/essential/outline/Bubbles";
import SvgSetting1 from "@/lib/icons/setting/outline/Setting1";

const HOST = process.env.NEXT_PUBLIC_HOST ?? "https://app.zeeve.io";

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
        path: `${HOST}/app/dashboard`,
      },
      {
        title: "My Parachains",
        icon: <SvgNodes />,
        path: `${HOST}/app/workspace`,
      },
      {
        title: "Deploy",
        icon: <SvgBubbles />,
        path: `${HOST}/app/workspace`,
      },
    ],
  },
  {
    title: "Others",
    items: [
      {
        title: "Documentation",
        icon: <SvgBook2 />,
        path: `${HOST}/app/account`,
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
        path: `${HOST}/app/account`,
      },
    ],
  },
];

export { HOST, ITEMS };
