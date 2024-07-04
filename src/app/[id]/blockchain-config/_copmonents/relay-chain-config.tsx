"use client";

import React from "react";
import { ChainSpecFileType } from "@/types/chain-spec";
import { Heading } from "@/lib/components/Heading";
import KeyValuePair from "@/lib/components/utils/key-value-pair";
import KeyValuePairInput from "@/lib/components/utils/key-value-pair-input";

interface RelayChainConfigProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
  relayChain: { type: string | undefined; version: string | undefined };
}

const RelayChainConfig = ({ isLoading, relayChain }: RelayChainConfigProps) => {
  return (
    <div className="col-span-12 flex flex-col gap-3 rounded-lg p-4 shadow-brand-shadow lg:col-span-6 lg:gap-6">
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        <Heading as="h4" className="col-span-12">
          Relay Chain Config
        </Heading>
      </div>
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        <KeyValuePairInput
          className="col-span-6"
          label={"Relay Chain Type"}
          value={relayChain.type ?? "NA"}
          isLoading={isLoading}
        />
        <KeyValuePairInput
          className="col-span-6"
          label={"Relay Chain Version"}
          value={relayChain.version ?? "NA"}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default RelayChainConfig;
