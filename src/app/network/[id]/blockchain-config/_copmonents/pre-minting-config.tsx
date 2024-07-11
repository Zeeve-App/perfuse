"use client";
import React, { useEffect, useState } from "react";
import { ChainSpecFileType } from "@/types/chain-spec";
import { Heading } from "@/lib/components/Heading";
import { Skeleton } from "@/lib/components/Skeleton";
import PreMiningCard from "./pre-mind-address-card";

interface PreMiningConfigProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
}

type PreMintedAddress = { accountAddress: string; accountBalance: number };

const PreMiningConfig = ({ data, isLoading }: PreMiningConfigProps) => {
  const [preMintedData, setPremintedData] = useState<PreMintedAddress[]>([]);

  useEffect(() => {
    const balances: Array<[string, number]> = (data?.genesis?.runtime?.balances?.balances ??
      data?.genesis?.runtimeGenesis?.patch?.balances?.balances ??
      []) as Array<[string, number]>;

    const formattedData = balances.map(([accountAddress, accountBalance]) => ({
      accountAddress,
      accountBalance,
    }));

    setPremintedData(formattedData);
  }, [data]);

  return (
    <div className="col-span-12 flex flex-col overflow-hidden rounded-lg shadow-brand-shadow md:col-span-6 lg:col-span-6">
      <div className="p-4">
        <Heading as="h4">Pre Mined Addresses ({preMintedData.length})</Heading>
      </div>
      <div className="max-h-36 overflow-auto">
        <div className="grid grid-cols-2 gap-6">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="col-span-6">
                <Skeleton role="status" as="div">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700"></div>
                </Skeleton>
              </div>
            ))
          ) : preMintedData.length > 0 ? (
            preMintedData.map((element) => (
              <PreMiningCard
                key={element.accountAddress}
                tokenSymbol={data?.properties?.tokenSymbol ?? ""}
                accountAddress={element.accountAddress}
                accountBalance={element.accountBalance}
              />
            ))
          ) : (
            <div className="col-span-12 text-center text-brand-gray">
              <div className="flex h-32 items-center justify-center text-sm">No data available.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreMiningConfig;
