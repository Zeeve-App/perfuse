"use client";

import React from "react";
import { ChainSpecFileType } from "@/types/chain-spec";
import { Heading } from "@/lib/components/Heading";
import KeyValuePair from "@/lib/components/utils/key-value-pair";

interface RelayChainConfigProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
  relayChain: { type: string | undefined; version: string | undefined };
}

const RelayChainConfig = ({ isLoading, relayChain }: RelayChainConfigProps) => {
  return (
    <div className="col-span-12 flex flex-col overflow-hidden rounded-lg border border-brand-outline 2xl:col-span-4">
      <div className="p-4">
        <Heading as="h4">Relay Chain Config</Heading>
      </div>
      <div className="grid grid-cols-12 gap-3 p-4 lg:gap-y-6">
        <KeyValuePair label={"Relay Chain Type"} value={relayChain.type ?? "NA"} isLoading={isLoading} />
        <KeyValuePair label={"Relay Chain Version"} value={relayChain.version ?? "NA"} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default RelayChainConfig;
