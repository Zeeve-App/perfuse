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

import Image from "next/image";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { Typography } from "@/lib/components/Typography";
import KeyValuePair from "@/lib/components/utils/key-value-pair";
import { ChainSpecFileType } from "@/types/chain-spec";
import { formateNumber, withBasePath } from "@/utils/helpers";

interface ParachainConfigProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
}

const TokenInfo = ({ data, isLoading }: ParachainConfigProps) => {
  return (
    <Card
      variant={"default"}
      className="relative col-span-12 gap-3 rounded-lg p-4 pb-36 lg:col-span-6 lg:gap-6 lg:pb-28"
    >
      <Typography variant="subtitle" className="col-span-12">
        Token Info
      </Typography>
      <KeyValuePair
        className="col-span-6"
        label={"Name"}
        value={data?.properties?.tokenSymbol ?? "NA"}
        isLoading={isLoading}
      />
      <KeyValuePair
        className="col-span-6 text-right"
        label={"Decimal"}
        value={data?.properties?.tokenDecimals ?? "NA"}
        isLoading={isLoading}
      />
      <KeyValuePair
        className="col-span-6"
        label={"Encoding"}
        value={data?.properties ? "ss58Format" : "NA"}
        isLoading={isLoading}
      />
      <KeyValuePair
        className="col-span-6 text-right"
        label={"Candidacy Bond"}
        value={
          data?.genesis.runtime?.collatorSelection?.candidacyBond
            ? formateNumber(data.genesis.runtime.collatorSelection.candidacyBond, "standard")
            : "NA"
        }
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
        alt={`Card Thumbnail`}
        width={300}
        height={300}
      />
    </Card>
  );
};

export default TokenInfo;
