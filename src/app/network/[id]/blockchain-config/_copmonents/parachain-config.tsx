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
    <div className="col-span-12 flex flex-col gap-3 rounded-lg p-4 shadow-brand-shadow lg:gap-6">
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        <Heading as="h4" className="col-span-12">
          Parachain Config
        </Heading>
      </div>
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        <div className="col-span-12 flex flex-col border-0 2xl:border-r">
          <div className="grid grid-cols-12 gap-3 lg:gap-6">
            <KeyValuePairInput
              className="col-span-3"
              label={"Parachain Name"}
              value={data?.name ?? "NA"}
              isLoading={isLoading}
            />
            <KeyValuePairInput
              className="col-span-3"
              label={"Parachain ID"}
              value={data?.para_id ?? "NA"}
              isLoading={isLoading}
            />
            <KeyValuePairInput
              className="col-span-3"
              label={"Network ID"}
              value={data?.id ?? "NA"}
              isLoading={isLoading}
            />
            <KeyValuePairInput
              className="col-span-3"
              label={"Chain Type"}
              value={data?.chainType ?? "NA"}
              isLoading={isLoading}
            />
            <KeyValuePairInput
              className="col-span-3"
              label={"Protocol ID"}
              value={data?.protocolId ?? "NA"}
              isLoading={isLoading}
            />
            <KeyValuePairInput
              className="col-span-3"
              label={"Telemetry Endpoint"}
              value={data?.telemetryEndpoints ?? "NA"}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParachainConfig;
