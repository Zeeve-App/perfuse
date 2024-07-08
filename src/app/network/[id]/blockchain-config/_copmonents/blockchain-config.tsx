"use client";

import React from "react";
import RegisterParachainInfo from "../../_components/register-parachain-info";
import ParachainSpecFile from "./parachain-spec-file";
import ParachainConfig from "./parachain-config";
import Parameters from "./parameters";
import PreMiningConfig from "./pre-minting-config";
import RelayChainConfig from "./relay-chain-config";
import TokenInfo from "./token-info";
import { ChainSpecFileType } from "@/types/chain-spec";
import useApi from "@/api-client";

const BlockchainConfig = ({
  chainSpecJSON,
  relayChain,
}: {
  chainSpecJSON: ChainSpecFileType;
  relayChain: { type: string | undefined; version: string | undefined };
}) => {
  const isLoading = false;

  const apis = useApi();
  const { data: blockRpcResponse, isLoading: blockRpcLoading } = apis.blockNumber();
  const blockHeight = parseInt(blockRpcResponse?.result.block.header.number ?? "0", 16);

  return (
    <div className="grid grid-cols-12 gap-3 text-brand-dark lg:gap-6">
      <RegisterParachainInfo show={blockHeight === 0} />
      <Parameters isLoading={isLoading || blockRpcLoading} data={chainSpecJSON} blockHeight={blockHeight} />
      <ParachainConfig isLoading={isLoading} data={chainSpecJSON} />
      <TokenInfo isLoading={isLoading} data={chainSpecJSON} />
      <ParachainSpecFile isLoading={isLoading} data={chainSpecJSON} />
      <PreMiningConfig isLoading={isLoading} data={chainSpecJSON} />
      <RelayChainConfig
        isLoading={isLoading}
        relayChain={{
          type: relayChain.type,
          version: relayChain.version,
        }}
      />
    </div>
  );
};

export default BlockchainConfig;
