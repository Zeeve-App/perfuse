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
import { Heading } from "@/lib/components/Heading";
import CardKeyValuePair from "@/lib/components/utils/card-key-value-pair";
import useApi from "@/api-client";
import KeyValuePairInput from "@/lib/components/utils/key-value-pair-input";

const BlockchainConfig = ({
  paraId,
  relayChainType,
  isLoading,
}: {
  paraId?: string;
  relayChainType?: string;
  isLoading: boolean;
}) => {
  const apis = useApi();
  const { data: blockRpcResponse, isLoading: blockRpcLoading } = apis.blockNumber();

  return (
    <div className="col-span-6 flex flex-col gap-3 rounded-lg bg-theme-foreground p-4 shadow-brand-shadow lg:gap-6">
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        <div className="col-span-12 lg:col-span-6">
          <Heading as="h4">Blockchain Config</Heading>
        </div>
        {/* <Tooltip text={"Blockchain Config"} placement="top-start">
          <Link href={`/${networkId}/blockchain-config`}>
            <IconButton colorScheme="primary" variant={"ghost"} size={"small"}>
              <SvgArrowUpRightFromSquare className="text-xl" />
            </IconButton>
          </Link>
        </Tooltip> */}
      </div>
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        <div className="col-span-12 lg:col-span-6">
          <KeyValuePairInput
            label={"Parachain ID"}
            value={paraId ?? "NA"}
            className="col-span-12 md:col-span-6 xl:col-span-6"
            isLoading={isLoading}
          />
          <KeyValuePairInput
            label={"Relay Chain"}
            value={relayChainType ?? "NA"}
            className="col-span-12 md:col-span-6 xl:col-span-6"
            isLoading={isLoading}
          />
        </div>
        <CardKeyValuePair
          label={"Parachain Block Height"}
          value={parseInt(blockRpcResponse?.result.block.header.number ?? "0", 16)}
          isLoading={blockRpcLoading}
          className="col-span-12 h-full md:col-span-6 xl:col-span-6"
        />
      </div>
    </div>
  );
};

export default BlockchainConfig;
