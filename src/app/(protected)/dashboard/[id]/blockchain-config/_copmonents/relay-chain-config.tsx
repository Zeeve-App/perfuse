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
import { ChainSpecFileType } from "@/types/chain-spec";
import { Heading } from "@/lib/components/Heading";
import KeyValuePairInput from "@/lib/components/utils/key-value-pair-input";
import { Card } from "@/lib/components/Card";
import { Typography } from "@/lib/components/Typography";
import KeyValuePair from "@/lib/components/utils/key-value-pair";

interface RelayChainConfigProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
  relayChain: { type: string | undefined; version: string | undefined };
}

const RelayChainConfig = ({ isLoading, relayChain }: RelayChainConfigProps) => {
  return (
    <Card className="col-span-12 overflow-y-auto rounded-lg shadow-brand-shadow">
      <Typography variant="subtitle" className="col-span-12">
        Relay Chain Configuration
      </Typography>
      <KeyValuePair
        className="col-span-6"
        label={"Relay Chain Type"}
        value={relayChain.type ?? "NA"}
        isLoading={isLoading}
      />
      <KeyValuePair
        className="col-span-6 text-right"
        label={"Relay Chain Version"}
        value={relayChain.version ?? "NA"}
        isLoading={isLoading}
      />
    </Card>
  );
};

export default RelayChainConfig;
