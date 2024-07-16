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
import { SideDrawerOverlay, SideDrawerContent, SideDrawer } from "@/lib/components/SideDrawer";
import ZeeveSidebar from "@/lib/components/sidebar/sidebar";
// import { SideDrawer, SideDrawerOverlay, SideDrawerContent } from "@zeeve-platform/ui";

interface SidebarProps {
  isMobileSidebarOpen: boolean;
  handleMobileSidebarClose: () => void;
}

const Sidebar = (props: SidebarProps) => {
  const { isMobileSidebarOpen, handleMobileSidebarClose } = props;

  return (
    <>
      {/* sidebar */}
      <div className="hidden lg:block lg:w-72" title="sidebar">
        <ZeeveSidebar />
      </div>
      {/* mobile sidebar*/}
      <SideDrawer isOpen={isMobileSidebarOpen} handleClose={handleMobileSidebarClose} placement="left">
        <SideDrawerOverlay />
        <SideDrawerContent
          focusLockProps={{
            disabled: true,
          }}
          className="w-4/5  md:w-72 lg:hidden"
        >
          <div className="size-full " title="mobile sidebar">
            <ZeeveSidebar />
          </div>
        </SideDrawerContent>
      </SideDrawer>
    </>
  );
};

export default Sidebar;
