"use client";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@zeeve-platform/ui";
import React from "react";
import Overview from "./overview/overview";
import BlockchainConfig from "../../blockchain-config/blockchain-config";
import CloudInfra from "./cloud-infra/cloud-infra";
import ManageInvites from "./manage-invites/manage-invites";
import MyNodes from "../../my-nodes/my-nodes";

const IdPageTabs = () => {
  return (
    <Tabs orientation="horizontal" className="rounded-none border-none">
      <TabList className="mb-4 gap-4 overflow-x-auto border-0">
        <Tab>Overview</Tab>
        <Tab>Blockchain Config</Tab>
        <Tab>My Nodes</Tab>
        <Tab>Cloud Infra</Tab>
        <Tab>Manage Invites</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Overview />
        </TabPanel>
        <TabPanel>
          <BlockchainConfig />
        </TabPanel>
        <TabPanel>
          <MyNodes />
        </TabPanel>
        <TabPanel>
          <CloudInfra />
        </TabPanel>
        <TabPanel>
          <ManageInvites />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default IdPageTabs;
