"use client";
import React from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { Breadcrumb as ZeeveBreadcrumb, BreadcrumbItem } from "../Breadcrumb";

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
    onClick?: () => void;
    isActive?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: React.ElementType<any>;
  }[];
}

const Breadcrumb = (props: BreadcrumbProps) => {
  const { items } = props;

  const pathname = usePathname();

  return (
    <ZeeveBreadcrumb className="flex-wrap gap-3" activeLink={pathname}>
      {items.length
        ? items.map((item) => {
            const Component = item.as ?? NextLink;
            return (
              <BreadcrumbItem
                key={item.label}
                as={Component}
                href={item.href}
                onClick={item.onClick}
                isActive={item.isActive}
              >
                {item.label}
              </BreadcrumbItem>
            );
          })
        : null}
    </ZeeveBreadcrumb>
  );
};

export type { BreadcrumbProps };
export { Breadcrumb };
