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
import React from "react";
import { useToggle } from "@/hooks";
import { Layout, LayoutMainSection, LayoutRightSection } from "@/lib/components/Layout";
import { ZeeveHeader } from "@/lib/components/zeeve-header";
import { SideDrawer, SideDrawerContent, SideDrawerOverlay } from "@/lib/components/SideDrawer";
import ZeeveSidebar from "@/lib/components/sidebar/sidebar";

/**
 * Setup global layout for the application.
 */
const LayoutProvider = (props: React.PropsWithChildren) => {
  const { children } = props;

  // mobile sidebar states
  const {
    isOpen: isMobileSidebarOpen,
    handleOpen: handleMobileSidebarOpen,
    handleClose: handleMobileSidebarClose,
  } = useToggle(false);


  return (
    <Layout>
      {
        <>
          <SideDrawer isOpen={isMobileSidebarOpen} handleClose={handleMobileSidebarClose} placement="left">
            <SideDrawerOverlay />
            <SideDrawerContent
              focusLockProps={{
                disabled: true,
              }}
              className="w-4/5  md:w-72 xl:hidden"
            >
              <div className="size-full " title="mobile sidebar">
                <ZeeveSidebar handleClose={handleMobileSidebarClose} />
              </div>
            </SideDrawerContent>
          </SideDrawer>
          <LayoutRightSection>
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
            <LayoutMainSection>{children}</LayoutMainSection>
          </LayoutRightSection>
        </>
      }
    </Layout>
  );
};

export default LayoutProvider;
