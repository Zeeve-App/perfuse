"use client";
import React from "react";
import RegisterParachainInfo from "../_components/register-parachain-info";
import GeneralInfo from "./general-info";
import Nodes from "./nodes";
import BlockchainConfig from "./blockchain-config";
import { NodeDbRow } from "@/db-queries";
import useApi from "@/api-client";
const Overview = ({
  createdAt,
  env,
  id,
  isLoading,
  name,
  nodes,
  paraId,
  relayCainType,
}: {
  isLoading: boolean;
  createdAt: string;
  env: string;
  name: string;
  id: string;
  paraId: string;
  relayCainType: string;
  nodes: NodeDbRow[];
}) => {
  const apis = useApi();
  const { data: blockRpcResponse } = apis.blockNumber();
  return (
    <div className="grid grid-cols-12 gap-3 text-brand-dark lg:gap-6">
      <RegisterParachainInfo show={parseInt(blockRpcResponse?.result.block.header.number ?? "0", 16) === 0} />
      <GeneralInfo isLoading={isLoading} createdAt={createdAt} env={env} name={name} id={id} />
      <BlockchainConfig isLoading={isLoading} paraId={paraId} relayChainType={relayCainType} />
      <Nodes isLoading={isLoading} nodes={nodes} />
      {/* <Alerts agentId={data?.data.generalInfo.agentId}  /> */}
    </div>
  );
};

export default Overview;
