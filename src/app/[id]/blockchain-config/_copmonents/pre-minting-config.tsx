"use client";
import React, { useEffect, useState } from "react";
import { formateNumber, toShortString } from "@/utils/helpers";
import { ChainSpecFileType } from "@/types/chain-spec";
import { TOKEN_COLOR_CLASS } from "@/constants/token";
import { CopyButton } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
import { Skeleton } from "@/lib/components/Skeleton";
import { Tooltip } from "@/lib/components/Tooltip";
import { tx } from "@/utils/shared";
interface PreMiningConfigProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
}

type PreMintedAddresses = Array<{ accountAddress: string; accountBalance: number }>;

const PreMiningConfig = ({ data, isLoading }: PreMiningConfigProps) => {
  const [preMintedData, setPremintedData] = useState<PreMintedAddresses>([]);
  useEffect(() => {
    if (data?.genesis?.runtime?.balances?.balances || data?.genesis.runtimeGenesis?.patch.balances) {
      const balances =
        data.genesis?.runtime?.balances.balances ?? data?.genesis.runtimeGenesis?.patch.balances.balances ?? [];
      const requiredData: PreMintedAddresses = [];
      balances.map((balance) => {
        requiredData.push({
          accountAddress: balance[0] as string,
          accountBalance: balance[1] as number,
        });
      });
      setPremintedData(requiredData);
    }
  }, [data]);

  return (
    <div className="shadow-brand-shadow col-span-12 flex flex-col overflow-hidden rounded-lg  md:col-span-6 lg:col-span-6">
      <div className="p-4">
        <Heading as="h4">Pre Mined Addresses ({preMintedData.length})</Heading>
      </div>
      <div className="grid grid-cols-12 gap-3 p-4 pt-0">
        <div className="col-span-12 border-b p-1">
          <div className="flex items-center justify-between px-2 font-bold">
            <div>Address</div>
            <div>Balance</div>
          </div>
        </div>
      </div>
      <div className="max-h-36 overflow-auto">
        <div className="grid grid-cols-12 gap-3 p-4 pt-0">
          {!isLoading &&
            preMintedData.map((element, index) => (
              <div key={`${element.accountAddress}-${index}`} className="col-span-12">
                <div className="flex items-center justify-between rounded-lg border border-brand-outline p-2 text-sm">
                  <Tooltip text={element.accountAddress} placement={"top-start"}>
                    <div className="flex items-center">
                      <div className="mr-2 text-brand-gray">{toShortString(element.accountAddress, 5, 5)}</div>
                      <CopyButton text={element.accountAddress} />
                    </div>
                  </Tooltip>
                  <Tooltip
                    text={`${formateNumber(element.accountBalance, "standard")} ${data?.properties?.tokenSymbol}`}
                    placement={"top-start"}
                  >
                    <div className="flex items-center">
                      <div className="mr-2 text-brand-gray">
                        {formateNumber(element.accountBalance)}{" "}
                        <span className={tx("text-xs", TOKEN_COLOR_CLASS)}>{data?.properties?.tokenSymbol}</span>
                      </div>
                      <CopyButton text={element.accountBalance.toString()} />
                    </div>
                  </Tooltip>
                </div>
              </div>
            ))}
          {!preMintedData.length && !isLoading && (
            <div className="col-span-12 text-center text-brand-gray">
              <div className="flex h-32 items-center justify-center text-sm">No data available.</div>
            </div>
          )}
          {isLoading && (
            <>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => {
                return (
                  <div key={key} className="col-span-6">
                    <Skeleton role="status" as="div">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700"></div>
                    </Skeleton>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreMiningConfig;
