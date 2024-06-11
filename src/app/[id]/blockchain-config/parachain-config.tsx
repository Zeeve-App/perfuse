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
interface ParachainConfigProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
}

const ParachainConfig = ({ data, isLoading }: ParachainConfigProps) => {
  return (
    <div className="col-span-12 flex flex-col rounded-lg border border-brand-outline 2xl:col-span-9">
      <div className="p-4">
        <Heading as="h4">Parachain Config</Heading>
      </div>
      <div className="grid grid-cols-12 gap-3 lg:gap-y-6">
        <div className="col-span-12 flex flex-col border-0 lg:col-span-6 2xl:col-span-6 2xl:border-r">
          <div className="grid grid-cols-12 gap-3 p-4 lg:gap-y-6">
            <KeyValuePair label={"Parachain Name"} value={data?.name ?? "NA"} isLoading={isLoading} />
            <KeyValuePair label={"Parachain ID"} value={data?.para_id ?? "NA"} isLoading={isLoading} />
            <KeyValuePair label={"Network ID"} value={data?.id ?? "NA"} isLoading={isLoading} />
            <KeyValuePair label={"Chain Type"} value={data?.chainType ?? "NA"} isLoading={isLoading} />
            <KeyValuePair label={"Protocol ID"} value={data?.protocolId ?? "NA"} isLoading={isLoading} />
            <KeyValuePair
              label={"Telemetry Endpoint"}
              value={
                data?.telemetryEndpoints ? (
                  <Tooltip text={data.telemetryEndpoints} placement={"top-start"}>
                    <div className="flex items-center gap-2">
                      {toShortString(data.telemetryEndpoints)}
                      <CopyButton text={data.telemetryEndpoints} />
                    </div>
                  </Tooltip>
                ) : (
                  "NA"
                )
              }
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="col-span-12 flex flex-col lg:col-span-6 2xl:col-span-6">
          <div className="px-4">
            <Heading as="h5">Token Info</Heading>
          </div>
          <div className="grid grid-cols-12 gap-3 p-4 lg:gap-y-6">
            <KeyValuePair
              label={"Name"}
              value={
                data?.properties?.tokenSymbol ? (
                  <span className={tx(TOKEN_COLOR_CLASS)}>{data?.properties?.tokenSymbol}</span>
                ) : (
                  "NA"
                )
              }
              isLoading={isLoading}
            />
            <KeyValuePair label={"Decimal"} value={data?.properties?.tokenDecimals ?? "NA"} isLoading={isLoading} />
            <KeyValuePair label={"Encoding"} value={data?.properties ? "ss58Format" : "NA"} isLoading={isLoading} />
            <KeyValuePair
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
