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
