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
import { useToggle } from "@/hooks";
import { tx } from "@/utils/shared";
import { withBasePath } from "@/utils/helpers";
import SvgBars from "@/lib/icons/essential/outline/Bars";
import SvgPlusSquare from "@/lib/icons/essential/outline/PlusSquare";

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
  /** profile dropdown menu */
  profileDropdownMenu: ZeeveHeaderDropdownMenu;
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
  const {
    className,
    onMenuButtonClick,
    notificationsWSURL,
    accessToken,
    createDropdownMenu,
    profileDropdownMenu,
    user,
    subscriptionSummary,
    organizationDetails,
    ...rest
  } = props;

  const {
    isOpen: isCreateDropdownOpen,
    handleToggle: handleCreateDropdownToggle,
    handleClose: handleCreateDropdownClose,
  } = useToggle();

  const {
    isOpen: isProfileDropdownOpen,
    handleToggle: handleProfileDropdownToggle,
    handleClose: handleProfileDropdownClose,
  } = useToggle();

  const {
    isOpen: isNotificationDrawerOpen,
    handleOpen: handleNotificationDrawerOpen,
    handleClose: handleNotificationDrawerClose,
  } = useToggle();

  const _notificationsWSURL =
    typeof notificationsWSURL === "string" ? `${notificationsWSURL}?token=${accessToken}` : undefined;

  // user initials
  const initials = useMemo(() => {
    if (user?.firstName || user?.lastName) {
      return `${user?.firstName?.charAt(0).toUpperCase() ?? ""}${user?.lastName?.charAt(0).toUpperCase() ?? ""}`;
    }
  }, [user?.firstName, user?.lastName]);

  // user name
  const name = useMemo(() => {
    if (user?.firstName || user?.lastName) {
      return `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;
    }
  }, [user?.firstName, user?.lastName]);

  return (
    <Header className={tx("justify-between lg:justify-end", className)} {...rest}>
      {/* left side header section, visible only in mobile view */}
      <HeaderLogoContainer className="lg:hidden">
        {/* menu button */}
        <HeaderMenuButton onClick={onMenuButtonClick}>
          <SvgBars className="text-2xl" />
        </HeaderMenuButton>
        {/* logo */}
        <HeaderLogo
          logoImgSrc={withBasePath("/assets/images/zeeve-logo-on-light-bg.svg")}
          logoImgAlt="Zeeve Logo"
          logoHref="/"
        />
      </HeaderLogoContainer>

      {/* right side header nav */}
      <HeaderNavContainer>
        {/* organization dropdown */}
        {organizationDetails && (
          <ReactSelect
            options={[
              {
                label: "Organization",
                options: organizationDetails.options.map((e) => ({
                  label: e.name,
                  value: e.id,
                  role: e.role,
                })),
              },
            ]}
            placeholder="Organization"
            onChange={organizationDetails.onChange}
            className="w-28 md:w-64"
            size="small"
            value={{
              value: organizationDetails.organization.id,
              label: organizationDetails.organization.name,
              role: organizationDetails.organization.role,
            }}
          />
        )}
        {/* subscription summary */}
        {subscriptionSummary ? (
          <>
            <HeaderNavGroup className="hidden md:flex">
              <div className="flex-col items-start justify-center">
                <p className="text-xs text-brand-gray">{subscriptionSummary.label}</p>
                <p className="text-sm font-semibold text-brand-dark">{subscriptionSummary.price}</p>
              </div>
            </HeaderNavGroup>
            <HeaderDivider className="hidden md:block" />
          </>
        ) : null}
        <HeaderNavGroup>
          {/* Create Button */}
          {createDropdownMenu?.length ? (
            <DropdownMenu isOpen={isCreateDropdownOpen} onClose={handleCreateDropdownClose}>
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
          {/* Profile Dropdown */}
          <DropdownMenu isOpen={isProfileDropdownOpen} onClose={handleProfileDropdownClose}>
            <DropdownMenuButton as={IconButton} variant="text" isRounded={true} onClick={handleProfileDropdownToggle}>
              {initials ? (
                <>
                  <div className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-brand-cyan to-brand-teal text-white">
                    {initials}
                  </div>
                  <span className="text-brand-dark-blue">&nbsp; Demo</span>
                </>
              ) : (
                <>
                  <Avatar src={withBasePath("/assets/images/avatar-placeholder.svg")} />
                  <span>Demo</span>
                </>
              )}
            </DropdownMenuButton>
            <ProfileDropdownMenu profileDropdownMenu={profileDropdownMenu} name={name} email={user?.email} />
          </DropdownMenu>
          {/* Notifications */}
          <NotificationsWebSocketContextProvider url={_notificationsWSURL}>
            {/* Notifications bell */}
            <NotificationBell handleOpen={handleNotificationDrawerOpen} />
            {/* Notifications drawer */}
            <NotificationDrawer isOpen={isNotificationDrawerOpen} handleClose={handleNotificationDrawerClose} />
          </NotificationsWebSocketContextProvider>
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
    <DropdownMenuList className="flex flex-col md:min-w-[200px]">
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

interface ProfileDropdownMenuProps {
  profileDropdownMenu: ZeeveHeaderDropdownMenu;
  name?: string;
  email?: string;
}

const ProfileDropdownMenu = (props: ProfileDropdownMenuProps) => {
  const { profileDropdownMenu, name, email } = props;

  return (
    <DropdownMenuList className="flex flex-col md:min-w-[200px]">
      {name || email ? (
        <div className="flex flex-col px-3 py-1">
          {name ? (
            <p className="font-poppins text-sm font-semibold capitalize leading-4 text-brand-dark">{name}</p>
          ) : null}
          {email ? <p className="text-xs font-medium lowercase text-brand-gray">{email}</p> : null}
        </div>
      ) : null}
      {name || email ? <hr className="my-2" /> : null}
      {profileDropdownMenu.length
        ? profileDropdownMenu.map((menu, index) => (
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
              {profileDropdownMenu[index + 1] ? <DropdownMenuDivider /> : null}
            </Fragment>
          ))
        : null}
    </DropdownMenuList>
  );
};

export type { ZeeveHeaderProps, ZeeveHeaderDropdownMenu };
export { ZeeveHeader };
