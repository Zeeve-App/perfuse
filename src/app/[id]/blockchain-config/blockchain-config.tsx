"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RegisterParachainInfo from "../_components/register-parachain-info";
import ParachainSpecFile from "./parachain-spec-file";
import ParachainConfig from "./parachain-config";
import Parameters from "./parameters";
import PreMiningConfig from "./pre-minting-config";
import RelayChainConfig from "./relay-chain-config";
import { ChainSpecFileType } from "@/types/chain-spec";

const BlockchainConfig = ({ chainSpecJSON }: { chainSpecJSON: ChainSpecFileType }) => {
  // const params = useParams();
  // const networkId = params.id as string;
  // const [chainSpecJSON, setChainSpecJSON] = useState<ChainSpecFileType | undefined>();
  // const [isLoading, setIsLoading] = useState(true);
  const isLoading = false;

  return (
    <div className="grid grid-cols-12 gap-3 text-brand-dark lg:gap-6">
      <RegisterParachainInfo />
      <ParachainConfig isLoading={isLoading} data={chainSpecJSON} />
      <Parameters isLoading={isLoading} data={chainSpecJSON} />
      <ParachainSpecFile isLoading={isLoading} data={chainSpecJSON} />
      <PreMiningConfig isLoading={isLoading} data={chainSpecJSON} />
      <RelayChainConfig isLoading={isLoading} data={chainSpecJSON} />
    </div>
  );
};

export default BlockchainConfig;
