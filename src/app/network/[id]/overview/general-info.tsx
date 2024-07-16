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
import NetworkStatus from "../_components/network-status";
import { formatDate, formatIntoAge, toShortString } from "@/utils/helpers";
import { Heading } from "@/lib/components/Heading";
import { useNetworkStore } from "@/store/network";
import KeyValuePairInput from "@/lib/components/utils/key-value-pair-input";
import { tx } from "@/utils/shared";
import { Label } from "@/lib/components/Form";

const GeneralInfo = ({
  isLoading,
  name,
  id,
  env,
  createdAt,
  provisionedAt,
}: {
  isLoading: boolean;
  name?: string;
  id?: string;
  env?: string;
  createdAt?: string | Date;
  provisionedAt?: string;
}) => {
  const networkInfo = useNetworkStore((e) => e.networkInfo);
  return (
    <div className="col-span-12 flex flex-col gap-3 rounded-lg p-4 shadow-brand-shadow lg:gap-6">
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        <Heading as="h4" className="col-span-12">
          Parachain Details
        </Heading>
      </div>
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        <KeyValuePairInput
          label="Name"
          value={name ? toShortString(name, 5, 5) : "NA"}
          shouldAllowCopy
          tooltipText={name}
          copyText={name}
          className="col-span-12 md:col-span-6 xl:col-span-3"
          isLoading={isLoading}
        />
        <KeyValuePairInput
          label="ID"
          value={id ? toShortString(id, 5, 5) : "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-3"
          isLoading={isLoading}
          tooltipText={id}
          shouldAllowCopy={true}
          copyText={id}
        />
        <KeyValuePairInput
          label="Description"
          value={toShortString("Example description", 5, 5)}
          className="col-span-12 md:col-span-6 xl:col-span-3"
          shouldAllowCopy
          tooltipText={"Example description"}
          isLoading={isLoading}
          copyText={"Example description"}
        />
        <KeyValuePairInput
          label="Environment"
          value={env ? env.toUpperCase() : "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-3"
          isLoading={isLoading}
        />
        <KeyValuePairInput
          label="Owned By"
          value={"perfuse@perfuse.com"}
          className="col-span-12 md:col-span-6 xl:col-span-3"
          isLoading={isLoading}
        />
        <div
          className={tx(
            "pb-1 justify-between flex flex-col gap-2 col-span-12 md:col-span-6 xl:col-span-3 border-brand-outline",
          )}
        >
          <Label>Status</Label>
          <div className="h-[60px] rounded-lg border ">
            <NetworkStatus className="flex h-full items-center p-4" />
          </div>
        </div>

        <KeyValuePairInput
          suppressHydrationWarning={true}
          label="Blockchain Provision Time"
          value={networkInfo.data?.networkStatus === "completed" ? formatIntoAge(createdAt, provisionedAt) : "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-3"
          isLoading={isLoading}
        />
        <KeyValuePairInput
          suppressHydrationWarning={true}
          label="Duration"
          value={formatIntoAge(createdAt, new Date())}
          className="col-span-12 md:col-span-6 xl:col-span-3"
          isLoading={isLoading}
        />
        <KeyValuePairInput
          label="Created On"
          value={createdAt ? formatDate(createdAt) : "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-3"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default GeneralInfo;
