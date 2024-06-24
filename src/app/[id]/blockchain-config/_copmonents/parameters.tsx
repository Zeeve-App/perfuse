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
    <div className="col-span-12 flex flex-col 2xl:col-span-3">
      <div className="grid grid-cols-12 gap-3 lg:gap-y-6">
        <div className="col-span-12 lg:col-span-6 2xl:col-span-12">
          <CardKeyValuePair
            label={"Parchain Block Height"}
            value={blockHeight}
            className="lg:p-7"
            isLoading={isLoading}
          />
        </div>
        <div className="col-span-12 lg:col-span-6 2xl:col-span-12">
          <CardKeyValuePair
            label={"Total Token Supply"}
            value={
              <Heading className="font-extrabold text-brand-light" as="h4">
                {tokenSupply ? (
                  <Tooltip
                    text={`${formateNumber(tokenSupply, "standard")} ${data?.properties?.tokenSymbol}`}
                    placement={"top-start"}
                  >
                    <div>
                      {formateNumber(tokenSupply)}{" "}
                      <span className={tx("text-sm", TOKEN_COLOR_CLASS)}>{data?.properties?.tokenSymbol}</span>
                    </div>
                  </Tooltip>
                ) : (
                  "NA"
                )}
              </Heading>
            }
            className="lg:p-7"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Parameters;
