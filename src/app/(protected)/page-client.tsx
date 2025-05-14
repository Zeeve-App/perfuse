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
import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/utils/helpers";
import { Heading } from "@/lib/components/Heading";
import { Button } from "@/lib/components/Button";

/** default page client */
const ListPageClient = () => {
  return (
    <div className="flex flex-col gap-y-3 lg:gap-y-6">
      <div className="flex grid-cols-12 justify-items-start  gap-4 rounded-lg border border-brand-outline p-3 bg-brand-gradient-blue-48 lg:p-6">
        <div className=" flex flex-col items-start justify-center gap-2 p-4">
          <Heading as="h3" className="text-white">
            Deploy New Parachain
          </Heading>
          <p className="text-white">There are no deployed parachains!</p>
          <Link href={"/create"}>
            <Button colorScheme={"light"} className="text-brand-blue">
              Begin Now
            </Button>
          </Link>
        </div>
        <div className="grow"></div>
        <div className="p-4">
          <Image
            src={withBasePath("/assets/images/dashboard/dashboard-1.svg")}
            alt="parachains-logo"
            width={425}
            height={322}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPageClient;
