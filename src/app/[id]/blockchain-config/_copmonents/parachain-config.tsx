"use client";

import React from "react";
import { formateNumber, toShortString } from "@/utils/helpers";
import { ChainSpecFileType } from "@/types/chain-spec";
import { TOKEN_COLOR_CLASS } from "@/constants/token";
import { Heading } from "@/lib/components/Heading";
import { CopyButton } from "@/lib/components/Button";
import { Tooltip } from "@/lib/components/Tooltip";
import KeyValuePair from "@/lib/components/utils/key-value-pair";
import { tx } from "@/utils/shared";
import KeyValuePairInput from "@/lib/components/utils/key-value-pair-input";
interface ParachainConfigProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
}

const ParachainConfig = ({ data, isLoading }: ParachainConfigProps) => {
  return (
    <div className="shadow-brand-shadow col-span-12 flex flex-col rounded-lg">
      <div className="p-4">
        <Heading as="h4">Parachain Config</Heading>
      </div>
      <div className="grid grid-cols-12 gap-3 lg:gap-y-6">
        <div className="col-span-12 flex flex-col border-0 2xl:border-r">
          <div className="grid grid-cols-12 gap-3 p-4 lg:gap-y-6">
            <KeyValuePairInput label={"Parachain Name"} value={data?.name ?? "NA"} isLoading={isLoading} />
            <KeyValuePairInput label={"Parachain ID"} value={data?.para_id ?? "NA"} isLoading={isLoading} />
            <KeyValuePairInput label={"Network ID"} value={data?.id ?? "NA"} isLoading={isLoading} />
            <KeyValuePairInput label={"Chain Type"} value={data?.chainType ?? "NA"} isLoading={isLoading} />
            <KeyValuePairInput label={"Protocol ID"} value={data?.protocolId ?? "NA"} isLoading={isLoading} />
            <KeyValuePairInput
              label={"Telemetry Endpoint"}
              value={data?.telemetryEndpoints ?? "NA"}
              isLoading={isLoading}
            />
          </div>
          <hr className="border-brand-outline" />
        </div>
        <div className="col-span-12 flex flex-col">
          <div className="px-4">
            <Heading as="h5">Token Info</Heading>
          </div>
          <div className="grid grid-cols-12 gap-3 p-4 lg:gap-y-6">
            <KeyValuePairInput label={"Name"} value={data?.properties?.tokenSymbol ?? "NA"} isLoading={isLoading} />
            <KeyValuePairInput
              label={"Decimal"}
              value={data?.properties?.tokenDecimals ?? "NA"}
              isLoading={isLoading}
            />
            <KeyValuePairInput
              label={"Encoding"}
              value={data?.properties ? "ss58Format" : "NA"}
              isLoading={isLoading}
            />
            <KeyValuePairInput
              label={"Candidacy Bond"}
              value={
                data?.genesis.runtime?.collatorSelection?.candidacyBond
                  ? formateNumber(data.genesis.runtime.collatorSelection.candidacyBond, "standard")
                  : "NA"
              }
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParachainConfig;
