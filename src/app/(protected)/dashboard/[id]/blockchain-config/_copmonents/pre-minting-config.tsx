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
import PreMiningCard from "./pre-mind-address-card";
import { ChainSpecFileType } from "@/types/chain-spec";
import { Skeleton } from "@/lib/components/Skeleton";
import { Typography } from "@/lib/components/Typography";
import { Card } from "@/lib/components/Card";

interface PreMiningConfigProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
}

type PreMintedAddress = { accountAddress: string; accountBalance: number };

const PreMiningConfig = ({ data, isLoading }: PreMiningConfigProps) => {
  const [preMintedData, setPremintedData] = useState<PreMintedAddress[]>([]);

  useEffect(() => {
    const balances: Array<[string, number]> = (data?.genesis?.runtimeGenesis.patch?.balances?.balances ??
      data?.genesis?.runtimeGenesis?.patch?.balances?.balances ??
      []) as Array<[string, number]>;

    const formattedData = balances.map(([accountAddress, accountBalance]) => ({
      accountAddress,
      accountBalance,
    }));

    setPremintedData(formattedData);
  }, [data]);

  return (
    <Card className="col-span-12 h-56 overflow-y-auto rounded-lg shadow-brand-shadow">
      <Typography variant="subtitle" className="col-span-12">
        Pre Mined Addresses ({preMintedData.length})
      </Typography>

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
          <>
            <PreMiningCard
              className="col-span-12"
              key={element.accountAddress}
              tokenSymbol={data?.properties?.tokenSymbol ?? ""}
              accountAddress={element.accountAddress}
              accountBalance={element.accountBalance}
            />
            <hr className="col-span-12 border-0 border-b border-theme-primary-content" />
          </>
        ))
      ) : (
        <div className="col-span-12 text-center text-brand-gray">
          <div className="flex h-32 items-center justify-center text-sm">No data available.</div>
        </div>
      )}
    </Card>
  );
};

export default PreMiningConfig;
