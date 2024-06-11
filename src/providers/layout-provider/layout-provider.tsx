/* eslint-disable prettier/prettier */
"use client";
import React from "react";
// import { Layout, LayoutRightSection, LayoutMainSection } from "@zeeve-platform/ui-common-components";
import Header from "./header";
import Sidebar from "./sidebar";
import { useToggle } from "@/hooks";
import { Layout, LayoutMainSection, LayoutRightSection } from "@/lib/components/Layout";

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
      <Sidebar isMobileSidebarOpen={isMobileSidebarOpen} handleMobileSidebarClose={handleMobileSidebarClose} />
      <LayoutRightSection>
        <Header handleMobileSidebarOpen={handleMobileSidebarOpen} />
        <LayoutMainSection>{children}</LayoutMainSection>
      </LayoutRightSection>
    </Layout>
  );
};

export default LayoutProvider;
