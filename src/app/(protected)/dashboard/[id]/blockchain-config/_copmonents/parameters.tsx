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

import React, { useEffect, useState } from "react";
import { ChainSpecFileType } from "@/types/chain-spec";
import { formateNumber } from "@/utils/helpers";
import { TOKEN_COLOR_CLASS } from "@/constants/token";
// import useParachainsService from "@/services/parachains/use-parachains-service";
import { Heading } from "@/lib/components/Heading";
import { Tooltip } from "@/lib/components/Tooltip";
import CardKeyValuePair from "@/lib/components/utils/card-key-value-pair";
import { tx } from "@/utils/shared";

interface ParametersProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
  blockHeight: number;
}
const Parameters = ({ data, isLoading, blockHeight }: ParametersProps) => {
  // const networkId = params.id as string;
  const [tokenSupply, setTokenSupply] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (data?.genesis?.runtime?.balances?.balances || data?.genesis.runtimeGenesis?.patch.balances.balances) {
      const balances =
        data.genesis.runtime?.balances.balances ?? data?.genesis.runtimeGenesis?.patch.balances.balances ?? [];
      let tokenSupplyCounter = 0;
      balances.map((balance) => {
        tokenSupplyCounter += typeof balance[1] === "string" ? parseFloat(balance[1]) : balance[1];
      });
      setTokenSupply(tokenSupplyCounter);
    }
  }, [data?.genesis.runtime?.balances.balances, data?.genesis.runtimeGenesis?.patch.balances.balances]);

  return (
    <div className="col-span-12 flex flex-col">
      <div className="grid grid-cols-12 gap-3 lg:gap-y-6">
        <div className="col-span-12 lg:col-span-6">
          <CardKeyValuePair
            label={"Parchain Block Height"}
            value={blockHeight}
            className="bg-theme-purple-gradient lg:p-7"
            isLoading={isLoading}
          />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <CardKeyValuePair
            label={"Total Token Supply"}
            value={
              <Heading className="font-semibold text-brand-light" as="h2">
                {tokenSupply ? (
                  <Tooltip
                    text={`${formateNumber(tokenSupply, "standard")} ${data?.properties?.tokenSymbol}`}
                    placement={"top-start"}
                  >
                    <div>
                      {formateNumber(tokenSupply)}{" "}
                      <span className={tx("text-xl")}>{data?.properties?.tokenSymbol}</span>
                    </div>
                  </Tooltip>
                ) : (
                  "NA"
                )}
              </Heading>
            }
            className="bg-theme-gradient lg:p-7"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Parameters;
