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
import Image from "next/image";
import { withBasePath } from "@/utils/helpers";
import { ChainSpecFileType } from "@/types/chain-spec";
import KeyValuePair from "@/lib/components/utils/key-value-pair";
import { Card } from "@/lib/components/Card";
import { Typography } from "@/lib/components/Typography";
interface ParachainConfigProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
}

const ParachainConfig = ({ data, isLoading }: ParachainConfigProps) => {
  return (
    <Card
      variant={"default"}
      className="relative col-span-12 gap-3 rounded-lg p-4 pb-36 lg:col-span-6 lg:gap-6 lg:pb-28"
    >
      <Typography variant="subtitle" className="col-span-12">
        Parachain Config
      </Typography>
      <KeyValuePair className="col-span-6" label={"Parachain Name"} value={data?.name ?? "NA"} isLoading={isLoading} />
      <KeyValuePair
        className="col-span-6 text-right"
        label={"Parachain ID"}
        value={data?.para_id ?? "NA"}
        isLoading={isLoading}
      />
      <KeyValuePair className="col-span-6" label={"Network ID"} value={data?.id ?? "NA"} isLoading={isLoading} />
      <KeyValuePair
        className="col-span-6 text-right"
        label={"Chain Type"}
        value={data?.chainType ?? "NA"}
        isLoading={isLoading}
      />
      <KeyValuePair
        className="col-span-6"
        label={"Protocol ID"}
        value={data?.protocolId ?? "NA"}
        isLoading={isLoading}
      />
      <KeyValuePair
        className="col-span-6 text-right"
        label={"Telemetry Endpoint"}
        value={data?.telemetryEndpoints ?? "NA"}
        isLoading={isLoading}
      />
      <Image
        className="absolute bottom-0 right-0 col-span-12 w-48 md:col-span-6"
        src={withBasePath("/assets/images/dashboard/vertical-card.png")}
        alt={`Card Thumvnail`}
        width={300}
        height={300}
      />
    </Card>
  );
};

export default ParachainConfig;
