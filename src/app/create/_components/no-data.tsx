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
import Link from "next/link";
import { Card } from "@/lib/components/Card";
import SvgInfoSquare from "@/lib/icons/essential/outline/InfoSquare";

const NoData = () => {
  return (
    <Card className="col-span-12 min-h-[255px] items-center justify-center rounded-lg border-0">
      <Link href={"/create"}>
        <SvgInfoSquare className="m-auto text-4xl text-brand-blue" />
        <p className="text-center text-base font-semibold">Already Deployed</p>
        <p className="text-sm text-brand-gray">Hey! There is devnet deployed right now, can&apos;t deploy a new one.</p>
      </Link>
    </Card>
  );
};

export default NoData;
