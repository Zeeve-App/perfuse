import { Fragment, useMemo } from "react";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import router from "next/router";
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
import SvgPhoneVolume from "@/lib/icons/phone/outline/PhoneVolume";
import SvgBook2 from "@/lib/icons/school/outline/Book2";
import SvgSetting1 from "@/lib/icons/setting/outline/Setting1";
import SvgUser from "@/lib/icons/setting/outline/User";

export const getProfileDropdownData = (router: AppRouterInstance) => [
  {
    group: {
      items: [
        {
          icon: <SvgUser />,
          title: "Profile",
          onClick: () => {
            window.open(`#`, "_self");
          },
        },
        {
          icon: <SvgSetting1 />,
          title: "Settings",
          onClick: () => {
            window.open(`#`, "_self");
          },
        },
        {
          icon: <SvgPhoneVolume />,
          title: "Helpdesk",
          onClick: () => {
            window.open("#", "_self");
          },
        },
        {
          icon: <SvgBook2 />,
          title: "Documentation",
          onClick: () => {
            window.open("#", "_self");
          },
        },
      ],
    },
  },
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
    </DropdownMenu>
  );
};
export { ProfileDropDownMenu };
