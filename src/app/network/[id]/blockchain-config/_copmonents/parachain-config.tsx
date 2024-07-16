/**
* SPDX-License-Identifier: AGPL-3.0-or-later
* Copyright (C) 2024 [Perfuse]
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
* This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
