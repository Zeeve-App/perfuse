"use client";
import React, { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  SidebarDivider,
  Sidebar,
  SidebarItemGroup,
  SidebarItemGroupTitle,
  SidebarItems,
  SidebarHeader,
  SidebarItem,
  SidebarItemDropdown,
  SidebarProps,
} from "../sidebar/sub-components";
import { HOST, ITEMS } from "./constants/sidebar";
import ZeeveSidebarItemProps from "./type";
import { tx } from "@/utils/shared";
import { isActive, withBasePath } from "@/utils/helpers";
// import "./sidebar.css";

const ZeeveSidebarItemDropdown = ({ item, pathname }: { item: ZeeveSidebarItemProps; pathname: string }) => {
  return (
    <SidebarItemDropdown
      iconLeft={item.icon}
      title={item.title ?? ""}
      badge={item.badge}
      isActive={item.children?.some((child) => pathname.endsWith(child.path))}
      className={tx("max-h-10", item.className)}
    >
      {item.children?.map((child, index) => {
        if (child.children) {
          return <ZeeveSidebarItemDropdown key={`${child.title}-dropdown-${index}`} item={child} pathname={pathname} />;
        }

        const getProps = () => {
          if (child.shouldOpenInNewTab) {
            return {
              target: "_blank",
              rel: "noopener noreferrer",
            };
          }
        };

        return (
          <SidebarItem
            key={`${child.title}-${index}`}
            as="a"
            iconLeft={child.icon}
            title={child.title || ""}
            badge={child.badge}
            isActive={isActive(pathname, child.path)}
            className={tx("max-h-10", child.className)}
            href={child.path}
            isChild={true}
            {...getProps()}
          />
        );
      })}
    </SidebarItemDropdown>
  );
};

const ZeeveSidebarItem = ({ item, pathname }: { item: ZeeveSidebarItemProps; pathname: string }) => {
  if (item.children) {
    return <ZeeveSidebarItemDropdown item={item} pathname={pathname} />;
  }

  const getProps = () => {
    if (item.shouldOpenInNewTab) {
      return {
        target: "_blank",
        rel: "noopener noreferrer",
      };
    }
  };

  return (
    <SidebarItem
      as="a"
      iconLeft={item.icon}
      title={item.title || ""}
      badge={item.badge}
      isActive={isActive(pathname, item.path)}
      className={tx("max-h-10", item.className)}
      href={item.path}
      {...getProps()}
    />
  );
};

const ZeeveSidebar = (props: SidebarProps) => {
  const { className, ...rest } = props;

  const pathname = usePathname();

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.remove("scrollbar-hide");
    }
  }, []);

  return (
    <Sidebar className={tx("w-full lg:w-full", className)} {...rest}>
      <SidebarHeader className="justify-center">
        <a href={`${HOST}/app/dashboard`}>
          <Image
            src={withBasePath("/assets/images/zeeve-logo-on-dark-bg.svg")}
            alt="Zeeve Logo"
            width={64}
            height={64}
            className="size-16"
            priority
          />
        </a>
      </SidebarHeader>
      <SidebarItems ref={ref}>
        {ITEMS.length
          ? ITEMS.map((itemGroup, index) => (
              <Fragment key={index}>
                <SidebarItemGroup className="py-4">
                  {itemGroup.title ? <SidebarItemGroupTitle>{itemGroup.title}</SidebarItemGroupTitle> : null}
                  {itemGroup.items.length
                    ? itemGroup.items.map((item, idx) => {
                        return (
                          <ZeeveSidebarItem
                            key={`${itemGroup.title}-${item.title}-${idx}`}
                            item={item}
                            pathname={pathname}
                          />
                        );
                      })
                    : null}
                </SidebarItemGroup>
                {/* show divider only when there is next element in the list */}
                {ITEMS[index + 1] ? <SidebarDivider /> : null}
              </Fragment>
            ))
          : null}
      </SidebarItems>
    </Sidebar>
  );
};

export default ZeeveSidebar;
