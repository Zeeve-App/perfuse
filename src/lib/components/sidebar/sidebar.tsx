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
import React, { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarItemGroup,
  SidebarItemGroupTitle,
  SidebarItems,
  SidebarHeader,
  SidebarItem,
  SidebarItemDropdown,
  SidebarProps,
} from "../sidebar/sub-components";
import { ITEMS } from "./constants/sidebar";
import ZeeveSidebarItemProps from "./type";
import { tx } from "@/utils/shared";
import { isActive, withBasePath } from "@/utils/helpers";

const ZeeveSidebarItemDropdown = ({
  item,
  pathname,
  activePaths,
}: {
  item: ZeeveSidebarItemProps;
  pathname: string;
  activePaths?: string[];
}) => {
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
            isActive={isActive(pathname, [item.path, ...(activePaths || [])])}
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

const ZeeveSidebarItem = ({
  item,
  pathname,
  activePaths,
}: {
  item: ZeeveSidebarItemProps;
  pathname: string;
  activePaths?: string[];
}) => {
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
      isActive={isActive(pathname, [item.path, ...(activePaths || [])])}
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
        <a href={`/`}>
          <Image
            src={withBasePath("/assets/images/perfuse-logo.svg")}
            alt="Zeeve Logo"
            width={64}
            height={64}
            className="size-64"
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
                            activePaths={item.activePaths}
                          />
                        );
                      })
                    : null}
                </SidebarItemGroup>
                {/* show divider only when there is next element in the list */}
                {/* {ITEMS[index + 1] ? <SidebarDivider /> : null} */}
              </Fragment>
            ))
          : null}
      </SidebarItems>
    </Sidebar>
  );
};

export default ZeeveSidebar;
