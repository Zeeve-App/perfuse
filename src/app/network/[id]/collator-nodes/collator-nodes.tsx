"use client";
import RegisterParachainInfo from "../_components/register-parachain-info";
import NodeTable from "../_components/node-table";
import { NodeDbRow } from "@/db-queries";
import useApi from "@/api-client";

const CollatorNodes = ({ nodes }: { nodes: { collator: NodeDbRow[] } }) => {
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
