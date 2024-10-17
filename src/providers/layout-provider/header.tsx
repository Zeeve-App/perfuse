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

/* eslint-disable prettier/prettier */
"use client";
import React, { useMemo } from "react";
// import { IconSetting1 } from "@zeeve-platform/icons/setting/outline";
// import { IconUser } from "@zeeve-platform/icons/user/outline";
// import { ZeeveHeader, ZeeveHeaderDropdownMenu } from "@zeeve-platform/ui-common-components";
// import IconArrow2Down from "@/lib/icons/arrows/Icon-arrow-2-down";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ZeeveHeader } from "@/lib/components/zeeve-header";
// import { IconArrowLeftFromBucket } from "@zeeve-platform/icons/arrow/outline";
// import { IconPhoneVolume } from "@zeeve-platform/icons/phone/outline";
// import { IconBook2 } from "@zeeve-platform/icons/school/outline";


interface HeaderProps {
  handleMobileSidebarOpen: () => void;
}

const Header = (props: HeaderProps) => {
  const { handleMobileSidebarOpen } = props;

  const router = useRouter();

 

  return (
    <ZeeveHeader
      // createDropdownMenu={createDropdownMenu}
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
