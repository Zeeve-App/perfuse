"use client";
import { useEffect, useState } from "react";
import RegisterParachainInfo from "../_components/register-parachain-info";
import NodeTable from "./node-table";
import { useWindowDimensions } from "@/hooks";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@/lib/components/Tabs";
import { NodeDbRow } from "@/db-queries";

const MyNodes = ({ nodes }: { nodes: { collator: NodeDbRow[]; rpc: NodeDbRow[] } }) => {
  // set config tabs orientation
  const [configTabsOrientation, setConfigTabsOrientation] = useState<"horizontal" | "vertical">("vertical");
  const windowSize = useWindowDimensions();
  useEffect(() => {
    if (typeof windowSize.width === "number" && windowSize.width >= 1024) {
      setConfigTabsOrientation("vertical");
    } else {
      setConfigTabsOrientation("horizontal");
    }
  }, [windowSize]);
  return (
    <div className="flex flex-col gap-3 lg:gap-6">
      <RegisterParachainInfo />
      <Tabs orientation={configTabsOrientation}>
        <TabList>
          <Tab className="border-transparent focus:border-transparent">Collator Nodes</Tab>
          <Tab className="border-transparent focus:border-transparent">RPC Nodes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <NodeTable nodeType={"collator"} heading="Collator Nodes" nodes={nodes.collator} />
          </TabPanel>
          <TabPanel>
            <NodeTable nodeType={"rpc"} heading="RPC Nodes" nodes={nodes.rpc} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default MyNodes;
