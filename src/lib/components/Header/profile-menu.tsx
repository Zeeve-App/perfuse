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
import { Fragment, useMemo } from "react";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { Avatar } from "../Avatar";
import { IconButton } from "../Button";
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuDivider,
  DropdownMenuGroup,
  DropdownMenuGroupTitle,
  DropdownMenuItem,
  DropdownMenuList,
} from "../DropdownMenu";
import { ZeeveHeaderDropdownMenu } from "../zeeve-header/Header";
import { withBasePath } from "@/utils/helpers";
import SvgProfile from "@/lib/icons/user/outline/Profile";
import { useToggle } from "@/hooks";
import SvgArrowLeftFromBucket from "@/lib/icons/arrows/outline/ArrowLeftFromBucket";

/** profile dropdown data to show in drop down */
export const getProfileDropdownData = (router: AppRouterInstance) => [
  {
    group: {
      items: [
        {
          icon: <SvgArrowLeftFromBucket />,
          title: "Logout",
          onClick: async () => {
            await axios.post("/api/logout");
            router.refresh();
          },
        },
      ],
    },
  },
];

/** profile dropdown menu component */
const ProfileDropDownMenu = ({
  user,
  className,
}: {
  user?: {
    email: string;
    firstName: string;
    lastName?: string;
  };
  className?: string;
}) => {
  const router = useRouter();
  // profile dropdown menu
  const profileDropdownMenu = useMemo<ZeeveHeaderDropdownMenu>(() => {
    return getProfileDropdownData(router);
  }, []);

  const {
    isOpen: isProfileDropdownOpen,
    handleToggle: handleProfileDropdownToggle,
    handleClose: handleProfileDropdownClose,
  } = useToggle();

  // user name
  const name = useMemo(() => {
    if (user?.firstName || user?.lastName) {
      return `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;
    }
  }, [user?.firstName, user?.lastName]);

  const email = user?.email;

  return (
    <DropdownMenu className={className} isOpen={isProfileDropdownOpen} onClose={handleProfileDropdownClose}>
      <DropdownMenuButton as={IconButton} variant="text" isRounded={true} onClick={handleProfileDropdownToggle}>
        {true ? (
          <>
            <div className="flex size-7  cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#6119F7] text-white">
              <SvgProfile className="size-3 " />
            </div>
            <span className="text-theme-primary-content">&nbsp; Demo</span>
          </>
        ) : (
          <>
            <Avatar src={withBasePath("/assets/images/avatar-placeholder.png")} />
            <span>Demo</span>
          </>
        )}
      </DropdownMenuButton>
      <DropdownMenuList className="flex flex-col md:min-w-[200px]">
        {name || email ? (
          <div className="flex flex-col px-3 py-1">
            {name ? (
              <p className="font-poppins text-sm font-semibold capitalize leading-4 text-theme-primary-content">
                {name}
              </p>
            ) : null}
            {email ? <p className="text-xs font-medium lowercase text-theme-primary-content">{email}</p> : null}
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
    </DropdownMenu>
  );
};
export { ProfileDropDownMenu };
