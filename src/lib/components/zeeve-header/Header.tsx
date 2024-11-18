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

import React, { Fragment, useMemo } from "react";
// import { IconBars, IconPlusSquare } from "@zeeve-platform/icons/essential/outline";
// import {
//     Avatar,
//     Button,
//     DropdownMenu,
//     DropdownMenuButton,
//     DropdownMenuDivider,
//     DropdownMenuGroup,
//     DropdownMenuGroupTitle,
//     DropdownMenuItem,
//     DropdownMenuList,
//     Header,
//     HeaderDivider,
//     HeaderLogo,
//     HeaderLogoContainer,
//     HeaderMenuButton,
//     HeaderNavContainer,
//     HeaderNavGroup,
//     HeaderProps,
//     IconButton,
//     tx,
//     useToggle,
// } from "../";
// import Logo from "../../assets/brand/zeeve-logo-on-light-bg.svg";

// import AvatarPlaceholderImage from "../../assets/brand/avatar-placeholder.svg";
import { usePathname } from "next/navigation";
import { NotificationBell, NotificationsWebSocketContextProvider, NotificationDrawer } from "../NotificationDrawer";
// import { ActionMeta, ReactSelect } from "..";
import { Button, IconButton } from "../Button";
import {
  HeaderProps,
  Header,
  HeaderLogoContainer,
  HeaderMenuButton,
  HeaderLogo,
  HeaderNavContainer,
  HeaderNavGroup,
  HeaderDivider,
} from "../Header";
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuList,
  DropdownMenuGroup,
  DropdownMenuGroupTitle,
  DropdownMenuItem,
  DropdownMenuDivider,
} from "../DropdownMenu";
import { ActionMeta, ReactSelect } from "../ReactSelect";
import { Avatar } from "../Avatar";
import { SidebarItems } from "../sidebar/sub-components";
import { ZeeveSidebarItem } from "../sidebar/sidebar";
import { ProfileDropDownMenu } from "../Header/profile-menu";
import BalanceChecker from "../wallet/balance";
import { useToggle } from "@/hooks";
import { tx } from "@/utils/shared";
import { withBasePath } from "@/utils/helpers";
import SvgBars from "@/lib/icons/essential/outline/Bars";
import SvgPlusSquare from "@/lib/icons/essential/outline/PlusSquare";
import SvgBubbles from "@/lib/icons/essential/outline/Bubbles";
import { ITEMS } from "@/constants/sidebar";
import SvgProfile from "@/lib/icons/user/outline/Profile";
import useDarkMode from "@/hooks/use-dark-mode";
import SvgMoon from "@/lib/icons/essential/outline/moon";

interface ZeeveHeaderDropdownMenuItem {
  icon: React.ReactElement;
  title: string;
  onClick: () => void;
}

type ZeeveHeaderDropdownMenu = {
  group: {
    title?: string;
    items: ZeeveHeaderDropdownMenuItem[];
  };
}[];

interface ZeeveHeaderProps extends HeaderProps {
  /** action to perform when menu button is clicked, visible only in mobile view */
  onMenuButtonClick: () => void;
  /** websocket url of notifications service (pass undefined if developing on local) */
  notificationsWSURL: string | undefined;
  /** access token (pass empty string if developing on local)*/
  accessToken: string;
  /** create dropdown menu */
  createDropdownMenu?: ZeeveHeaderDropdownMenu;
  /** user info */
  user?: {
    email: string;
    firstName: string;
    lastName?: string;
  };
  /** subscription summary to show, visible only in medium screens and above */
  subscriptionSummary?: {
    /** label */
    label: string;
    /** price with currency symbol (example: $25,000) */
    price: string;
  };
  organizationDetails?: {
    organization: { id: string; name: string; role: string };
    onChange: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
    options: { id: string; name: string; role: string }[];
  };
}

const ZeeveHeader = (props: ZeeveHeaderProps & HeaderProps) => {
  const { theme, toggleTheme } = useDarkMode();

  const { className, onMenuButtonClick, notificationsWSURL, accessToken, createDropdownMenu, ...rest } = props;

  const {
    isOpen: isCreateDropdownOpen,
    handleToggle: handleCreateDropdownToggle,
    handleClose: handleCreateDropdownClose,
  } = useToggle();

  const {
    isOpen: isNotificationDrawerOpen,
    handleOpen: handleNotificationDrawerOpen,
    handleClose: handleNotificationDrawerClose,
  } = useToggle();
  const pathname = usePathname();

  const _notificationsWSURL =
    typeof notificationsWSURL === "string" ? `${notificationsWSURL}?token=${accessToken}` : undefined;

  return (
    <Header className={tx("justify-between", className)} {...rest}>
      {/* left side header section, visible only in mobile view */}
      <HeaderLogoContainer>
        {/* menu button */}
        <HeaderMenuButton className="text-theme-primary-content xl:hidden" variant={"text"} onClick={onMenuButtonClick}>
          <SvgBars className=" text-2xl " />
        </HeaderMenuButton>
        {/* logo */}
        <HeaderLogo
          logoImgSrc={withBasePath("/assets/images/perfuse-no-bg.svg")}
          logoImgAlt="Zeeve Logo"
          logoImgClassName="size-30 "
          logoHref="/"
          className=""
        />
      </HeaderLogoContainer>

      <SidebarItems className="hidden grow items-center gap-3 align-middle xl:flex xl:flex-row">
        {ITEMS.length
          ? ITEMS.map((itemGroup, index) => (
              <Fragment key={index}>
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
                {/* show divider only when there is next element in the list */}
                {/* {ITEMS[index + 1] ? <SidebarDivider /> : null} */}
              </Fragment>
            ))
          : null}
      </SidebarItems>

      {/* right side header nav */}
      <HeaderNavContainer>
        <HeaderNavGroup>
          <BalanceChecker />
          <IconButton
            variant={"text"}
            className="hidden size-10 rounded-full  bg-theme-foreground xl:flex"
            onClick={() => toggleTheme()}
          >
            {theme === "dark" ? <SvgMoon fontSize={20} /> : <SvgMoon fontSize={24} />}
          </IconButton>
          {/* Notifications */}
          <NotificationsWebSocketContextProvider url={_notificationsWSURL}>
            {/* Notifications bell */}
            {/* <NotificationBell handleOpen={handleNotificationDrawerOpen} /> */}
            {/* Notifications drawer */}
            <NotificationDrawer isOpen={isNotificationDrawerOpen} handleClose={handleNotificationDrawerClose} />
          </NotificationsWebSocketContextProvider>
          {/* Create Button */}
          {createDropdownMenu?.length ? (
            <DropdownMenu
              className="hidden xl:inline"
              isOpen={isCreateDropdownOpen}
              onClose={handleCreateDropdownClose}
            >
              <DropdownMenuButton
                as={Button}
                colorScheme="blue"
                iconRight={<SvgPlusSquare className="text-lg" />}
                onClick={handleCreateDropdownToggle}
              >
                Create
              </DropdownMenuButton>
              <CreateDropdownMenu createDropdownMenu={createDropdownMenu} />
            </DropdownMenu>
          ) : null}
          <ProfileDropDownMenu className="hidden xl:inline" />
        </HeaderNavGroup>
      </HeaderNavContainer>
    </Header>
  );
};

interface CreateDropdownMenuProps {
  createDropdownMenu: ZeeveHeaderDropdownMenu;
}

const CreateDropdownMenu = (props: CreateDropdownMenuProps) => {
  const { createDropdownMenu } = props;

  return (
    <DropdownMenuList className="flex flex-col xl:min-w-[200px]">
      {createDropdownMenu.length
        ? createDropdownMenu.map((menu, index) => (
            <Fragment key={index}>
              {menu.group ? (
                <DropdownMenuGroup>
                  {menu.group.title ? <DropdownMenuGroupTitle>{menu.group.title}</DropdownMenuGroupTitle> : null}
                  {menu.group.items.length
                    ? menu.group.items.map((item, idx) => (
                        <DropdownMenuItem key={idx} iconLeft={item.icon} onClick={item.onClick}>
                          {item.title}
                        </DropdownMenuItem>
                      ))
                    : null}
                </DropdownMenuGroup>
              ) : null}
              {/* show menu divider only when there is next element in the list */}
              {createDropdownMenu[index + 1] ? <DropdownMenuDivider /> : null}
            </Fragment>
          ))
        : null}
    </DropdownMenuList>
  );
};

export type { ZeeveHeaderProps, ZeeveHeaderDropdownMenu };
export { ZeeveHeader };
