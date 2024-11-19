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
import { formateNumber, toShortString } from "@/utils/helpers";
import { tx } from "@/utils/shared";
import KeyValuePair from "@/lib/components/utils/key-value-pair";

interface PreMiningCardProps {
  accountAddress: string;
  accountBalance: number;
  tokenSymbol: string;
  className?: string;
}

const PreMiningCard = ({ accountAddress, accountBalance, tokenSymbol, className }: PreMiningCardProps) => {
  return (
    <div className={tx("text-sm grid grid-cols-12", className)}>
      <KeyValuePair
        className="col-span-6"
        label={"Address"}
        value={toShortString(accountAddress, 10, 12)}
        tooltipText={accountAddress}
        shouldAllowCopy
      />
      <KeyValuePair
        className="col-span-6 text-right"
        label={"Balance"}
        tooltipText={accountBalance.toString()}
        value={formateNumber(accountBalance) + " " + tokenSymbol.toUpperCase()}
        shouldAllowCopy
      />
    </div>
  );
};

export default PreMiningCard;
