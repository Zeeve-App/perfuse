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

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { withBasePath, toShortString, formatDate } from "@/utils/helpers";
import { Network } from "@/types/network";
import { CopyButton, Button } from "@/lib/components/Button";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { Tooltip } from "@/lib/components/Tooltip";
import SvgBubbles from "@/lib/icons/essential/outline/Bubbles";

interface NetworkCardProps {
  data: Network;
}

const NetworkCard = ({ data: { networkId, networkName, networkEnvironment, networkCreatedAt } }: NetworkCardProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  return (
    <Card className={"col-span-12 flex-col rounded-lg md:col-span-6 lg:col-span-4 xl:col-span-3"}>
      <div className="flex flex-row items-center gap-3">
        <div className="rounded-lg bg-brand-outline p-2">
          <Image
            src={withBasePath("/assets/images/parachains-logo.svg")}
            alt="parachains-logo"
            width={24}
            height={24}
          />
        </div>
        <div>
          <Heading as={"h5"}>{networkName ?? "NA"}</Heading>
          {networkId ? (
            <Tooltip text={networkId} placement={"top-start"}>
              <div className="flex items-center gap-2 text-xs text-brand-gray">
                ID: {toShortString(networkId)}
                <CopyButton text={networkId} />
              </div>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2 text-xs text-brand-gray">ID: NA</div>
          )}
        </div>
      </div>
      <div className="border-b pb-2">
        <div className="flex items-center justify-between py-1 text-xs">
          <div className="flex items-baseline gap-2">
            <SvgBubbles className="text-brand-primary" />
            <div className="text-brand-gray">Environment</div>
          </div>
          <div>
            <div>
              {networkEnvironment
                ? networkEnvironment === "sandbox"
                  ? "Devnet"
                  : networkEnvironment.toUpperCase()
                : "NA"}
            </div>
          </div>
        </div>
        {/* <div className="flex items-center justify-between py-1 text-xs">
          <div className="flex items-baseline gap-2">
            <SvgBubbles className="text-brand-primary" />
            <div className="text-brand-gray">Status</div>
          </div>
        </div> */}
      </div>
      <div className="text-xs text-brand-gray">Created On {formatDate(networkCreatedAt)}</div>
      <Link href={`/${networkId}`}>
        <Button
          className="w-full"
          colorScheme="primary"
          variant={"solid"}
          isLoading={isNavigating}
          onClick={() => {
            setIsNavigating(true);
          }}
        >
          View
        </Button>
      </Link>
    </Card>
  );
};

export default NetworkCard;
