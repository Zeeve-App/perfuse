"use client";
import React from "react";
import BlockchainConfig from "../../blockchain-config/blockchain-config";
import MyNodes from "../../my-nodes/my-nodes";
import Overview from "../../overview/overview";
import CloudInfra from "./cloud-infra/cloud-infra";
import ManageInvites from "./manage-invites/manage-invites";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@/lib/components/Tabs";

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
        {/* <TabPanel>
          <BlockchainConfig />
        </TabPanel>
        <TabPanel>
          <MyNodes />
        </TabPanel> */}
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
