"use client";
import { useEffect, useState } from "react";
import RegisterParachainInfo from "../_components/register-parachain-info";
import NodeTable from "../_components/node-table";
import { useWindowDimensions } from "@/hooks";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@/lib/components/Tabs";
import { NodeDbRow } from "@/db-queries";
import useApi from "@/api-client";

const CollatorNodes = ({ nodes }: { nodes: { collator: NodeDbRow[] } }) => {
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

  const apis = useApi();
  const { data: blockRpcResponse } = apis.blockNumber();
  const blockHeight = parseInt(blockRpcResponse?.result.block.header.number ?? "0", 16);

  return (
    <div className="flex flex-col gap-3 lg:gap-6">
      <RegisterParachainInfo show={blockHeight === 0} />
      <NodeTable nodeType={"collator"} heading="Collator Nodes" nodes={nodes.collator} />
    </div>
  );
};

export default CollatorNodes;
