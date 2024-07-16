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
