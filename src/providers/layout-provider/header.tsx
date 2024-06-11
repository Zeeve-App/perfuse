/* eslint-disable prettier/prettier */
"use client";
import React, { useMemo } from "react";
// import { IconSetting1 } from "@zeeve-platform/icons/setting/outline";
// import { IconUser } from "@zeeve-platform/icons/user/outline";
// import { ZeeveHeader, ZeeveHeaderDropdownMenu } from "@zeeve-platform/ui-common-components";
// import IconArrow2Down from "@/lib/icons/arrows/Icon-arrow-2-down";
import { ZeeveHeader, ZeeveHeaderDropdownMenu } from "@/lib/components/zeeve-header";
import SvgUser from "@/lib/icons/setting/outline/User";
import SvgSetting1 from "@/lib/icons/setting/outline/Setting1";
import SvgBook2 from "@/lib/icons/school/outline/Book2";
import SvgPhoneVolume from "@/lib/icons/phone/outline/PhoneVolume";
import SvgArrowLeftFromBucket from "@/lib/icons/arrows/outline/ArrowLeftFromBucket";
// import { IconArrowLeftFromBucket } from "@zeeve-platform/icons/arrow/outline";
// import { IconPhoneVolume } from "@zeeve-platform/icons/phone/outline";
// import { IconBook2 } from "@zeeve-platform/icons/school/outline";

interface HeaderProps {
  handleMobileSidebarOpen: () => void;
}

const Header = (props: HeaderProps) => {
  const { handleMobileSidebarOpen } = props;

  // profile dropdown menu
  const profileDropdownMenu = useMemo<ZeeveHeaderDropdownMenu>(() => {
    return [
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
              onClick: () => {
                // logout();
              },
            },
          ],
        },
      },
    ];
  }, []);

  return (
    <ZeeveHeader
      // createDropdownMenu={createDropdownMenu}
      profileDropdownMenu={profileDropdownMenu}
      onMenuButtonClick={handleMobileSidebarOpen}
      notificationsWSURL={undefined}
      accessToken={""}
      user={{
        firstName: "Profile",
        lastName: "User",
        email: "test@gmail.com",
      }}
    />
  );
};

export default Header;
