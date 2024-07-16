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
import { CopyButton } from "@/lib/components/Button";
import { formateNumber, toShortString } from "@/utils/helpers";
import { tx } from "@/utils/shared";

interface PreMiningCardProps {
  accountAddress: string;
  accountBalance: number;
  tokenSymbol: string;
}

const PreMiningCard = ({ accountAddress, accountBalance, tokenSymbol }: PreMiningCardProps) => {
  return (
    <div className="rounded-lg border border-brand-outline bg-brand-light p-2 text-sm">
      <div className="flex items-center justify-between">
        <div className="text-brand-gray">Address</div>
        <div className="flex items-center">
          {toShortString(accountAddress)}
          <CopyButton text={accountAddress} className="ml-1" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-brand-gray">Balance</div>
        <div className="flex items-center">
          {formateNumber(accountBalance)} <span className={tx("text-sm capitalize")}>{tokenSymbol}</span>
          <CopyButton text={accountAddress} className="ml-1" />
        </div>
      </div>
    </div>
  );
};

export default PreMiningCard;
